import React from "react";

const YesOrNo = () => {
  return (
    <div className="status">
      <p className="label">구매가능 여부</p>
      <div className="or">
        {/* 우선 가능만 보이게... */}
        <span className="ment">가능</span> 
      </div>
    </div>
  );
};

export default YesOrNo;
