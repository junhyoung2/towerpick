import { useEffect, useState } from "react";
import Header from "./Header";
import { GrFormNext } from "react-icons/gr";
import Navigate from "./Navigate";
import { getMyPasses } from "../utils/towerpickapi";
import { useNavigate } from "react-router-dom";

//임시 데이터
const sampleMyPassData = [
    {
        id: "pass_M_001",
        duration_type: "1m", // 한달 이용권
        price: 30000,
        start_date: "2024-07-01 00:00",
        end_date: "2024-07-31 00:00",
        status: "expired",
    },
    {
        id: "pass_Q_001",
        duration_type: "3m", // 3개월 정기권
        price: 80000,
        start_date: "2024-07-01",
        end_date: "2024-09-30",
        status: "canceled",
    },
    // {
    //   id: 'pass_M_004',
    //   duration_type: '1m', // 한달 이용권 (취소됨)
    //   price: 30000,
    //   start_date: '2024-05-20',
    //   end_date: '2024-06-19',
    //   status: 'canceled',
    // },
];

const MyPage = () => {
    // const [myPass,setMyPass] = useState([]);
    const myPass = sampleMyPassData;
    const [user, setUser] = useState("");
    const navigate = useNavigate();

    //정기권 예약 정보 가져오기
    // useEffect = (()=>{
    // const passUser = JSON.parse(localStorage.getItem("towerpick"));
    //   setUser(passUser);
    //   const fetchData = async ()=>{
    //     const {data,error} = await getMyPasses(passUser.id);
    //     if( error ){
    //       alert("정기권 정보 가져오기 실패!");
    //       return;
    //     }
    //     if( data ){
    //       fetchData();
    //       setMyPass(data);
    //     }
    //   }
    // },[]);

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

    // 정기권 기간(duration)별 분류
    const oneMonthPasses = myPass.filter((item) => item.duration_type === "1m");
    const threeMonthPasses = myPass.filter(
        (item) => item.duration_type === "3m"
    );

    // 정기권 목록을 렌더링하는 도우미 함수
    const renderPassList = (passes) => {
        return (
            <ul>
                {passes.map((item) => {
                    return (
                        <li key={item.id}>
                            <p>
                                {item.start_date}
                                <br /> ~ {item.end_date}
                            </p>
                            <p>{item.price.toLocaleString()}원</p>
                            <p className="pass-status">
                                <span>{getStatusText(item.status)}</span>
                            </p>
                            {/* {
                item.status === 'active' && (
                  <span className="pass-active-label">기간만료</span>
                )
              } */}
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="my-page">
            <Header prev_path="/mainpage" prev_title="내정보" />
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
                {/* 사용중인 정기권 */}
                <div className="pass-buy">
                    <p>현재 이용중인 정기권이 없습니다</p>
                    <button>정기권 구매하러 가기</button>
                </div>

                {/* 종료된 정기권 */}
                <div className="pass-end">
                    <div className="pass-1m">
                        <p className="month-txt">한달 이용권</p>
                        {renderPassList(oneMonthPasses)}
                    </div>
                    <div className="pass-3m">
                        <p className="month-txt">3개월 이용권</p>
                        {renderPassList(threeMonthPasses)}
                    </div>
                </div>
            </div>
            <div className="reserve-cancle">
                <button
                    className="cancle"
                    onClick={() => {
                        navigate("/cancelpass");
                    }}
                >
                    예약 취소
                </button>
            </div>
            <Navigate />
        </div>
    );
};

export default MyPage;
