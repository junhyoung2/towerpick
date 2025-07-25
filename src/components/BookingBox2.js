//(예약신청)
import { useLocation, useNavigate } from "react-router-dom";
const BookingBox2 = () => {
  const navigate = useNavigate();
  // booking1에서 넘어온 예약 정보 받기
  const location = useLocation();
  const { start, end } = location.state || {};
  // 날짜 포맷 함수 (YY.MM.DD.HH.MM)
  function format(dt) {
    if (!dt) return "";
    const d = new Date(dt);
    const pad = n => n.toString().padStart(2, "0");
    return `${d.getFullYear().toString().slice(2)}.${pad(d.getMonth()+1)}.${pad(d.getDate())}.${pad(d.getHours())}.${pad(d.getMinutes())}`;
  }
  return (
    <div className="booking-box">
      <div className="booking-title">예약 신청</div>
      <div className="booking-form">
        <div className="form-row">
          <div className="form-label">예약일시</div>
          <div className="form-input">
            <p>
              {format(start)}~{format(end)}
            </p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">휴대폰번호</div>
          <div className="form-input">
            <p>010-1234-5678</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">차량번호</div>
          <div className="form-input">
            <p>NNN라 NNNN</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">선택층</div>
          <div className="form-input">
            <select>
              <option value="1">B1</option>
              <option value="2">B2</option>
              <option value="3">B3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingBox2;