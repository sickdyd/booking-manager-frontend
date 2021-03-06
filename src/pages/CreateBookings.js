import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Spin from "../components/Spin";
import client from "../api/client";
import FormCreateBooking from "../components/FormCreateBooking";

export default () => {

  const history = useHistory();

  const [loading, setLoading] = useState(true);
  // To show the possible slots to assign
  const [slots, setSlots] = useState();

  useEffect(() => {
    client.getDaySlots()
      .then(res => {
        setSlots(res.data);
        setLoading(false);
      })
      .catch(() => history.push("/"))
  // eslint-disable-next-line
  }, []);

  const onSubmit = async(userId, day, slot, from, to) => {
    client.bookBatch({ userId, day, slot, from, to })
  };

  return (
    loading
    ? <Spin />
    : 
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center "}}>
        <h2 style={{ margin: 32 }}>Create bookings</h2>
        <FormCreateBooking onSubmit={onSubmit} slots={slots} />
      </div>
  );
};