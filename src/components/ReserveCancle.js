import { useNavigate } from "react-router-dom";


const ReserveCancle = () => {
  const navigate = useNavigate('');
  return (
    <div className="reserve-cancle">
      <button
        className="cancle"
        onClick={() => {
          navigate("/cancelpass");
        }}
      >
        예약 취소
      </button>
    </div>
  );
};

export default ReserveCancle;