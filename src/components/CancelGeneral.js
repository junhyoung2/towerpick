import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Navigate from "./Navigate";
import { getMyBookings } from "../utils/towerpickapi";  // 예약 API 함수

const CancelGeneral = () => {
  const navigate = useNavigate();
  const userID = "user-1"; // 실제 로그인 사용자 ID

  //  로컬스토리지에서 사용자 정보 가져오기
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const phone = storedUser.phone || "번호 없음";
  const carNumber = storedUser.car_number || "차량 번호 없음";

  const [bookingData, setBookingData] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [refundMethod, setRefundMethod] = useState("");
  const [cancelFee, setCancelFee] = useState("무료");

  useEffect(() => {
    const fetchBooking = async () => {
      const { data, error } = await getMyBookings(userID);
      if (error || !data || data.length === 0) {
        setBookingData(null);
        return;
      }

      const recentBooking = data[0];

      //  예약 데이터에 사용자 정보 병합
      const dummy = {
        ...recentBooking,
        phone_number: phone,
        car_number: carNumber,
        space_name: `지하 ${recentBooking.spaces.floor}층 - ${recentBooking.spaces.slot_number}번`
      };

      setBookingData(dummy);
    };

    fetchBooking();
  }, []);

  const handleCancel = () => {
    navigate("/cancelgeneral/complete");
  };

  if (!bookingData) return <div>예약 내역이 없습니다.</div>;

  return (
    <div>
      <Header
        prev_path="/MyReserve"
        prev_title={<div style={{ width: "100%", textAlign: "center" }}>예약 취소</div>}
      />
      <div className="cancel-general">
        <p className="question">예약을 취소하시겠습니까?</p>

        <div className="info-section">
          <div className="info-box">
            <h2 className="info-title">예약 정보</h2>

            <div className="info-row">
              <label className="label">예약일시</label>
              <input className="value-box" type="text" value={new Date(bookingData.start_time).toLocaleString()} readOnly />
            </div>

            <div className="info-row">
              <label className="label">예약위치</label>
              <input className="value-box" type="text" value={bookingData.space_name} readOnly />
            </div>

            <div className="info-row">
              <label className="label">휴대폰번호</label>
              <input className="value-box" type="text" value={bookingData.phone_number} readOnly />
            </div>

            <div className="info-row">
              <label className="label">차량번호</label>
              <input className="value-box" type="text" value={bookingData.car_number} readOnly />
            </div>
          </div>

          <div className="info-box">
            <div className="info-row">
              <label className="label">취소사유</label>
              <select className="value-box" value={cancelReason} onChange={(e) => setCancelReason(e.target.value)}>
                <option value="">선택하세요</option>
                <option value="일정변경">일정변경</option>
                <option value="개인사정">개인사정</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div className="info-row">
              <label className="label">환불수단</label>
              <select className="value-box" value={refundMethod} onChange={(e) => setRefundMethod(e.target.value)}>
                <option value="">선택하세요</option>
                <option value="신용카드">신용카드</option>
                <option value="계좌이체">계좌이체</option>
              </select>
            </div>

            <div className="info-row">
              <label className="label">환불예정금액</label>
              <input className="value-box" type="text" value={`${bookingData.price?.toLocaleString() || "0"}원`} readOnly />
            </div>

            <div className="info-row fee">
              <label className="label">취소수수료</label>
              <input className="value-box" type="text" value={cancelFee} readOnly />
            </div>

            <div className="tower-box">
              <div className="icon">🅿️</div>
              <div className="text">
                <h3>Tower Pick</h3>
                <p>수원시 팔달구 매교로 1234</p>
              </div>
            </div>
          </div>
        </div>

        <div className="button-group">
          <button className="btn confirm" onClick={handleCancel}>예</button>
          <button className="btn cancel" onClick={() => navigate(-1)}>아니요</button>
        </div>     


        <div className="cancel-warning">
                <h4>예약 취소 전 반드시 확인해 주세요</h4>
                <ul>
                    <li>
                        - 예약 취소는 이용 1시간 전까지 무료로 가능하며,
                        이후에는 취소 및 환불이 불가능합니다.
                    </li>
                    <li>
                        - 결제 수단 및 예약 조건에 따라 환불 처리 기간은 최대
                        7~14일 소요될 수 있습니다.
                    </li>
                    <li>
                        - 취소 후 재예약을 원하실 경우, 다시 예약 절차를 진행해
                        주셔야 합니다.
                    </li>
                    <li>
                        - 부정 예약, 무단 변경, 허위 정보 입력 등은 예약 취소 및
                        서비스 이용 제한의 사유가 될 수 있습니다.
                    </li>
                    <li>
                        기타 문의사항은 고객센터(1234-1234)로 언제든지 연락
                        주세요.
                    </li>
                </ul>
            </div>
      </div>
      <Navigate />
    </div>
  );
};

export default CancelGeneral;
