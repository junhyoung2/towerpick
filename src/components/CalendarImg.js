const CalendarImg = () => {
  const images = [
    "/images/parkingmap/parkingmap1.jpg",
    "/images/parkingmap/parkingmap2.jpg",
  ];

  return (
    <div className="calendar-img">
      {images.map((src, index) => (
        <img key={index} src={src} alt={`주차 평면도 ${index + 1}`} />
      ))}
    </div>
  );
};

export default CalendarImg;
