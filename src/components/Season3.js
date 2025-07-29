import Step from "./Step";
import BookingBox3 from "./BookingBox3";
import Price2 from "./Price2";
import Guide4 from "./Guide4";
import Header from "./Header";
import Navigate from "./Navigate";
import { useNavigate, useLocation } from "react-router-dom";

const Season3 = () => {
    const navigate = useNavigate();
    const location = useLocation();

    // prev 화면에서 location.state로 넘긴 값 받아오기
    const { start, end, floor, slot, price } = location.state || {};

    return (
        <div>
            <Header prev_path="/season2" prev_title="정기권 구매" />
            <div className="booking3">
                <h2 className="booking-title">구매 완료</h2>
                <Step />
                {/* 예약정보 props로 전달 */}
                <BookingBox3
                    start={start}
                    end={end}
                    floor={floor}
                    slot={slot}
                    phone="010-1234-5678"
                    carNumber="NNN라 NNNN"
                />
                <Price2 price={price} />
                <button onClick={() => navigate("/mainpage")}>메인화면</button>
                <Guide4 />
            </div>
            <Navigate />
        </div>
    );
};
export default Season3;
