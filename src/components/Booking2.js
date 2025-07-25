import Step from "./Step";
import Guide2 from "./Guide2";
import BookingBox2 from "./BookingBox2";
import Price2 from "./Price2";
import BookingPlace from "./BookingPlace";
import Header from "./Header";
import Navigate from "./Navigate";
import { useNavigate } from "react-router-dom";
import ParkingMap from "./ParkingMap";

const Booking2 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="booking2">
        <h2 className="booking-title">예약 신청</h2>
        <Step />
        <BookingBox2 />
        <ParkingMap/>
        <BookingPlace />
        <Price2 />
        <button
          onClick={() => {
            navigate("/booking3");
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
