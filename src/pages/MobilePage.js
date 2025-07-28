import { Route, Routes } from "react-router-dom";
import StartPage from "../components/StartPage";
import Login from "../components/Login";
import AgreePage from "../components/AgreePage";
import JoinPage from "../components/JoinPage";
import MainPage from "../components/MainPage";
import Information from "../components/Information";
import Booking1 from "../components/Booking1";
import Booking2 from "../components/Booking2";
import Booking3 from "../components/Booking3";
import Season1 from "../components/Season1";
import CancelComplete from "../components/CancelComplete";

const MobilePage = () => {
  return (
    <div id="mobile-page">
      <Routes>
        <Route path="/" element={<StartPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        {/* <Route path="/" element={<AgreePage />}></Route> */}
        {/* <Route path="/" element={<JoinPage />}></Route> */}
        <Route path="/mainpage" element={<MainPage />}></Route>
        <Route path="/information" element={<Information />}></Route>
        <Route path="/booking1" element={<Booking1 />}></Route>
        <Route path="/booking2" element={<Booking2 />}></Route>
        <Route path="/booking3" element={<Booking3 />}></Route>
        <Route path="/season1" element={<Season1 />}></Route>
        <Route path="/cancelcomplete" element={<CancelComplete />}></Route>
      </Routes>
    </div>
  );
};

export default MobilePage;
