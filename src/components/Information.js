import Header from "./Header";
import Navigate from "../components/Navigate";
import { useNavigate } from "react-router-dom";

const Information = () => {
    const navigate = useNavigate();
    return (
        <div>
            {/* 공통헤더 */}
            <Header prev_path="/mainpage" prev_title="이용안내" />

            <h3 className="price-info">요금 안내</h3>
            <img src="/images/priceinfo.jpg" art="요금 안내 이미지" />
            <div className="section-two">
                <div className="reservation">
                    <h3>예약</h3>
                    <br />
                    <p>
                        시간 맞춰 딱! <br />
                        사전 예약으로 편리하게
                    </p>
                    <button
                        onClick={() => {
                            navigate("/booking1");
                        }}
                    >
                        바로가기
                    </button>
                </div>
                <div className="ticket">
                    <h3>정기권 구매</h3>
                    <br />
                    <p>
                        한 번 결제로 한 달! <br />
                        편하게 이용하세요
                    </p>
                    <button
                        onClick={() => {
                            navigate("/season1");
                        }}
                    >
                        바로가기
                    </button>
                </div>
            </div>
            <Navigate />
        </div>
    );
};

export default Information;
