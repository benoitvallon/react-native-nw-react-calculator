"use strict";

import React from "react";
export default function (props, state) {
  return (
    <div className="screen" style={{ flexDirection: "column" }}>
      <div>{state.displayScreen}</div>
      <div>{state.displayNumber}</div>
    </div>
  );
}
