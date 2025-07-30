import { useEffect, useState } from "react";
import Header from "./Header";
import { GrFormNext } from "react-icons/gr";
import Navigate from "./Navigate";
import { getMyPasses } from "../utils/towerpickapi";
import { useNavigate } from "react-router-dom";
import ReserveCancle from "./ReserveCancle";

const MyPage = ({onCancel}) => {
  const [myPass, setMyPass] = useState([]);
  const navigate = useNavigate();

  // 정기권 예약 정보 가져오기
  useEffect(() => {
    const passUser = JSON.parse(localStorage.getItem("towerpick"));
    const fetchData = async () => {
      const { data, error } = await getMyPasses(passUser.member_id);
      if (error) {
        alert("정기권 정보 가져오기 실패!");
        return;
      }
      if (data) {
        console.log( data );
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
      value = "사용취소";
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
                <p>{
                  item.duration_type === '1m' ? '한달 이용권' :
                  item.duration_type === '3m' ? '3개월 이용권' :
                  item.duration_type === '6m' ? '6개월 이용권' :
                  item.duration_type === '12m' ? '1년 이용권' :
                  '기간 미지정'
                }</p>
                <p>{item.start_date}
                  <br /> ~ {item.end_date}</p>
                <p>{item.price.toLocaleString()}원</p>
                <p className="pass-status">{getStatusText(item.status)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="page-wrap">
      <Header prev_path="/mainpage" prev_title="내정보" />
      <div className="my-page">
        <div className="my-modify">
          <div className="my-txt">
            <h3>회원정보</h3>
          </div>
          <ul className="list-one">
            <li>
              <p>회원정보 변경</p>
              <p className="modi-icon">
                <GrFormNext />
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
            <li>
              <p>로그아웃</p>
              <p className="modi-icon">
                <GrFormNext />
              </p>
            </li>
            <li>
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
      <ReserveCancle />
      <Navigate />
    </div>
  );
};

export default MyPage;
