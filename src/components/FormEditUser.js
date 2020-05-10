import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import client from "../api/client";
import styled from "styled-components";
import FormUser from "../components/FormUser"
import FormPassword from "../components/FormPassword";

export default (props) => {

  const history = useHistory();

  const { fetchUsers } = props;

  const [loading, setLoading] = useState(false)

  const execute = async(action) => {
    action
      .then(() => fetchUsers())
      .catch(() => history.push("/users"))
      .finally(() => setLoading(false))
  }

  const saveUser = (user, userId) => execute(client.updateUser(user, userId));
  const changePassword = (password, userId) => execute(client.changePassword(password, userId));

  return (
    <Wrapper>
      <FormUser {...props} onComplete={saveUser} loading={loading} />
      <FormPassword id={props.id} onComplete={changePassword} loading={loading} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  margin-top: 24px;

  .ant-btn {
    margin-right: 8px;  
  }
`