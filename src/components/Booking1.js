import React, { useState } from "react";
import Step from "./Step";
import ParkingImg from "./ParkingImg";
import BookingBox1 from "./BookingBox1";
import YesorNo from "./YesorNo";
import Price1 from "./Price1";
import Header from "./Header";
import Navigate from "./Navigate";
import { supabase } from "../utils/supabaseClient";
import { useNavigate } from "react-router-dom";

const HOURLY_RATE = 1500;
const DAILY_RATE = 35000;

const Booking1 = () => {
  const navigate = useNavigate();
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [available, setAvailable] = useState(null);
  const [price, setPrice] = useState(null);

  // 날짜 변경될 때마다 실행 (DateSelect에 props로 전달)
  const handleDateChange = async (newStart, newEnd) => {
    setStart(newStart);
    setEnd(newEnd);

    if (!newStart || !newEnd) {
      setAvailable(null);
      setPrice(null);
      return;
    }

    // 1. 전체 공간 조회
    const { data: allSpaces, error: err1 } = await supabase
      .from("spaces")
      .select("id")
      .eq("is_active", true);
    if (err1 || !allSpaces) {
      setAvailable(null);
      setPrice(null);
      return;
    }

    // 2. 예약 겹침 조회 - .lt/.gt 체이닝만 사용!
    const { data: overlapped } = await supabase
      .from("bookings")
      .select("space_id")
      .eq("status", "active")
      .lt("start_time", newEnd)
      .gt("end_time", newStart);
    // ↑↑↑↑ 이 부분만 .or() → .lt/.gt로 바꿨음
    const overlappedCount = overlapped ? overlapped.length : 0;
    const leftSpaces = allSpaces.length - overlappedCount;
    setAvailable(leftSpaces > 0);

    // 3. 금액 계산
    setPrice(calcFee(newStart, newEnd));
  };

  function calcFee(start, end) {
    const s = new Date(start);
    const e = new Date(end);
    if (isNaN(s) || isNaN(e) || e <= s) return 0;
    let diffMs = e - s;
    let diffHours = Math.ceil(diffMs / (1000 * 60 * 60));
    let diffDays = Math.floor(diffHours / 24);
    let remainHours = diffHours % 24;
    let total = 0;

    if (diffHours >= 24) {
      total += diffDays * DAILY_RATE + remainHours * HOURLY_RATE;
    } else {
      total = diffHours * HOURLY_RATE;
      if (total > DAILY_RATE) total = DAILY_RATE;
    }
    return total;
  }

  return (
    <div>
      <Header />
      <div className="booking1">
        <h2 className="booking-title">예약 일자 선택</h2>
        <Step />
        <BookingBox1 start={start} end={end} onDateChange={handleDateChange} />
        <YesorNo available={available} />
       <Price1 price={price} />
        <ParkingImg />
        <button
          onClick={() => {
            if (!available) {
              alert("날짜를 확인해주세요.");
              return;
            }
           
            navigate("/booking2", { state: { start, end,price } });
          }}
        >
          다음단계
        </button>
      </div>
      <Navigate />
    </div>
  );
};

export default Booking1;
