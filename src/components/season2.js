import React, { useState } from "react";
import Header from "./Header";
import Step from "./Step";
import BookingBox2 from "./BookingBox2";
import Price2 from "./Price2";
import BookingPlace from "./BookingPlace";
import Guide2 from "./Guide2";
import Navigate from "./Navigate";
import { useNavigate, useLocation } from "react-router-dom";

const Booking2 = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [price, setPrice] = useState(location.state?.price || 0);

  // **층 정보도 state로 관리**
  const [floor, setFloor] = useState(1);
  const [selectedSlot, setSelectedSlot] = useState(null);

   const reservedSlots = location.state?.reserved || [];

  // 이전단계의 start/end(예약일시)도 반드시 전달해야 함
  const { start, end } = location.state || {};

  return (
    <div>
      <Header prev_path="/season1" prev_title="정기권 구매" />
      <div className="booking2">
        <h2 className="booking-title">구매 신청</h2>
        <Step />
        {/* setFloor도 넘겨줘야 BookingBox2에서 층 변경 가능 */}
        <BookingBox2
          start={start}
          end={end}
          setPrice={setPrice}
          floor={floor}
          setFloor={setFloor}
          reservedSlots={reservedSlots}
          selectedSlot={selectedSlot}
          setSelectedSlot={setSelectedSlot}
        />
        <BookingPlace selectedSlot={selectedSlot} />
        <Price2 price={price} />
        <button
          onClick={() => {
            if (!selectedSlot) {
              alert("자리를 선택하세요");
              return;
            }
        
            navigate("/Season3", {
              state: {
                start,
                end,
                price,
                floor,
                slot: selectedSlot,
              },
            });
          }}
        >
          예약하기
        </button>
        <Guide2 />
      </div>
      <Navigate />
    </div>
  );
};

export default Booking2;
