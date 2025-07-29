import "./app.scss";
import { useState, useEffect } from "react";
import MobilePage from "./pages/MobilePage";
import TabletPage from "./pages/TabletPage";
import { HashRouter } from "react-router-dom";


const App = () => {
    //모바일,데스크탑 사이즈 지정
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    useEffect(() => {
        const handleSize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        handleSize();
        //모바일,테블릿 사이즈 자동 변환(새로고침X)
        window.addEventListener("resize", handleSize);
        return () => {
            window.addEventListener("resize", handleSize);
        };
    }, []);
    return (
        <HashRouter>
            <div id="app">
                {isMobile ? (
                    <MobilePage isMobile={isMobile} />
                ) : (
                    <TabletPage isMobile={isMobile} />
                )}
            </div>
        </HashRouter>
    );
};
export default App;
