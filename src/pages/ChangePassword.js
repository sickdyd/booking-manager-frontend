import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import authenticate from "../classes/Authenticate";
import client from "../api/client";
import FormPassword from "../components/FormPassword";

export default () => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);

  const changePassword = password => {
    client.changePassword(password, authenticate.getId())
      .then(() => history.push("/schedule"))
      .catch(() => setLoading(false))
  }

  return (
    <FormPassword
      loading={loading}
      onComplete={changePassword}
    />

  )
}