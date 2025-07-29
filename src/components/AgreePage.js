import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const AgreePage = () => {
    const [agreeAll, setAgreeAll] = useState(false);
    const [age, setAge] = useState(false);
    const [terms, setTerms] = useState(false);
    const [privacy, setPrivacy] = useState(false);
    const [event, setEvent] = useState(false);
    const navigate = useNavigate("");

    return (
        <div className="agree-page">
            <div className="agree-title">
                <h1>약관동의</h1>
                <h3>
                    원활한 서비스 제공을 위해
                    <br />
                    약관 동의가 필요합니다.
                </h3>
            </div>

            {/* 약관 part */}
            <div className="terms">
                <div className="agree-all">
                    <input
                        type="checkbox"
                        id="agree"
                        checked={agreeAll}
                        onChange={(e) => {
                            //모든 항목이 체크되거나, 체크 해제 되어야 함
                            const value = e.target.checked;
                            setAgreeAll(value);
                            setTerms(value);
                            setAge(value);
                            setPrivacy(value);
                            setEvent(value);
                        }}
                    />
                    <label htmlFor="agree">약관 전체 동의</label>
                </div>
                <hr />
                <ul>
                    <li>
                        <input
                            type="checkbox"
                            id="agree1"
                            checked={age}
                            onChange={(e) => {
                                setAge(e.target.checked);
                            }}
                        />
                        <label htmlFor="agree1">19세 이상입니다(필수)</label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="agree2"
                            checked={terms}
                            onChange={(e) => {
                                setTerms(e.target.checked);
                            }}
                        />
                        <label htmlFor="agree2" className="icon">
                            이용 약관 동의(필수) <FaChevronDown />
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="agree3"
                            checked={privacy}
                            onChange={(e) => {
                                setPrivacy(e.target.checked);
                            }}
                        />
                        <label htmlFor="agree3" className="icon">
                            개인정보 수집 및 이용 동의(필수) <FaChevronDown />
                        </label>
                    </li>
                    <li>
                        <input
                            type="checkbox"
                            id="agree4"
                            checked={event}
                            onChange={(e) => {
                                setEvent(e.target.checked);
                            }}
                        />
                        <label htmlFor="agree4">
                            할인, 이벤트 정보 수신(선택)
                        </label>
                    </li>
                </ul>
            </div>
            <button
                className="next-btn"
                onClick={() => {
                    navigate("/join");
                }}
                disabled={!(age && terms && privacy)}
            >
                다음단계
            </button>
        </div>
    );
};

export default AgreePage;
