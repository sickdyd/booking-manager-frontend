import React from "react";
import { Tooltip, Button } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

export default ({ onClick }) => 
  <Tooltip placement="left" title={"Add user"}>
    <Button onClick={onClick} shape="circle" size="small" style={{ marginRight: "8px" }} icon={<UserAddOutlined />} />
  </Tooltip>