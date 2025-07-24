import { Route, Routes } from "react-router-dom";
import StartPage from "../components/StartPage";
import Booking1 from "../components/Booking1";
import Booking2 from "../components/Booking2";
import Booking3 from "../components/Booking3";


const MobilePage = () => {

    return (
        <div id="mobile-page">
            <Routes>
                {/* <Route path="/" element={<StartPage />}></Route> */}
                {/* <Route path="/" element={<Booking1 />}></Route> */}
                <Route path="/" element={<Booking2 />}></Route>
                {/* <Route path="/" element={<Booking3 />}></Route> */}
            </Routes>
        </div>
    );
};

export default MobilePage;
