import React from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const TargetDate = ({ targetDate, handleTargetDateChange }) => {
  const getMaxDate = (date, additionalDays) => {
    date.setDate(date.getDate() + additionalDays);
    return date;
  };

  return (
    <div>
      <span>Till </span>
      <DatePicker
        selected={targetDate}
        onChange={date => handleTargetDateChange(date)}
        minDate={new Date()}
        maxDate={getMaxDate(new Date(), 365)}
      />
    </div>
  );
}

export default TargetDate; 