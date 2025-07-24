import Step from "./Step";
import CalendarImg from "./CalendarImg";
import DateSelect from "./DateSelect";


const Booking1 = () => {
    return (
       

        <div className="booking1">
            <h2 className="booking-title">예약 일자 선택</h2>
            <Step />
            <DateSelect />
             <CalendarImg />
             
            
        </div>
     
    );
};

export default Booking1;
