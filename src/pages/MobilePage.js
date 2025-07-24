import { Route, Routes } from "react-router-dom";
import StartPage from "../components/StartPage";


const MobilePage = () => {

    return (
        <div id="mobile-page">
            <Routes>
                <Route path="/" element={<StartPage />}></Route>
            </Routes>
        </div>
    );
};

export default MobilePage;
