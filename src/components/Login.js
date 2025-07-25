
const Login = () => {
  return (
    <div className="login-page">
      <img
        src={`${process.env.PUBLIC_URL}images/logo_blue.png`}
        alt="TowerPick 로고"
        className="logo"
      />

      <div className="input-group">
        <label htmlFor="userId">아이디</label>
        <input
          id="userId"
          type="text"
          placeholder="아이디를 입력해주세요"
        />
      </div>

      <div className="input-group">
        <label htmlFor="password">비밀번호</label>
        <input
          id="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
        />
      </div>

      <div className="links">
        <a href="#">아이디 찾기</a>
        <a href="#">비밀번호 찾기</a>
      </div>

      <button className="login-button">로그인</button>
 
      <div className="social-login">
        <img src="/images/kakao.png" alt="Kakao Login" />
        <img src="/images/naver.png" alt="Naver Login" />
        <img src="/images/google.png" alt="Google Login" />
      </div>

      <div className="signup">
        <a href="#">회원가입</a>
      </div>
    </div>
  );
};

export default Login ;
