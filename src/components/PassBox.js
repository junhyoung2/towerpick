//bookingbox3 기반

import { useEffect, useState } from "react";

const PassBox = ({ start, end, floor, slot }) => {
    // 날짜 포맷 함수
    function format(dt) {
        if (!dt) return "";
        const d = new Date(dt);
        const pad = (n) => n.toString().padStart(2, "0");
        return `${d.getFullYear().toString().slice(2)}.${pad(
            d.getMonth() + 1
        )}.${pad(d.getDate())}.${pad(d.getHours())}.${pad(d.getMinutes())}`;
    }

    // BookingBox2와 동일하게 localStorage에서 유저 정보 가져오기
    const [userInfo, setUserInfo] = useState({ phone: "-", car_number: "-" });

    useEffect(() => {
        try {
            const raw = localStorage.getItem("towerpick");
            if (raw) {
                const user = JSON.parse(raw);
                setUserInfo({
                    phone: user.phone || "-",
                    car_number: user.car_number || "-",
                });
            }
        } catch (e) {
            setUserInfo({ phone: "-", car_number: "-" });
        }
    }, []);

    return (
        <div className="booking-box">
            <div className="booking-form">
                <div className="form-row">
                    <div className="form-label">취소사유</div>
                    <div className="form-row">
                        <div className="form-label">선택층</div>
                        <div className="form-input">
                            <select>
                                <option value="">선택하세요</option>
                                <option value="일정변경">일정변경</option>
                                <option value="개인사정">개인사정</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-label">환불수단</div>
                    <div className="form-input">
                        <select>
                            <option value="">선택하세요</option>
                            <option value="신용카드">신용카드</option>
                            <option value="계좌이체">계좌이체</option>
                        </select>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-label">환불예정금액</div>
                    <div className="price">
                        <span className="ment1">
                          환불예정금액
                        </span>
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-label">취소수수료</div>
                    <div className="form-input">
                      <p>취소 수수료</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PassBox;
