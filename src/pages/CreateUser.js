import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import client from "../api/client";
import FormUser from "../components/FormUser";
import generatePassword from "../utilities/generatePassword";
import { Button } from "antd"

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
    createdUser
      ? 
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 32 }}>
          <h3 style={{ marginBottom: 32 }}>User created</h3>
          <p>Name: {createdUser.name}</p>
          <p>Surname: {createdUser.surname}</p>
          <p>Email: <strong>{createdUser.email}</strong></p>
          <p>Password: <strong>{createdUser.password}</strong></p>
          <br />
          <Button type="primary" onClick={() => history.push("/users")}>OK</Button>
        </div>
      :

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center "}}>
        <h2 style={{ margin: 32 }}>Create user</h2>
        <FormUser onComplete={createUser} loading={loading} />
      </div>
  );
};