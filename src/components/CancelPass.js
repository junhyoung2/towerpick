
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Navigate from "./Navigate";
import { cancelPass, getMyPasses } from "../utils/towerpickapi";

const CancelPass = () => {
    const navigate = useNavigate();

    
    const userID = "user-1";

    const [pass, setPass] = useState(null);
    const [loading, setLoading] = useState(true);

    const [cancelReason, setCancelReason] = useState("");
    const [refundMethod, setRefundMethod] = useState("");
    const [cancelFee, setCancelFee] = useState(0);
    const [refundAmount, setRefundAmount] = useState(0);

    useEffect(() => {
        const fetchPass = async () => {
            const { data, error } = await getMyPasses(userID);
            console.log(" getMyPasses 결과:", data, error);

            if (data && data.length > 0) {
                const activePass = data.find(p => p.status === "active");
                if (activePass) {
                    setPass(activePass);
                    calculateFee(activePass);
                }
            }

            setLoading(false);
        };

        fetchPass();
    }, []);

    const calculateFee = (passData) => {
        const start = new Date(passData.start_date);
        const end = new Date(passData.end_date);
        const now = new Date();

        const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
        const usedDays =
            now < start ? 0 : Math.ceil((now - start) / (1000 * 60 * 60 * 24));

        let refund = 0;

        if (now < start) {
            refund = passData.price;
        } else {
            const remainingDays = Math.max(totalDays - usedDays, 0);
            refund = passData.price * (remainingDays / totalDays) * 0.8;
        }

        const fee = passData.price - refund;
        setRefundAmount(Math.round(refund));
        setCancelFee(Math.round(fee));
    };

    const handleCancel = async () => {
        if (!pass) return;
        await cancelPass(pass.id, pass.space_id);
        navigate("/cancelcomplete");
    };

    if (loading) return <div>로딩 중...</div>;
    if (!pass) return <div>정기권 예약 내역이 없습니다.</div>;

    return (
       <div>
    <Header
      prev_path="/reservation"
      prev_title={<div style={{ width: "100%", textAlign: "center" }}>정기권 예약 취소</div>}
    />
            <div className="cancel-general">
            <p className="question">정기권을 취소하시겠습니까?</p>

            <div className="info-section">
                <div className="info-box">
                    <h2 className="info-title">예약 정보</h2>

                    <div className="info-row">
                        <label className="label">예약일시</label>
                        <input
                            className="value-box"
                            type="text"
                            value={new Date(pass.start_date).toLocaleString()}
                            readOnly
                        />
                    </div>
                    <div className="info-row">
                        <label className="label">예약 위치</label>
                        <input
                            className="value-box"
                            type="text"
                            value={`층: ${pass.spaces?.floor ?? ""}, 번호: ${pass.spaces?.slot_number ?? ""}`}
                            readOnly
                        />
                    </div>
                    <div className="info-row">
                        <label className="label">차량번호</label>
                        <input
                            className="value-box"
                            type="text"
                            value="조회 불가 (members와 연결되지 않음)"
                            readOnly
                        />
                    </div>
                </div>

                <div className="info-box">
                    <div className="info-row">
                        <label className="label">취소사유</label>
                        <select
                            className="value-box"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        >
                            <option value="">선택하세요</option>
                            <option value="일정변경">일정변경</option>
                            <option value="개인사정">개인사정</option>
                            <option value="기타">기타</option>
                        </select>
                    </div>

                    <div className="info-row">
                        <label className="label">환불수단</label>
                        <select
                            className="value-box"
                            value={refundMethod}
                            onChange={(e) => setRefundMethod(e.target.value)}
                        >
                            <option value="">선택하세요</option>
                            <option value="신용카드">신용카드</option>
                            <option value="계좌이체">계좌이체</option>
                        </select>
                    </div>

                    <div className="info-row">
                        <label className="label">환불예정금액</label>
                        <input
                            className="value-box"
                            type="text"
                            value={`${refundAmount.toLocaleString()}원`}
                            readOnly
                        />
                    </div>

                    <div className="info-row fee">
                        <label className="label">취소수수료</label>
                        <input
                            className="value-box"
                            type="text"
                            value={`${cancelFee.toLocaleString()}원`}
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
                <button className="btn confirm" onClick={handleCancel}>
                    예
                </button>
                <button className="btn cancel" onClick={() => navigate(-1)}>
                    아니요
                </button>
            </div>

            <div className="cancel-warning">
                <h4>정기권 취소 전 반드시 확인해 주세요</h4>
                <ul>
                    <li>
                        - 정기권 취소는 이용 시작 1시간 전까지 무료로 가능하며,
                        이후에는 남은 이용 기간을 기준으로 환불 금액이
                        산정됩니다.
                    </li>
                    <li>
                        - 사용 개시 후 환불 요청 시, 정기권 정가 기준으로 실제
                        이용 일수를 제외한 금액의 80%만 환불되며, 나머지 20%는
                        수수료로 공제됩니다.
                    </li>
                    <li>
                        - 결제 수단 및 정기권 조건에 따라 환불 처리 기간은 최대
                        7~14일 소요될 수 있습니다.
                    </li>
                    <li>
                        - 취소 후 재예약을 원하실 경우, 다시 예약 절차를 진행해
                        주셔야 합니다.
                    </li>
                    <li>
                        - 부정 예약, 무단 변경, 허위 정보 입력 등은 예약 취소 및
                        서비스 이용 제한의 사유가 될 수 있습니다.
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

export default CancelPass;
