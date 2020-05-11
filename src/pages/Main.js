import React from "react";
import styled from "styled-components";
import Header from "../components/Header";
import HeaderMenu from "../components/HeaderMenu";
import Routes from "../routes/Routes";

export default () =>
  <Wrapper>
    <div>
      <Header />
      <HeaderMenu />
      <div className="wrapper">
        <div className="content">
          <Routes />
        </div>
      </div>
    </div>
  </Wrapper>

const Wrapper = styled.div`

  height: 100%;

  .wrapper {
    
    padding: 4em 5vw 0 5vw;
    min-height: 100%;
  }

  .content {
    display: flex;
    justify-content: center;
    background-color: rgb(250, 250, 250);
    border-radius: var(--border-radius);
    box-shadow: var(--box-shadow);
    margin-bottom: 4em;
  }

  .footer {
    font-size: 11px;
  }

  @media only screen and (max-width: 800px) {

    .wrapper {
      padding: 1em;
    }

    .content {
      margin-bottom: 1em;
    }
  }

`