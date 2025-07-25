import { useNavigate } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";


const Header = ({prev_path,prev_title}) => {
  const navigate = useNavigate();

  //prev 함수
  const handlePrevClick = ()=>{
    navigate(prev_path);
  }

  return (
    <div className="header">
      <div className="head-prev" onClick={handlePrevClick}>
      <div className="prev-icon"><GrPrevious /></div>
      </div>
    <p className="head-title">{prev_title}</p>
    </div>
  );
};

export default Header;