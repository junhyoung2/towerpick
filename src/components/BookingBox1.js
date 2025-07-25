const BookingBox1 = ({ start, end, onDateChange }) => (
  <div className="booking-box">
    <div className="booking-title">주차장 예약</div>
    <div className="booking-form">
      <div className="form-row">
        <div className="form-label">입차일시</div>
        <div className="form-input">
          <input
            type="datetime-local"
            className="date"
            value={start}
            onChange={e => onDateChange(e.target.value, end)}
          />
        </div>
      </div>
      <div className="form-row">
        <div className="form-label">출차일시</div>
        <div className="form-input">
          <input
            type="datetime-local"
            className="date"
            value={end}
            onChange={e => onDateChange(start, e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default BookingBox1;
