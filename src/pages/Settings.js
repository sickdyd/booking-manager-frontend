import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import client from "../api/client";
import styled from "styled-components";
import FormSettings from "../components/FormSettings";
import { Spin } from "antd";

export default () => {

  const history = useHistory();

  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState();

  const saveSettings = settings => {
    setLoading(true);
    client.saveSettings(settings)
      .then(res => setSettings(res.data))
      .finally(() => setLoading(false))
  }

  const getSettings = () => {
    setLoading(true);
    client.getSettings()
      .then(res => {
        setSettings(res.data);
        setLoading(false);
      })
      .catch(() => history.push("/"))
  }

  useEffect(() => {
    getSettings();
  }, []);

  return (
    loading
    ?
      <Spin />
    :
      <Wrapper>
        <FormSettings
          settings={settings}
          loading={loading}
          onComplete={saveSettings}
          />
      </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`