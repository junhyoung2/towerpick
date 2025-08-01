import { useEffect, useState } from "react";
import Header from "./Header";
import { GrFormNext } from "react-icons/gr";
import Navigate from "./Navigate";
import { deactivateMember, getMyPasses } from "../utils/towerpickapi";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
  const [myPass, setMyPass] = useState([]);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [user, setUser] = useState([]); //
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false); // 회원탈퇴 팝업 
  const navigate = useNavigate('');

  // 정기권 예약 정보 가져오기
  useEffect(() => {
    const passUser = JSON.parse(localStorage.getItem("towerpick"));
    if( passUser ){
      setUser(passUser);
    }
    const fetchData = async () => {
      const { data, error } = await getMyPasses(passUser.member_id);
      if (error) {
        alert("정기권 정보 가져오기 실패!");
        return;
      }
      if (data) {
        setMyPass(data);
      }
    }
    fetchData();
  },[]);

  // 정기권 상태 글자를 한글로 변환
  const getStatusText = (item) => {
    let value = "";
    if (item === "active") {
      value = "사용중";
    } else if (item === "canceled") {
      value = "취소완료";
    } else if (item === "expired") {
      value = "기간만료";
    }
    return value;
  };
  /////////////

  const activePasses = myPass.filter(item => item.status === 'active');

  // 정기권 기간(duration)별 분류
  const oneMonthPasses = myPass.filter(item => item.duration_type === '1m');
  const threeMonthPasses = myPass.filter(item => item.duration_type === '3m');
  const sixMonthPasses = myPass.filter(item => item.duration_type === '6m');
  const twelveMonthPasses = myPass.filter(item => item.duration_type === '12m');
  const notactivatedPasses = myPass.filter(item => item.status !== 'active');

  // 정기권 목록을 렌더링하는 도우미 함수
  const renderPassList = (myPass,title = "") => {
    if (myPass.length === 0) {
      if (title) {
        return <p className="no-pass-message">{title}이 없습니다.</p>;
      }
    }
    return (
      <div className="pass-listWrap">
        <ul>
          {myPass.map((item) => {
            return (
              <li key={item.id} className="pass-list">
                <p className="pass-month">{
                  item.duration_type === '1m' ? <>한달<br /> 이용권</> :
                  item.duration_type === '3m' ? <>3개월<br /> 이용권</> :
                  item.duration_type === '6m' ? <>6개월<br /> 이용권</> :
                  item.duration_type === '12m' ? <>1년<br /> 이용권</> :
                  '기간 미지정'
                }</p>
                <p className="pass-date">{item.start_date}
                  <br /> ~ {item.end_date}</p>
                <p className="pass-price">{item.price.toLocaleString()}원</p>
                <p className="pass-status">{getStatusText(item.status)}</p>
                {
                  item.status === 'active' ? (
                  <button
                    className="passCancle-btn"
                    onClick={()=>{
                      navigate("/cancelpass")
                  }}
                  >예약취소</button>) : ""
                }
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

// 🍺 로그아웃 버튼+팝업 로직 *************************************** 
    // 로그아웃 버튼 클릭 시 팝업 열기
  const handleLogoutClick = () => {
    setShowLogoutConfirm(true);
  };

  // 로그아웃 팝업에서 '예' 클릭 시 실제 로그아웃 처리
  const handleConfirmLogout = () => {
    localStorage.removeItem("towerpick");
    navigate("/login");
    setShowLogoutConfirm(false);
  };

  // 로그아웃 팝업에서 '아니오' 클릭 시 닫기
  const handleCancelLogout = () => {
    setShowLogoutConfirm(false);
  };
  //*********************************************************

// 🍺 회원탈퇴 버튼+팝업 로직 ***************************************
  // 회원탈퇴 팝업에서 '아니오' 클릭 시 팝업 닫기
  const handleCancelWithdraw = () => {
    setShowWithdrawConfirm(false);
  };

  // 팝업에서 '예' 클릭 시 실제 회원탈퇴 처리
  const handleConfirmWithdraw = async () => {
    if (!user || !user.member_id) {
      alert("회원 정보를 찾을 수 없습니다. 다시 로그인해 주세요.");
      setShowWithdrawConfirm(false);
      navigate("/mypage");
      return;
    }

  // 실제 회원 탈퇴 API 호출
  const { data, error } = await deactivateMember(user.member_id);
    if (data) {
      alert("회원 탈퇴가 완료되었습니다. 이용해 주셔서 감사합니다.");
      localStorage.removeItem("towerpick"); // 로컬 스토리지 정보 삭제
      navigate("/");
    } else {
      alert(`회원 탈퇴 중 오류가 발생했습니다: ${error || "알 수 없는 오류"}`);
    }
    setShowWithdrawConfirm(false);
  };

  // 회원탈퇴 버튼 클릭 시 팝업 열기
  const handleWithdrawClick = () => {
    setShowWithdrawConfirm(true);
  };

  return (
    <div className="page-wrap">
      <Header prev_path="/mainpage" prev_title="내정보" />
      <div className="my-page" style={{height:myPass.length>0 ? "auto":"100%"}}>
        <div className="my-modify">
          <div className="my-txt">
            <h3>회원정보</h3>
          </div>
          <ul className="list-one">
            <li>
              <p>회원정보 변경</p>
              <p className="modi-icon">
                {/* <GrFormNext /> */}
              </p>
            </li>
            <li>
              <p>비밀번호 수정</p>
              <p className="modi-icon">
                <GrFormNext />
              </p>
            </li>
            <li>
              <p>휴대폰 번호 수정</p>
              <p className="modi-icon">
                <GrFormNext />
              </p>
            </li>
          </ul>
          <ul className="list-two">
            <li onClick={handleLogoutClick}>
              <p>로그아웃</p>
              <p className="modi-icon">
                <GrFormNext />
              </p>
            </li>
            <li onClick={handleWithdrawClick}>
              <p>회원탈퇴</p>
              <p className="modi-icon">
                <GrFormNext />
              </p>
            </li>
          </ul>
        </div>
        <div className="my-pass">
          <div className="pass-txt">
            <h3>정기권 내역</h3>
            </div>
            <div className="pass-buy">
              {
                activePasses.length > 0 ? (
                  <>
                    <p>정기권을 이용중입니다.</p>
                    <button
                      onClick={() => {
                        navigate("/season1");
                      }}
                    >
                    정기권 구매하러 가기
                    </button>
                  </>
                ) : (
                  <>
                    <p>이용중인 정기권이 없습니다</p>
                    <button
                      onClick={() => {
                        navigate("/season1");
                      }}
                    >
                    정기권 구매하러 가기
                    </button>
                  </>
                )
              }
          </div>
         {/* 정기권 목록 */}
          <div className="mypass-list">
            {/* 한달 이용권 섹션 */}
            {oneMonthPasses.length > 0 && (
            <div className="pass-1m">
              {renderPassList(oneMonthPasses, "한달 이용권")}
            </div>
            )}
            {/* 3개월 이용권 섹션 */}
            {threeMonthPasses.length > 0 && (
            <div className="pass-3m">
              {renderPassList(threeMonthPasses, "3개월 이용권")}
            </div>
            )}
            {/* 6개월 이용권 섹션 */}
            {sixMonthPasses.length > 0 && (
            <div className="pass-6m">
              {renderPassList(sixMonthPasses, "6개월 이용권")}
            </div>
            )}
            {/* 1년 이용권 섹션 */}
            {twelveMonthPasses.length > 0 && (
            <div className="pass-12m">
              {renderPassList(twelveMonthPasses, "1년 이용권")}
            </div>
            )}
            {/* 만료/취소된 이용권 섹션 */}
            {twelveMonthPasses.length > 0 && (
            <div className="pass-end">
              {renderPassList(notactivatedPasses, "")}
            </div>
            )}
          </div>
        </div>
      </div>
      <Navigate />

      {/* 로그아웃 확인 팝업 (showLogoutConfirm 상태에 따라 조건부 렌더링) */}
      {showLogoutConfirm && (
        <div className="logout-overlay"> {/* 모달 오버레이 */}
          <div className="logout-content"> {/* 모달 내용 */}
            <p>정말 로그아웃 하시겠습니까?</p>
            <div className="logout-buttons">
              <button
                onClick={handleConfirmLogout}
                className="yes-btn">예</button>
              <button
                onClick={handleCancelLogout}
                className="no-btn">아니오</button>
            </div>
          </div>
        </div>
      )}

      {/* 회원탈퇴 확인 팝업 */}
      {showWithdrawConfirm && (
        <div className="logout-overlay">
          <div className="logout-content">
            <p>정말 탈퇴 하시겠습니까?<br/> 모든 정보가 삭제됩니다.</p>
            <div className="withdraw-buttons">
              <button onClick={handleConfirmWithdraw} className="yes-btn withdraw-btn">예, 탈퇴합니다</button>
              <button onClick={handleCancelWithdraw} className="no-btn">아니오</button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
};

export default MyPage;
