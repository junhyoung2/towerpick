import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Navigate from "./Navigate";
import { getMyPasses, cancelBooking, cancelPass } from "../utils/towerpickapi";

const CancelPass = () => {
    const navigate = useNavigate();

    // 유저 정보
    const [userInfo, setUserInfo] = useState({
        userID: "",
        phone: "",
        car_number: "",
    });
    const [passData, setPassData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelReason, setCancelReason] = useState("");
    const [refundMethod, setRefundMethod] = useState("");
    const [cancelFee, setCancelFee] = useState("무료");

    const handleCancelFee = (data)=>{        
        if( !data ){ return; }        
        const typeToDays = {
            '1m':30,
            '3m':90,
            '6m':180,
            '12m':365
        }
        const now = new Date(); //오늘날짜
        const start = new Date(data.start_date);
        const end = new Date(data.end_date);
        const oneDay = 1000 * 60 * 60 * 24;
        const toDays = typeToDays[data.duration_type];
        //시작전여부 확인
        const isBeforeStart = now < start;
        //종료일까지 하루 이상 남아 있는지 확인
        const isOneDay = Math.floor((end-now)/oneDay) >= 1;        
        
        //이용 시작 전이고 , 종료일까지 하루 이상 남으면 무료 환불
        if( isBeforeStart && isOneDay ){
            setCancelFee("무료");
            return;
        }
        //이용중인 경우 사용일/잔여일 계산 후 수수료 산정
        if( now >=start && now < end ){
            const useDays = Math.floor((now-start)/oneDay);
            //남은 이용기간 = 전체기간 - 사용기간
            const remainDays = toDays - useDays;
            if( remainDays <= 0 ){
                setCancelFee("환불불가");
                return;
            }
            //환불금액 = (남은일수 / 전체일수)*가격
            const reAmount = Math.floor((remainDays/toDays)*data.price*0.8);
            const feeAmount = (toDays - reAmount)*(-1);
            setCancelFee(`${feeAmount.toLocaleString()}원`);
        }
    }

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
                });            }
        } catch {
            setUserInfo({ userID: "", phone: "", car_number: "" });
        }
    }, []);

    // 2. 예약 정보 로딩
    useEffect(() => {
        if (!userInfo.userID) return;
        const fetchPass = async () => {
            const { data, error } = await getMyPasses(userInfo.userID);            
            if (error || !data || data.length === 0) {
                setPassData(null);
                setLoading(false);
                return;
            }
            const recentBooking = data.find((b) => b.status === "active"); // 가장 최근 active 예약
            setPassData(recentBooking);            
            handleCancelFee(recentBooking);
            setLoading(false);            
        };
        fetchPass();
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
        if (!passData) return;    
        const {data,error} = await cancelPass(passData.id, passData.space_id);
        if( error ) { 
            alert("정기권 예약 취소 시 오류가 발생했습니다.");
            return;
        }
        if( data ){
            navigate("/cancelcomplete");
        }        
    };

    if (loading) return <div>로딩 중...</div>;
    if (!passData) return <div>예약 내역이 없습니다.</div>;

    return (
        <div>
            <Header prev_path="/mypage" prev_title="정기권 취소" />
            <div className="cancel">
                <p className="cancel-title">정기권을 취소하시겠습니까?</p>
                <div className="cancel-box">
                    <div className="cancel-info">예약 정보</div>
                    <div className="cancel-form">
                        <div className="cancel-row">
                            <div className="cancel-label">예약일시</div>
                            <div className="cancel-input">
                                <p>
                                    {passData
                                        ? `${format(
                                              passData.start_date
                                          )}~${format(passData.end_date)}`
                                        : ""}
                                </p>
                            </div>
                        </div>
                        <div className="cancel-row">
                            <div className="cancel-label">예약위치</div>
                            <div className="cancel-input">
                                <p>
                                    {`B${passData.spaces?.floor ?? ""}층  ${
                                        passData.spaces?.slot_number ?? ""
                                    }번`}
                                </p>
                            </div>
                        </div>
                        <div className="cancel-row">
                            <div className="cancel-label">휴대폰번호</div>
                            <div className="cancel-input">
                                <p>{userInfo.phone}</p>
                            </div>
                        </div>
                        <div className="cancel-row">
                            <div className="cancel-label">차량번호</div>
                            <div className="cancel-input">
                                <p>{userInfo.car_number}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="cancel-box">
                    <div className="cancel-form">
                        <div className="cancel-row">
                            <div className="cancel-label">취소사유</div>
                            <select
                                className="value-box ment cancel-input"
                                value={cancelReason}
                                onChange={(e) => setCancelReason(e.target.value)}
                            >
                                <option value="">선택하세요</option>
                                <option value="일정변경">일정변경</option>
                                <option value="개인사정">개인사정</option>
                                <option value="기타">기타</option>
                            </select>
                        </div>
                        <div className="cancel-row">
                            <div className="cancel-label">환불수단</div>
                            <select
                                className="value-box ment cancel-input"
                                value={refundMethod}
                                onChange={(e) => setRefundMethod(e.target.value)}
                            >
                                <option value="">선택하세요</option>
                                <option value="신용카드">신용카드</option>
                                <option value="계좌이체">계좌이체</option>
                            </select>
                        </div>
                        <div className="cancel-row">
                            <div className="cancel-label">환불예정금액</div>
                            <input
                                className="value-box ment1 cancel-input"
                                type="text"
                                value={`${
                                    passData.price?.toLocaleString() || "0"
                                }원`}
                                readOnly
                            />
                        </div>
                        <div className="cancel-row">
                            <label className="cancel-label">취소수수료</label>
                            <input
                                className="value-box ment1 cancel-input"
                                type="text"
                                value={cancelFee}
                                readOnly
                            />
                        </div>
                        <div className="tower-box">
                            <div className="icon">P</div>
                            <div className="text">
                                <h3>Tower Pick</h3>
                                <p>수원시 팔달구 매교로 1234</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="button-group">
                    <button onClick={handleCancel}>예</button>
                    <button onClick={() => navigate("/mypage")}>아니요</button>
                </div>

                <div className="guide">
                    <p>정기권 취소 전 반드시 확인해 주세요</p>
                    <ul>
                        <li>
                            - 정기권 취소는 이용 시작 1시간 전까지 무료로 가능하며, 이후에는 남은 이용 기간을 기준으로 환불 금액이 산정됩니다.
                        </li>
                        <li>
                            - 사용 개시 후 환불 요청 시, 정기권 정가 기준으로 실제 이용 일수를 제외한 금액의 80%만 환불되며, 나머지 20%는 수수료로 공제됩니다.
                        </li>
                        <li>
                            - 결제 수단 및 정기권 조건에 따라 환불 처리 기간은 최대 7~14일 소요될 수 있습니다.
                        </li>
                        <li>
                            - 부정 예약, 무단 변경, 허위 정보 입력 등은 예약 취소 및 서비스 이용 제한의 사유가 될 수 있습니다.
                        </li>
                        <li>
                            기타 문의사항은 고객센터(1234-1234)로 언제든지 연락 주세요.
                        </li>
                    </ul>
                </div>
            </div>
            <Navigate />
        </div>
    );
};

export default CancelPass;
