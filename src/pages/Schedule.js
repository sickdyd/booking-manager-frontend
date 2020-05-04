import React, { useState, useEffect } from "react";
import client from "../api/client";
import { Spin } from "antd";
import handleError from "../notifications/handleError";
import Calendar from "../components/Calendar";

export default () => {

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSchedule = async() => 
    client.getSchedule()
      .then(res => setSchedule(res?.data || []))
      .catch(err => handleError(err))
      .finally(() => setLoading(false))

  useEffect(() => {
    fetchSchedule()
  }, []);

  return loading ? <Spin /> : <Calendar schedule={schedule} fetchSchedule={fetchSchedule} />
}