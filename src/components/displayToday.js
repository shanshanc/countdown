import React from 'react';

import './displayToday.css'

const DisplayToday = () => {
  const currentDate = new Date();
  
  return (
    <div className="today">
      <p>Today: {currentDate.getFullYear()}/{currentDate.getMonth()+1}/{currentDate.getDate()}</p>
    </div>
  )
}

export default DisplayToday;