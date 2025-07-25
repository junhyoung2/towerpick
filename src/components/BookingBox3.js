//(예약확인)


const BookingBox3 = () => {
  return (
    <div className="booking-box">
      <div className="booking-title">예약 확인</div>
      <div className="booking-form">
        <div className="form-row">
          <div className="form-label">예약일시</div>
          <div className="form-input">
            <p>YY.MM.DD.HH.MM~YY.MM.DD.HH.MM</p>
          </div>
        </div>
        <div className="form-row">
          <div className="form-label">예약위치</div>
          <div className="form-input">
            <p>타워픽 주차장 N층 NN번</p>
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
      </div>
    </div>
  );
};

export default BookingBox3;