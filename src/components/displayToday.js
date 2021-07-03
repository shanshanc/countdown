import React from 'react';

const DisplayToday = () => {
  const currentDate = new Date();
  
  return (
    <div className="countdown-box">
      <p>Today: {currentDate.getFullYear()}/{currentDate.getMonth()+1}/{currentDate.getDate()}</p>
    </div>
  )
}

export default DisplayToday;