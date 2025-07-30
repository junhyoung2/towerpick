import { useEffect, useState } from "react";
import Header from "./Header";
import { getMyBookings } from "../utils/towerpickapi";
import Navigate from "./Navigate";
import { TbParkingCircle } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

//임시 데이터
const sampleMyPassData = [
    {
        id: "pass_001",
        start_date: "2024-07-01 00:00",
        end_date: "2024-07-31 00:00",
        status: "active", // 현재 사용 중인 정기권
        space_id: "locker_A1", // (예시)
    },
    {
        id: "pass_002",
        start_date: "2024-06-01 00:00",
        end_date: "2024-06-30 00:00",
        status: "expired", // 만료된 정기권
        space_id: "locker_B2",
    },
    {
      id: 'pass_003',
      start_date: '2024-07-15 00:00',
      end_date: '2024-08-14 00:00',
      status: 'canceled', // 예약취소
      space_id: 'locker_C3',
    },
];

const MyReserve = ({ onCancel }) => {
    const navigate = useNavigate("");
    const myReserve = sampleMyPassData;
    const activeOnlybooking = myReserve.filter(
        (item) => item.status === "active"
    );
    const notactivebooking = myReserve.filter(
        (item) => item.status !== "active"
    );

    // useEffect(()=>{
    //   const bookingUser = JSON.parse(localStorage.getItem("towerpick"));
    //   setUser(bookingUser);
    //   const fetchData = async ()=>{
    //     const {data,error} = await getMyBookings(bookingUser.id);
    //     if( error ){
    //       alert("내 예약 정보 가져오기 실패!");
    //       return;
    //     }
    //     if( data ){
    //       // console.log( data );
    //       fetchData();
    //       setMyReserve(data);
    //     }
    //   }
    // },[]);

    // 예약 글자를 한글로 변환
    const getStatusText = (item) => {
        let value = "";
        if (item === "active") {
            value = "예약중";
        } else if (item === "canceled") {
            value = "예약취소";
        } else if (item === "expired") {
            value = "사용종료";
        }
        return value;
    };
    /////////////

    // // 예약한 주차 정보 표시 함수
    // const getBookingInfo = (spaceID)=>{
    //   const select = space.find((item)=>{return item.id === spaceID});
    //   if( select ){
    //     return `${select.floor}층 ${select.row}-${select.col}`;
    //   }
    // }
    // /////////////////////////////

    return (
        <div className="my-reserve">
            <Header prev_path="/mainpage" prev_title="내 이용내역" />
            <div className="reserve-wrap">
                <div className="now-txt">
                    <h3>현재 예약</h3>
                </div>
                <div className="now-reserve">
                    <ul>
                        {activeOnlybooking.map((item) => {
                            return (
                                <li key={item.id}>
                                    <p className="now-status">
                                        {getStatusText(item.status)}
                                    </p>
                                    <p className="now-date">
                                        {item.start_date}
                                        <br /> ~ {item.end_date}{" "}
                                    </p>
                                    <p className="now-space">
                                        <TbParkingCircle />
                                        {item.space_id}
                                    </p>{" "}
                                    {/*주차 위치 표시*/}
                                    {item.status === "active" ? (
                                        <button
                                            onClick={() => {
                                                navigate("/cancelpass");
                                                onCancel({
                                                    bookingId: item.id,
                                                    spaceId: item.space_id,
                                                });
                                            }}
                                        >
                                            예약취소
                                        </button>
                                    ) : (
                                        ""
                                    )}
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className="end-txt">
                    <h3>종료된 예약</h3>
                </div>
                <div className="end-reserve">
                    <ul>
                        {notactivebooking.map((item) => {
                            return (
                                <li key={item.id}>
                                    <p className="end-status">
                                        {getStatusText(item.status)}
                                    </p>
                                    <p className="end-date">
                                        {item.start_date}
                                        <br /> ~ {item.end_date}
                                    </p>
                                    <p className="end-space">
                                        <TbParkingCircle />
                                        {item.space_id}
                                    </p>{" "}
                                    {/*주차 위치 표시*/}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <Navigate />
        </div>
    );
};

export default MyReserve;
