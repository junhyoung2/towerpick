import React, { useEffect, useState } from "react";
import ParkingMapB1 from "./ParkingMapB1";
import ParkingMapB2B3 from "./ParkingMapB2B3";
import { getAvailableSpacesByFloor, getSpacesByFloor } from "../utils/towerpickapi";

const FLOOR_LIST = [1, 2, 3];

const slotClassMapB1 = {
  1: "slot-pink", 2: "slot-pink", 3: "slot-pink", 4: "slot-pink",
  5: "slot-yellow", 6: "slot-yellow", 11: "slot-yellow",21: "slot-yellow",
  7: "slot-blue", 8: "slot-blue", 9: "slot-blue", 10: "slot-blue",

};

const BookingBox2 = ({
  start,
  end,
  floor,
  setFloor,
  selectedSlot,
  setSelectedSlot
}) => {
  const [availableFloors, setAvailableFloors] = useState(FLOOR_LIST);
  const [reservedSlots, setReservedSlots] = useState([]);

  function format(dt) {
    if (!dt) return "";
    const d = new Date(dt);
    const pad = n => n.toString().padStart(2, "0");
    return `${d.getFullYear().toString().slice(2)}.${pad(d.getMonth()+1)}.${pad(d.getDate())}.${pad(d.getHours())}.${pad(d.getMinutes())}`;
  }

  useEffect(() => {
    async function fetchAvailableFloors() {
      const { data, error } = await getAvailableSpacesByFloor();
      if (error) return;
      setAvailableFloors(data.filter(f => f.available > 0).map(f => f.floor));
      if (!data.find(f => f.floor === floor && f.available > 0)) {
        setFloor(data.find(f => f.available > 0)?.floor ?? 1);
      }
    }
    fetchAvailableFloors();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    async function fetchSpaces() {
      if (!floor) return;
      const { data, error } = await getSpacesByFloor(floor);
      if (error || !data) return;
      setReservedSlots(data.filter(s => s.is_reserved || !s.is_active).map(s => s.slot_number));
      setSelectedSlot(null);
    }
    fetchSpaces();
    // eslint-disable-next-line
  }, [floor, setSelectedSlot]);

  function handleFloorChange(e) {
    setFloor(Number(e.target.value));
  }

  function handleSelectSlot(n) {
    if (reservedSlots.includes(n)) return;
    setSelectedSlot(n);
  }

  const slotClassMap = floor === 1 ? slotClassMapB1 : {};

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
            <select value={floor} onChange={handleFloorChange}>
              {FLOOR_LIST.map(f =>
                availableFloors.includes(f) ? (
                  <option key={f} value={f}>
                    B{f}
                  </option>
                ) : null
              )}
            </select>
          </div>
        </div>
      </div>
   {floor === 1 ? (
  <ParkingMapB1
    slotClassMap={slotClassMap}
    reserved={reservedSlots}
    selected={selectedSlot}
    onSelectSlot={handleSelectSlot}
  />
) : (
  <ParkingMapB2B3
    reserved={reservedSlots}
    selected={selectedSlot}
    onSelectSlot={handleSelectSlot}
  />
)}

    </div>
  );
};

export default BookingBox2;
