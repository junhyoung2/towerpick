import Step from "./Step";
import BookingBox3 from "./BookingBox3";
import Price2 from "./Price2";
import Guide3 from "./Guide3";
import Header from "./Header";
import Navigate from "./Navigate";
import { useNavigate } from "react-router-dom";

const Booking3 = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <div className="booking3">
        <h2 className="booking-title">예약 완료</h2>
        <Step />
        <BookingBox3 />
        <Price2 />
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          메인화면
        </button>
        <Guide3 />
      </div>
      <Navigate />
    </div>
  );
};

export default Booking3;
