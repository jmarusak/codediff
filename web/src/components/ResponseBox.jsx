import React, { useState } from "react";
import "./ResponseBox.css";

const ResponseBox = ({ value }) => {
  return (
    <div className="response-container">
      <div className="response-div" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

export default ResponseBox;
