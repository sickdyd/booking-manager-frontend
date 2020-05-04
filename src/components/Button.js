import React from "react";
import { Button } from "antd";

export default (props) =>
  <Button shape="round" size="small" style={{ margin: "8px" }} { ...props }>
    {props.children}
  </Button>