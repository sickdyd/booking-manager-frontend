import React from "react";
import authenticate from "../classes/Authenticate";
import ScheduleSlot from "./ScheduleSlot";
import { Table, Badge } from "antd";
import { CalendarOutlined, LikeOutlined } from "@ant-design/icons";

export default ({ schedule, fetchSchedule }) => {

  const slots = slots => {
    if (slots.length > 0) {
      return slots.map(slot =><div><ScheduleSlot { ...slot } fetchSchedule={fetchSchedule} /></div>)
    } else {
      return <i>No slots available.</i>
    }
  }

  const getBookedSlots = slots => slots.filter(slot => slot?.user?._id === authenticate.getId()).length;
  const getFreeSlots = slots => slots.filter(slot => slot.status === "available").length;

  const columns = [
    {
      title: "Schedule",
      dataIndex: "day",
      key: "day",
    },
    {
      title: <CalendarOutlined />,
      dataIndex: "slots",
      key: Math.random(),
      render: slots => <Badge count={getBookedSlots(slots)} />,
    },
    {
      title: <LikeOutlined />,
      dataIndex: "slots",
      key: Math.random(),
      render: slots => <Badge count={getFreeSlots(slots)} style={{ backgroundColor: '#52c41a' }} />,
    },
  ];
  
  const expandable = {
    expandedRowRender: record => slots(record.slots)
  };
  
  const tableProps = {
    expandable,
    columns,
    dataSource: schedule,
    size: "small"
  }

  return (
    <Table { ...tableProps } />
  )
}