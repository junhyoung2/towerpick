import { useNavigate } from "react-router-dom";

const CancelComplete = () => {
    const navigate = useNavigate();

    return (
        <div className="cancel-complete">
            <h2>예약 취소</h2>
            <div className="check-icon">
                <span className="check-mark"></span>
            </div>
            <p>예약이 취소 되었습니다.</p>
            <button className="confirm-btn" onClick={() => navigate("/")}>
                확인
            </button>
        </div>
    );
};

export default CancelComplete;
