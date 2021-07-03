import React from 'react';

import './displayBox.css'

function DisplayBox({unitValue, unitName}) {
  return (
    <div className="countdown-box">
      <span>{unitValue}</span>
      <span className="unit">{unitName}</span>
    </div>
  )

}

export default DisplayBox;