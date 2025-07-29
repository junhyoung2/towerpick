import { useEffect, useState } from "react";
import { fetchSignUp } from "../utils/towerpickapi";
import { useNavigate } from "react-router-dom";

const JoinPage = () => {
    const [userid, setUserid] = useState("");
    const [userpw, setUserpw] = useState("");
    const [userpwre, setUserpwre] = useState("");
    const [userphone, setUserphone] = useState("");
    const [isMatch, setIsMatch] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (userpw.length <= 0 || userpwre.length <= 0) {
            setIsMatch(false);
            return;
        }
        setIsMatch(userpw === userpwre);
    }, [userpw, userpwre]);

    const handleClick = async () => {
        if (!userid && !userpw && !userphone && !isMatch) {
            return;
        }
        //회원가입 실행
        const { data, error } = await fetchSignUp(userid, userpw, userphone);
        if (error) {
            alert("회원 가입시 오류가 발생했습니다");
            return;
        }
        if (data) {
            alert("회원가입이 완료되었습니다");
            //로그인 창으로 이동
            navigate("/login");
        }
    };

    return (
        <div className="join-page">
            <div className="join-title">
                <h3>회원가입</h3>
                <hr />
            </div>
            <div className="join-wrap">
                <label>
                    <span>아이디</span>
                    <input
                        required
                        type="text"
                        value={userid}
                        onChange={(e) => {
                            setUserid(e.target.value);
                        }}
                        placeholder="아이디를 입력해주세요"
                    />
                </label>
                <label>
                    <span>비밀번호</span>
                    <input
                        required
                        type="text"
                        value={userpw}
                        onChange={(e) => {
                            setUserpw(e.target.value);
                        }}
                        placeholder="비밀번호를 입력해주세요"
                    />
                </label>
                <label>
                    <span>비밀번호 재입력</span>
                    <input
                        required
                        type="text"
                        value={userpwre}
                        onChange={(e) => {
                            setUserpwre(e.target.value);
                        }}
                        placeholder="비밀번호를 다시 입력해주세요"
                    />
                </label>
                <p style={{ color: isMatch ? "green" : "red" }}>
                    {userpwre.length > 0 &&
                        (isMatch
                            ? "*비밀번호가 일치합니다"
                            : "*비밀번호가 일치하지 않습니다")}
                </p>
                <label>
                    <span>휴대폰 번호</span>
                    <input
                        required
                        type="text"
                        value={userphone}
                        onChange={(e) => {
                            setUserphone(e.target.value);
                        }}
                        placeholder="휴대폰 번호를 입력해주세요"
                    />
                </label>
            </div>
            <button className="join-btn" onClick={handleClick}>
                회원가입
            </button>
        </div>
    );
};

export default JoinPage;
