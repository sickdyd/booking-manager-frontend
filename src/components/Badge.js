import React from "react";
import { Badge } from "antd";

export default ({ icon, text }) =>
  <Badge status={icon} text={text} style={{ marginRight: "8px" }} />