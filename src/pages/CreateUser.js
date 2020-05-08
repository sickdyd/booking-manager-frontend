import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import client from "../api/client";
import styled from "styled-components";
import FormUser from "../components/FormUser";
import generatePassword from "../utilities/generatePassword";
import Button from "../components/Button";

export default () => {

  const history = useHistory();

  const [loading, setLoading] = useState(false)
  const [createdUser, setCreatedUser] = useState(null);

  const createUser = user => {
    setLoading(true);
    const userWithPassword = { ...user, password: generatePassword() }
    client.createUser(userWithPassword)
      .then(() => setCreatedUser(userWithPassword))
      .catch(() => setCreatedUser(null))
      .finally(() => setLoading(false));
  };

  return (
    <Wrapper>
      <div className="form" style={{ paddingTop: 48 }}>
        {
          createdUser
          ? 
            <>
              <h3 style={{ marginBottom: 24 }}>User created</h3>
              <p>Name: {createdUser.name}</p>
              <p>Surname: {createdUser.surname}</p>
              <p>Email: <strong>{createdUser.email}</strong></p>
              <p>Password: <strong>{createdUser.password}</strong></p>
              <Button onClick={() => history.push(process.env.PUBLIC_URL + "/users")}>OK</Button>
            </>
          :
            <FormUser onComplete={createUser} loading={loading} />

        }
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;

  .ant-btn {
    margin-right: 8px;  
  }
`