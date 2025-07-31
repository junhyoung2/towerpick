import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Navigate from "./Navigate";
import { getMyBookings, cancelBooking } from "../utils/towerpickapi";

const CancelGeneral = () => {
    const navigate = useNavigate();

    // 유저 정보
    const [userInfo, setUserInfo] = useState({
        userID: "",
        phone: "",
        car_number: "",
    });
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelReason, setCancelReason] = useState("");
    const [refundMethod, setRefundMethod] = useState("");
    const [cancelFee, setCancelFee] = useState("무료");

    // 1. 유저 정보 로딩
    useEffect(() => {
        try {
            const raw = localStorage.getItem("towerpick");
            if (raw) {
                const user = JSON.parse(raw);
                setUserInfo({
                    userID: user.userID || user.id || user.member_id || "",
                    phone: user.phone || "",
                    car_number: user.car_number || "",
                });
            }
        } catch {
            setUserInfo({ userID: "", phone: "", car_number: "" });
        }
    }, []);

    // 2. 예약 정보 로딩
    useEffect(() => {
        if (!userInfo.userID) return;
        const fetchBooking = async () => {
            const { data, error } = await getMyBookings(userInfo.userID);
            if (error || !data || data.length === 0) {
                setBookingData(null);
                setLoading(false);
                return;
            }
            const recentBooking = data.find((b) => b.status === "active"); // 가장 최근 active 예약
            setBookingData(recentBooking);
            setLoading(false);
        };
        fetchBooking();
    }, [userInfo.userID]);

    // yy.mm.dd.hh.mm 포맷 (일반권은 시/분 필요)
    function format(dt) {
        if (!dt) return "";
        const d = new Date(dt);
        const pad = (n) => n.toString().padStart(2, "0");
        return `${d.getFullYear().toString().slice(2)}.${pad(
            d.getMonth() + 1
        )}.${pad(d.getDate())}.${pad(d.getHours())}.${pad(d.getMinutes())}`;
    }

    // 정기권처럼 실제로 예약 취소
    const handleCancel = async () => {
        if (!bookingData) return;
        await cancelBooking(bookingData.id, bookingData.space_id);
        navigate("/cancelcomplete");
    };

    if (loading) return <div>로딩 중...</div>;
    if (!bookingData) return <div>예약 내역이 없습니다.</div>;

    return (
        <div>
            <Header
                prev_path="/MyReserve"
                prev_title={
                    <div style={{ width: "100%", textAlign: "center" }}>
                        예약 취소
                    </div>
                }
            />
            <div className="cancel">
                <p className="booking-title">예약을 취소하시겠습니까?</p>
                <div className="info-section">
                    <div className="booking-box">
                        <h2 className="booking-title">예약 정보</h2>
                        <div className="booking-form">
                            <div className="form-row">
                                <label className="form-label">예약일시</label>
                                <input
                                    className="value-box"
                                    type="text"
                                    value={
                                        bookingData
                                            ? `${format(
                                                  bookingData.start_time
                                              )}~${format(
                                                  bookingData.end_time
                                              )}`
                                            : ""
                                    }
                                    readOnly
                                />
                            </div>
                            <div className="form-row">
                                <label className="form-label">예약위치</label>
                                <input
                                    className="value-box"
                                    type="text"
                                    value={`B${
                                        bookingData.spaces?.floor ?? ""
                                    }층  ${
                                        bookingData.spaces?.slot_number ?? ""
                                    }번`}
                                    readOnly
                                />
                            </div>
                            <div className="form-row">
                                <label className="form-label">휴대폰번호</label>
                                <input
                                    className="value-box"
                                    type="text"
                                    value={userInfo.phone}
                                    readOnly
                                />
                            </div>
                            <div className="form-row">
                                <label className="form-label">차량번호</label>
                                <input
                                    className="value-box"
                                    type="text"
                                    value={userInfo.car_number}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>

                    <div className="info-box">
                        <div className="status">
                            <label className="label">취소사유</label>
                            <select
                                className="value-box ment"
                                value={cancelReason}
                                onChange={(e) =>
                                    setCancelReason(e.target.value)
                                }
                            >
                                <option value="">선택하세요</option>
                                <option value="일정변경">일정변경</option>
                                <option value="개인사정">개인사정</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                        <div className="status">
                            <label className="label">환불수단</label>
                            <select
                                className="value-box ment"
                                value={refundMethod}
                                onChange={(e) =>
                                    setRefundMethod(e.target.value)
                                }
                            >
                                <option value="">선택하세요</option>
                                <option value="신용카드">신용카드</option>
                                <option value="계좌이체">계좌이체</option>
                            </select>
                        </div>
                        <div className="status">
                            <label className="label">환불예정금액</label>
                            <input
                                className="value-box ment1"
                                type="text"
                                value={`${
                                    bookingData.price?.toLocaleString() || "0"
                                }원`}
                                readOnly
                            />
                        </div>
                        <div className="status">
                            <label className="label">취소수수료</label>
                            <input
                                className="value-box ment1"
                                type="text"
                                value={cancelFee}
                                readOnly
                            />
                        </div>
                        <div className="tower-box">
                            <div className="icon">🅿️</div>
                            <div className="text">
                                <h3>Tower Pick</h3>
                                <p>수원시 팔달구 매교로 1234</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={handleCancel}>예</button>
                    <button onClick={() => navigate(-1)}>아니요</button>
                </div>

                <div className="guide">
                    <p>예약 취소 전 반드시 확인해 주세요</p>
                    <ul>
                        <li>
                            - 예약 취소는 이용 1시간 전까지 무료로 가능하며,
                            이후에는 취소 및 환불이 불가능합니다.
                        </li>
                        <li>
                            - 결제 수단 및 예약 조건에 따라 환불 처리 기간은
                            최대 7~14일 소요될 수 있습니다.
                        </li>
                        <li>
                            - 취소 후 재예약을 원하실 경우, 다시 예약 절차를
                            진행해 주셔야 합니다.
                        </li>
                        <li>
                            - 부정 예약, 무단 변경, 허위 정보 입력 등은 예약
                            취소 및 서비스 이용 제한의 사유가 될 수 있습니다.
                        </li>
                        <li>
                            기타 문의사항은 고객센터(1234-1234)로 언제든지 연락
                            주세요.
                        </li>
                    </ul>
                </div>
            </div>
            <Navigate />
        </div>
    );
};

export default CancelGeneral;
