import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Navigate from "../components/Navigate";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import { LuSquareParking } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { MdOutlinePregnantWoman } from "react-icons/md";
import { TbDisabled } from "react-icons/tb";
import { MdElectricCar } from "react-icons/md";

const MainPage = () => {
  const navigate = useNavigate();
  return (
    <div className="main-page">
      {/* 공통헤더 */}
      <Header prev_path="/Login" prev_title="홈" />

      {/* 주차구역 / 위치 및 잔여석 */}
      <div className="section-one">
        <div className="parking-area">
          <h3>주차구역 찾기</h3>
          <br />
          <p>원하는 위치에 빈자리, <br />
            지금 바로 확인하세요
          </p>
          <br />
          <p>#실시간</p>
        </div>
        <div className="location">
          <h3>위치 및 잔여석</h3>
          <br />
          <div className="seats">
            <div className="seats-one">
              <h4>B1</h4>
              <TfiLayoutLineSolid
                className="line"
              />
              <p>15석/30석</p>
            </div>
            <div className="seats-two">
              <h4>B2</h4>
              <TfiLayoutLineSolid
                className="line"
              />
              <p>28석/30석</p>
            </div>
            <div className="seats-three">
              <h4>B3</h4>
              <TfiLayoutLineSolid
                className="line"
              />
              <p>21석/30석</p>
            </div>
          </div>
        </div>
      </div>

      {/* 예약 / 정기권 */}
      <div className="section-two">
        <div className="reservation">
          <h3>예약</h3>
          <br />
          <p>시간 맞춰 딱! <br />
            사전 예약으로 편리하게
          </p>
          <button
            onClick={() => { navigate("/booking1") }}
          >바로가기</button>
        </div>
        <div className="ticket">
          <h3>정기권 구매</h3>
          <br />
          <p>한 번 결제로 한 달! <br />
            편하게 이용하세요
          </p>
          <button
            onClick={() => { navigate("/Season1") }}
          >바로가기</button>
        </div>
      </div>

      {/* 이용 안내 */}
      <div className="information">
        <div className="infor-header">
          <LuSquareParking
            className="parking-icon"
          />
          <h3>이용 안내</h3>
        </div>
        <div className="infor">
          <div className="infor-text">
            <p>
              매번 찾지 말고, <br />
              고정된 자리로 편하게 주차하세요
            </p>
            <button
              onClick={() => { navigate("/information") }}
            >최대 30% 할인</button>
          </div>
          <div className="search-icon">
            <LuSearch
              onClick={() => { navigate("/information") }}
            />
          </div>
        </div>
      </div>

      {/* B1 주차 안내 */}
      <div className="parking-b1">
        <div className="b1-box">
          <h3>B1</h3>
        </div>
        <div className="b1-icon">
          <div className="b1-one">
          <MdOutlinePregnantWoman
            className="b1-icon"
          />
          <p>임산부 배려구역</p>
        </div>
        <div className="b1-two">
          <TbDisabled
            className="b1-icon"
          />
          <p>장애인 전용구역</p>
        </div>
        </div>
        <img src="images/homebg/homebg_b1.png" art="B1 주차장 이미지" />
      </div>
      {/* B2-B3 주차 안내 */}
      <div className="b2-box">
          <h3>B2~B3</h3>
      </div>
      <div className="parking-b2">
        <div className="b2-one">
          <MdElectricCar
            className="b2-icon"
          />
          <p>전기차 충전구역</p>
        </div>
        <img src="images/homebg/homebg_b2.jpg" art="B2 주차장 이미지" />
      </div>

      {/* 푸터 */}
      <footer className="footer">
        <p>이벤트</p>
        <p>공지사항</p>
        <p>이용안내</p>
        <p>제휴문의</p>
        <p>자주 묻는 질문</p>
        <p>고객센터</p>
        <br />
        <p>대표이사 : 소은경</p>
        <p>주소 : 수원 팔달구 덕영대로 899 3층</p>
        <p>대표번호 : 0507-1361-5225</p>
        <img src="images/footer_logo.png" art="푸터 로고" />
        <p>ⓒ2025 (TowerPick).All rights reserrved.</p>
      </footer>
      <Navigate />
    </div>
  );
};

export default MainPage; 