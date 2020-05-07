import React, { useState, useEffect } from "react";
import moment from "moment";
import client from "../api/client";
import authenticate from "../classes/Authenticate";
import { Spin, Alert, Table } from "antd";

export default () => {

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [points, setPoints] = useState(0);
  const [nextBookings, setNextBookings] = useState([]);

  const format = "MMMM Do YYYY, h:mm"

  const columns = [
    {
      title: "Booking date",
      dataIndex: "unix",
      key: "unix",
      ellipsis: true,
      width: "50%",
      render: value => moment.unix(value).format(format),
    },
    {
      title: "Booked at",
      dataIndex: "bookedAt",
      key: "bookedAt",
      ellipsis: true,
      width: "50%",
      render: value => moment.unix(value).format(format),
    },
  ];

  const tableProps = {
    dataSource: bookings,
    loading: loading,
    size: "small",
    rowKey: "unix"
  }

  const getNextBookings = bookings =>
    bookings.filter(booking => !moment.unix(booking.unix).isBefore(moment()))

  const handleBookings = bookings => {
    setNextBookings(getNextBookings(bookings));
    setBookings(bookings);
  }

  useEffect(() => {

    Promise.all([
      client.getUserBookings(authenticate.getId()),
      client.getPoints(authenticate.getId())  
    ]).then(values => {
      handleBookings(values[0].data);
      setPoints(values[1].data.points);
    }).finally(() => setLoading(false))

  // eslint-disable-next-line
  }, []);

  const NextBookings = () => {
    if (nextBookings.length > 0) {
      return nextBookings.map(booking =>
        <Alert
          key={booking.unix}
          message={moment.unix(booking?.unix).format("LLLL")}
          type="success"
          style={{ marginBottom: 8 }}
        />)
    } else {
      return <p><i>No future bookings.</i></p>
    }      
  }

  return (
    loading
      ? <Spin />
      :
        <>
          <h3>Available points:</h3>
          {points}
          <h3 style={{ marginTop: 32 }}>Future bookings:</h3>
          <NextBookings />
          <h3 style={{ marginTop: 32 }}>All bookings</h3>
          <Table {...tableProps} columns={columns} />
        </>
  )
}