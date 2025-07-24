const DateSelect = () => {
  return (
    <div className="date-select">
      <h3 className="date-title">주차장 예약</h3>

      <div className="input-group">
        <p className="input-label">입차일시</p>
        <div className="input-wrapper">
          <input
            type="datetime-local"
            className="date"
          />
        </div>
      </div>

      <div className="input-group">
        <p className="input-label">출차일시</p>
        <div className="input-wrapper">
          <input
            type="datetime-local"
            className="date"
          />
        </div>
      </div>
    </div>
  );
};


export default DateSelect;