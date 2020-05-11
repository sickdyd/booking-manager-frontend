import React, { useState, useEffect } from "react";
import moment from "moment";
import client from "../api/client";
import handleError from "../notifications/handleError";
import ScheduleTable from "../components/ScheduleTable";
import Spin from "../components/Spin";

export default () => {

  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  const convertToTableValues = data => {

    const result = data.map(day => ({
      key: day.unix,
      unix: day.unix,
      day: moment.unix(day.unix).format("LL dddd"),
      slots: day.slots
    }));

    setSchedule(result);

  }

  const fetchSchedule = async() => 
    client.getSchedule()
      .then(res => convertToTableValues(res?.data || []))
      .catch(err => handleError(err))
      .finally(() => setLoading(false))

  useEffect(() => {
    fetchSchedule()
  // eslint-disable-next-line
  }, []);

  return loading
    ? <Spin />
    : <ScheduleTable schedule={schedule} fetchSchedule={fetchSchedule} />
}