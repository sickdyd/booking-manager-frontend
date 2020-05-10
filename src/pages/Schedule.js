import React, { useState, useEffect } from "react";
import moment from "moment";
import styled from "styled-components";
import client from "../api/client";
import handleError from "../notifications/handleError";
import ScheduleTable from "../components/ScheduleTable";
import Spin from "../components/Spin";
import PointsDisplay from "../components/PointsDisplay";
import authenticate from "../classes/Authenticate";

export default () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleData = data => {

    const result = data.schedule.map(day => ({
      key: day.unix,
      unix: day.unix,
      day: moment.unix(day.unix).format("LL dddd"),
      slots: day.slots
    }));

    setData({ schedule: result, totalItems: data.totalItems });

  }

  const fetchSchedule = async(page, perPage) => 
    client.getSchedule(page, perPage)
      .then(res => handleData(res?.data || []))
      .catch(err => handleError(err))
      .finally(() => setLoading(false))

  useEffect(() => {
    fetchSchedule()
  }, []);

  return loading
    ? <Spin />
    :
      <Wrapper>
        {!authenticate.isAdmin() && <PointsDisplay schedule={data.schedule} />}
        <ScheduleTable schedule={data.schedule} fetchSchedule={fetchSchedule} totalItems={data.totalItems} />
      </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`