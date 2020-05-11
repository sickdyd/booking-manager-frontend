import React from "react";
import { Layout, Tooltip, Button } from "antd";
import styled from "styled-components";
import authenticate from "../classes/Authenticate";
import { LogoutOutlined } from "@ant-design/icons";

const { Header } = Layout;

export default () => {

  return (
    <Wrapper>
      <Header className="header">
        <div className="logo">Booking</div>
        {
          authenticate.authenticated &&
          <Tooltip title="ログアウト">
            <Button size="small" onClick={() => authenticate.logout()} shape="circle" icon={<LogoutOutlined />} />
          </Tooltip>
        }
      </Header>
    </Wrapper>
  )
}

const Wrapper = styled.div`

  .logo {
    color: white;
    font-size: 1.1rem;
    font-weight: bold;
  }

  .header {
    padding: 32px !important;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`