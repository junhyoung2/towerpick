import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

const AgreePage = () => {
  const [agreeAll, setAgreeAll] = useState(false);
    const [age, setAge] = useState(false);
  const [terms, setTerms] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [event, setEvent] = useState(false);
  const [errorMsn, setErrorMsn] = useState('');
  const navigate = useNavigate('');

  useEffect(() => {
    const allAgreed = terms && age && privacy && event;
    setAgreeAll(allAgreed);
  }, [terms, age, privacy, event]); 

  useEffect(() => {
    if (age && terms && privacy) {
      setErrorMsn('');
    }
  }, [age, terms, privacy]);

  // 약관 전체 동의 체크박스 변경 핸들러
  const handleAllChange = (e) => {
    const isChecked = e.target.checked;
    setAgreeAll(isChecked);
    setTerms(isChecked);
    setAge(isChecked);
    setPrivacy(isChecked);
    setEvent(isChecked);
  };

  // 개별 약관 체크박스 변경 핸들러
  const handledChange = (setter, e) => {
    setter(e.target.checked); 
  };

  // 모든 필수 약관 동의 검사 (가입 버튼 활성화 등)
  const isFormValid = terms && age && privacy;

  const handleNextStep = () => {
  if (isFormValid) {
    // 모든 필수 항목이 체크되었다면 다음 단계로 이동
    navigate("/joinpage"); // 경로에 맞게 수정
  } else {
    // 필수 항목이 체크되지 않았다면 에러 메시지 설정
    setErrorMsn("*필수 항목을 모두 체크해주세요");
  }
};


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
      <div className="terms">
        <div className="agree-all">
          <input
            type="checkbox"
            id="agree"
            checked={agreeAll}
            onChange={handleAllChange}
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
              onChange={(e) => handledChange(setAge, e)}
            />
            <label htmlFor="agree1">19세 이상입니다(필수)</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="agree2"
              checked={terms}
              onChange={(e) => handledChange(setTerms, e)}
            />
            <label htmlFor="agree2" className="icon">
              이용 약관 동의(필수)
              </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="agree3"
              checked={privacy}
              onChange={(e) => handledChange(setPrivacy, e)}
            />
            <label htmlFor="agree3" className="icon">
              개인정보 수집 및 이용 동의(필수)
            </label>
          </li>
          <li>
            <input
              type="checkbox"
              id="agree4"
              checked={event}
              onChange={(e) => handledChange(setEvent, e)}
            />
            <label htmlFor="agree4">할인, 이벤트 정보 수신(선택)</label>
          </li>
        </ul>
      </div>
      <div className="next-btn">
        <button
          onClick={handleNextStep}
          className={isFormValid ? "" : "next-step-btn"}
          >다음단계
        </button>
        {
        errorMsn &&
        <p className="error-message">{errorMsn}</p>}
      </div>
      
    </div>
  );
};

export default AgreePage;
