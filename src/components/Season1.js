import React, { useState } from "react";
import Step from "./Step";
import ParkingImg from "./ParkingImg";
import SeasonBox1 from "./SeasonBox1";
import SeasonYesorNo from "./SeasonYesorNo";
import Price1 from "./Price1";
import Header from "./Header";
import Navigate from "./Navigate";
import { useNavigate } from "react-router-dom";

const Season1 = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [type, setType] = useState(""); // 정기권 종류 (1m, 3m, ...)
  const [price, setPrice] = useState(null);

  // 날짜 변경될 때마다 실행
  const handleDateChange = (newStart) => {
    setStart(newStart);
    if (newStart && type) {
      const newEnd = calcEndDate(newStart, type);
      setEnd(newEnd);
      setPrice(calcFee(type));
    } else {
      setEnd("");
      setPrice(null);
    }
  };

  // 정기권 버튼 클릭 시 실행
  const handleTypeChange = (newType) => {
    setType(newType);
    if (start && newType) {
      const newEnd = calcEndDate(start, newType);
      setEnd(newEnd);
      const fee = calcFee(newType);
      setPrice(fee);
      console.log("정기권 타입:", newType, "/ 금액:", fee);
    } else {
      setEnd("");
      setPrice(null);
    }
  };

  // 정기권 가격 반환
  function calcFee(period) {
    switch (period) {
      case "1m": return 200000;
      case "3m": return 600000;
      case "6m": return 1100000;
      case "12m": return 2000000;
      default: return 0;
    }
  }

  // 시작일 + 정기권 타입 => 종료일 계산
  function calcEndDate(startDateStr, period) {
    const startDate = new Date(startDateStr);
    if (isNaN(startDate)) return "";

    switch (period) {
      case "1m": startDate.setMonth(startDate.getMonth() + 1); break;
      case "3m": startDate.setMonth(startDate.getMonth() + 3); break;
      case "6m": startDate.setMonth(startDate.getMonth() + 6); break;
      case "12m": startDate.setFullYear(startDate.getFullYear() + 1); break;
      default: return "";
    }

    return startDate.toISOString().slice(0, 16); // datetime-local 형식
  }

  // ❗ 추가된 함수: 만차일인지 확인
  const isFullyBookedDate = (startDate) => {
    const fullyBookedDates = ["2025-08-10"]; // 예약 불가 날짜 리스트
    return fullyBookedDates.includes(startDate?.slice(0, 10)); // yyyy-mm-dd 비교
  };

  return (
    <div>
      <Header />
      <div className="booking1">
        <h2 className="booking-title">예약 일자 선택</h2>
        <Step />
        <SeasonBox1
          start={start}
          end={end}
          onDateChange={handleDateChange}
          type={type}
          setType={handleTypeChange}
        />
        <SeasonYesorNo
          available={
            start && end && type && !isFullyBookedDate(start) ? true : false
          }
        />
        <Price1 price={price} />
        <ParkingImg />
        <button
          onClick={() => {
            if (!start || !end || !type) {
              alert("입차일시, 사용기간을 모두 선택하세요.");
              return;
            }
            if (isFullyBookedDate(start)) {
              alert("선택한 날짜는 만차입니다. 다른 날짜를 선택해주세요.");
              return;
            }
            navigate("/booking2", {
              state: { start, end, type, price },
            });
          }}
        >
          다음단계
        </button>
      </div>
      <Navigate />
    </div>
  );
};

export default Season1;
