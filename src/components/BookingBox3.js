const BookingBox3 = ({ start, end, floor, slot, phone, carNumber }) => {
  // 날짜 포맷 함수 (BookingBox2에서 썼던 것과 동일)
  function format(dt) {
    if (!dt) return "";
    const d = new Date(dt);
    const pad = n => n.toString().padStart(2, "0");
    return `${d.getFullYear().toString().slice(2)}.${pad(d.getMonth()+1)}.${pad(d.getDate())}.${pad(d.getHours())}.${pad(d.getMinutes())}`;
  }

  return (
    <div className="booking-box">
      <div className="booking-title">예약 확인</div>
      <div className="booking-form">
        <div className="form-row">
          <div className="form-label">예약일시</div>
          <div className="form-input">
            <p>{format(start)}~{format(end)}</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">예약위치</div>
          <div className="form-input">
            <p>B{floor}층 {slot}번</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">휴대폰번호</div>
          <div className="form-input">
            <p>{phone}</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">차량번호</div>
          <div className="form-input">
            <p>{carNumber}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingBox3;
