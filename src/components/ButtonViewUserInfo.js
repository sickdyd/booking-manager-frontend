import React from "react";
import { Tooltip, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";

export default ({ onClick }) => 
  <Tooltip placement="left" title={"View user info"}>
    <Button onClick={onClick} shape="circle" size="small" style={{ marginRight: "8px" }} icon={<UserOutlined />} />
  </Tooltip>