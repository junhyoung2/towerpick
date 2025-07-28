import React, { useState } from "react";
import Step from "./Step";
import ParkingImg from "./ParkingImg";
import SeasonBox1 from "./SeasonBox1.js";
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
  const handleDateChange = (newStart, newEnd) => {
    setStart(newStart);
    setEnd(newEnd);
    if (newStart && newEnd && type) setPrice(calcFee(type));
    else setPrice(null);
  };

  // 사용기간 버튼 클릭 시 실행
const handleTypeChange = (newType) => {
  setType(newType);
  if (start && end && newType) {
    const fee = calcFee(newType);
    setPrice(fee);
    console.log('정기권 타입:', newType, '/ 금액:', fee);
  } else {
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
        <SeasonYesorNo available={!!start && !!end && !!type} />
        <Price1 price={price} />
        <ParkingImg />
        <button
          onClick={() => {
            if (!start || !end || !type) {
              alert("입차일시, 사용기간을 모두 선택하세요.");
              return;
            }
            navigate("/booking2", { state: { start, end, type, price } });
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
