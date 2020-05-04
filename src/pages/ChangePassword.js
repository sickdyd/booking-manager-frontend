import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authenticate from "../classes/Authenticate";
import client from "../api/client";
import styled from "styled-components";
import FormPassword from "../components/FormPassword";

export default () => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const changePassword = password => {
    client.changePassword(password, authenticate.getId())
      .then(() => history.push("/home"))
      .finally(() => setLoading(false))
  }

  return (
    <Wrapper>
      <div className="form" style={{ paddingTop: 48 }}>
        <FormPassword
          loading={loading}
          onComplete={changePassword}
          />
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`