import Step from "./Step";
import CalendarImg from "./CalendarImg";
import DateSelect from "./DateSelect";
import YesorNo from "./YesorNo";
import Price1 from "./Price1";


const Booking1 = () => {
    return (
       

        <div className="booking1">
            <h2 className="booking-title">예약 일자 선택</h2>
            <Step />
            <DateSelect />
               <YesorNo/>
               <Price1/>
             <CalendarImg />
          
              <button>다음단계</button>
             
            
        </div>
     
    );
};

export default Booking1;
