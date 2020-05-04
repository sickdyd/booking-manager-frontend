import React from "react";
import "moment/locale/ja";
import { Layout } from "antd";
import styled from "styled-components";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import Routes from "../routes/Routes";

const { Content, Footer } = Layout;

export default () =>
  <Wrapper>
    <Layout className="layout" theme="light">
      <Header />
      <HeaderMenu />
      <Content style={{ padding: "16px 20px" }}>
        <Routes />
      </Content>
      <Footer className="footer" style={{ textAlign: "center" }}>
        Booking Manager ©2020 Created by Sickdyd
      </Footer>
    </Layout>
  </Wrapper>

const Wrapper = styled.div`

  .layout {
    min-height: 100vh;
  }

  .footer {
    font-size: 11px;
  }

`