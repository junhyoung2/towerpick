const ParkingMap = ({ slotClassMap = {} }) => {
  const topSlots = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  const bottomSlots = [21,22,23,24,25,26,27,28,29,30];
  // slot별 className 추가 (ex: "parking-slot n1 ev", "parking-slot n7 compact" 등)
  const getSlotClass = n => {
    return `parking-slot n${n} ${slotClassMap[n] || ""}`.trim();
  };
  return (
    <div className="parking-map">
      <div className="parking-row-y">
        {/* 세로(y축) 화살표/선 */}
        <div className="y-arrow-group">
          <span className="y-arrow">↑</span>
        </div>
        <div style={{width:"100%"}}>
          <div className="parking-top-grid">
            {topSlots.map(n => (
              <div
                key={n}
                className={getSlotClass(n)}
              >{n}</div>
            ))}
          </div>
        </div>
      </div>
      {/* IN/OUT, 가로(x축) 화살표 */}
      <div className="parking-map-label">
        <span className="in-label">IN</span>
        <span className="out-label">OUT</span>
      </div>
      <div className="parking-bottom-grid">
        {bottomSlots.map(n => (
          <div
            key={n}
            className={getSlotClass(n)}
          >{n}</div>
        ))}
      </div>
    </div>
  );
};
export default ParkingMap;