import React, { useState, useEffect } from "react";
import moment from "moment";
import client from "../api/client";
import ScheduleTable from "../components/ScheduleTable";
import Spin from "../components/Spin";
import handleError from "../notifications/handleError";
// import Calendar from "../components/Calendar";

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
  }, []);

  return loading ? <Spin /> : <div><ScheduleTable schedule={schedule} fetchSchedule={fetchSchedule} /></div>
}