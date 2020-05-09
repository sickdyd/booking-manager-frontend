import React, { useState, useEffect } from "react";
import moment from "moment";
import client from "../api/client";
import authenticate from "../classes/Authenticate";
import Spin from "../components/Spin";
import { Alert, Table } from "antd";

export default () => {

  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [points, setPoints] = useState(0);
  const [nextBookings, setNextBookings] = useState([]);

  const format = authenticate.isAdmin()
  ? "YYYY/MM/DD - HH:mm"
  : "LLLL"

  const columns = [
    {
      title: "Slot",
      dataIndex: "unix",
      key: "unix",
      ellipsis: true,
      render: value => moment.unix(value).format(format),
    },
    {
      title: "Booked at",
      dataIndex: "bookedAt",
      key: "bookedAt",
      ellipsis: true,
      render: value => moment.unix(value).format(format),
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      ellipsis: true,
      render: value => value.email,
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
      authenticate.isAdmin()
      ? client.getBookings()
      : client.getUserBookings(authenticate.getId()),
      client.getPoints(authenticate.getId())
    ]).then(values => {
      handleBookings(values[0].data);
      setPoints(values[1].data.points);
    }).finally(() => setLoading(false))

  // eslint-disable-next-line
  }, []);

  const NextBookings = () => {
    if (nextBookings.length > 0) {
      return nextBookings.slice(0, 10).map(booking => {
        const message = authenticate.isAdmin()
          ? moment.unix(booking?.unix).format(format) + " | " + booking.user.name + " " + booking.user.surname
          : moment.unix(booking?.unix).format(format)
        return <Alert
          key={booking.unix}
          message={message}
          type="success"
          style={{ marginBottom: 8 }}
        />
      })
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
          <h3 style={{ marginTop: 32 }}>Next 10 bookings:</h3>
          <NextBookings />
          <h3 style={{ marginTop: 32 }}>All bookings</h3>
          <Table {...tableProps} columns={authenticate.isAdmin() ? columns : [columns[0]] } />
        </>
  )
}