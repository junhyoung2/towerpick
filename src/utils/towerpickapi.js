import { supabase } from "./supabaseClient";

// 1. 로그인: 아이디/비번 일치 확인
export const fetchLogin = async (userID, userPW) => {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("member_id", userID)
    .eq("password", userPW)
    .eq("is_active", true)  // 탈퇴한 회원 제외
    .single();
  return { data,error };
};

// 2. 회원가입
export const fetchSignUp = async (userID, userPW, phone) => {
  const { error } = await supabase
    .from('members')
    .insert([{ member_id: userID, password:userPW, phone }]);
  return { data: !error, error };
};

//3. 아이디찾기(핸드폰번호 기반..)
export const findMemberId = async (phone) => {
  const { data, error } = await supabase
    .from('members')
    .select('member_id')
    .eq('phone', phone)
    .eq("is_active", true)
    .single();
  return { data, error };
};

//4. 비밀번호 찾기(아이디+핸드폰번호.)
export const findPassword = async (userID, phone) => {
  const { data, error } = await supabase
    .from("members")
    .select("password")
    .eq("member_id", userID)    
    .eq("phone", phone)          
    .eq("is_active", true)       
    .single();

  return { data, error };
};

//5. 비밀번호 수정
export const updatePassword = async (userID, newPW) => {
    const { error } = await supabase
    .from("members")
    .update({ password: newPW })
    .eq("member_id", userID)
    .eq("is_active", true);

  return { data: !error, error };
};

//6. 휴대폰 번호 수정
export const updatePhone = async (userID, newPhone) => {
  const { error } = await supabase
    .from("members")
    .update({ phone: newPhone })
    .eq("member_id", userID)
    .eq("is_active", true);

  return { data: !error, error };
};

//7. 내 정기권 내역 알아오기
export const getMyPasses = async (userID) => {
  const { data, error } = await supabase
    .from("passes")
    .select(`
      id,
      space_id,
      duration_type,
      start_date,
      end_date,
      price,
      is_paid,
      status,
      created_at,
      spaces (
        floor,
        slot_number
      )
    `)
    .eq("member_id", userID)
    .order("status", { ascending: false })        // active가 위에 오도록
    .order("created_at", { ascending: false });   // 최신순 정렬

  return { data, error };
};

//8. 정기권 취소 (id기준)
export const cancelPass = async (passId, spaceId) => {
  // 1) passes 테이블의 status만 취소 처리
  const { error: cancelError } = await supabase
    .from("passes")
    .update({ status: "canceled", is_paid: false })
    .eq("id", passId)
    .eq("status", "active");
  if (cancelError) {
    return { data: null, error: cancelError };
  }
  // 2) 해당 공간 상태 업데이트
  const { error: spaceUpdateError } = await updateSpaceStatus(spaceId, false);
  return { data: !spaceUpdateError, error: spaceUpdateError };
};  

//9. 내 사전 예약 정보 조회
export const getMyBookings = async (userID) => {
  const { data, error } = await supabase
    .from("bookings")
    .select(`
      id,
      space_id,
      start_time,
      end_time,
      price,
      is_paid,
      status,
      created_at,
      spaces (
        floor,
        slot_number
      )
    `)
    .eq("member_id", userID)
    .order("start_time", { ascending: false });

  return { data, error };
};

//10. 내 사전 예약 정보 취소
export const cancelBooking = async (bookingId, spaceId) => {
  // 1) 예약 취소 처리
  const { error: cancelError } = await supabase
    .from("bookings")
    .update({ status: "canceled", is_paid: false })
    .eq("id", bookingId)
    .eq("status", "active");
  if (cancelError) {
    return { data: null, error: cancelError };
  }
  // 2) 해당 공간 상태 복원 처리
  const { error: updateError } = await supabase
    .from("spaces")
    .update({ is_reserved: false })
    .eq("id", spaceId);
  return { data: !updateError, error: updateError };
};

//이건 따로 다른데서 사용할 필요 없어요.
//11. 예약이되면 spaces테이블을 업데이트해야 함, 정기권 and 사전예약 둘다
export const updateSpaceStatus = async (spaceID,status) => {
  const {error} = await supabase
    .from("spaces")
    .update({ is_reserved: status })
    .eq("id", spaceID);
  return {data:!error, error};
}

// 12. 내 정기권 예약하기 (결제 완료 상태로 등록)
export const insertPass = async (userID, spaceID, durationType, startDate, endDate, price) => {
  // 1) passes 테이블에 데이터 삽입
  const { data, error } = await supabase
    .from("passes")
    .insert([{
      member_id: userID,
      space_id: spaceID,
      duration_type: durationType,   // '1m', '3m', '6m', '12m'
      start_date: startDate,
      end_date: endDate,
      price: price,
      is_paid: true,                 // 결제 완료 처리
      status: "active"
    }]);
  if (error) return { data: null, error };

  // 2) spaces 테이블 상태값 업데이트 (예약됨)
  const updateResult = await updateSpaceStatus(spaceID, true);
  return { data, error: updateResult.error };
};

// 13. 내 사전예약하기 (결제 완료 상태로 등록)
export const insertBooking = async (userID, spaceID, startTime, endTime, price) => {
  // 1) bookings 테이블에 삽입
  const { data, error } = await supabase
    .from("bookings")
    .insert([{
      member_id: userID,
      space_id: spaceID,
      start_time: startTime,
      end_time: endTime,
      price: price,
      is_paid: true,       // 결제 완료로 설정
      status: "active"
    }]);

  if (error) return { data: null, error };

  // 2) 해당 공간 예약 상태로 업데이트
  const updateResult = await updateSpaceStatus(spaceID, true);
  return { data, error: updateResult.error };
};

//14. 층 별 잔여석 수를 가져오는 함수
// 층별 잔여석 수를 가져오는 함수
export const getAvailableSpacesByFloor = async () => {
  // 1. is_reserved = false && is_active = true 조건으로 전체 공간 조회
  const { data, error } = await supabase
    .from("spaces")
    .select("floor")
    .eq("is_reserved", false)
    .eq("is_active", true);

  if (error) return { data: null, error };

  // 2. 층별로 그룹화하여 개수 세기
  const result = {};
  data.forEach(({ floor }) => {
    result[floor] = (result[floor] || 0) + 1;
  });

  // 3. 배열 형태로 변환해서 반환 (정렬 포함)
  const grouped = Object.entries(result)
    .map(([floor, count]) => ({
      floor: parseInt(floor),
      available_count: count
    }))
    .sort((a, b) => a.floor - b.floor);

  return { data: grouped, error: null };
};