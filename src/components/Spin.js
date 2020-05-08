import React from "react";
import { Spin } from "antd";

export default () =>
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh"
  }}>
    <Spin />
  </div>