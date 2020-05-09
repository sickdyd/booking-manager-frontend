import React from "react";
import { Layout } from "antd";
import styled from "styled-components";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import Routes from "../routes/Routes";

const { Footer } = Layout;

export default () =>
  <Wrapper>
    <Layout className="layout" theme="light">
      <Header />
      <HeaderMenu />
      <div className="content">
        <Routes />
      </div>
      <Footer className="footer" style={{ textAlign: "center" }}>
      </Footer>
    </Layout>
  </Wrapper>

const Wrapper = styled.div`

  .layout {
    min-height: 100vh;
  }

  .content {
    display: flex;
    justify-content: center;
    padding: 4em 25vw 0 25vw;
  }

  .footer {
    font-size: 11px;
  }

  @media only screen and (max-width: 800px) {

    .content {
      padding: 2em 16px 0 16px;
    }
  }

`