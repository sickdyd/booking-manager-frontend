import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import client from "../api/client";
import FormCreateBooking from "../components/FormCreateBooking";

export default () => {

  const [loading, setLoading] = useState(true);
  // To show the possible slots to assign
  const [slots, setSlots] = useState();

  useEffect(() => {
    client.getDaySlots()
      .then(res => setSlots(res.data))
      .finally(() => setLoading(false))
  }, []);

  const onFinish = async(props) => {
    console.log(props);
  };

  return (
    loading
    ? <Spin />
    : 
      <>
        <h3 style={{ textAlign: "center", marginBottom: 32 }}>Create batch bookings</h3>
        <FormCreateBooking onSubmit={onFinish} slots={slots} />
      </>
  );
};