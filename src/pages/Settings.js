import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import client from "../api/client";
import FormSettings from "../components/FormSettings";
import Spin from "../components/Spin";

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
  // eslint-disable-next-line
  }, []);

  return (
    loading
    ?
      <Spin />
    :
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center "}}>
        <h2 style={{ margin: 32 }}>Settings</h2>
        <FormSettings
          settings={settings}
          loading={loading}
          onComplete={saveSettings}
          />
      </div>
  )
}