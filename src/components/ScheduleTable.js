import React from "react";
import authenticate from "../classes/Authenticate";
import ScheduleSlot from "./ScheduleSlot";
import { Table, Badge } from "antd";
import { CalendarOutlined, LikeOutlined } from "@ant-design/icons";

export default ({ schedule, totalItems, fetchSchedule }) => {

  const slots = slots => {
    if (slots.length > 0) {
      return (
        <div className="defaultBox" style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {slots.map(slot =><div><ScheduleSlot { ...slot } fetchSchedule={fetchSchedule} /></div>)}
          </div>
        </div>
      )
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
      width: "5%",
      render: slots => <Badge count={getBookedSlots(slots)} />,
    },
    {
      title: <LikeOutlined />,
      dataIndex: "slots",
      key: Math.random(),
      width: "5%",
      render: slots => <Badge count={getFreeSlots(slots)} style={{ backgroundColor: '#52c41a' }} />,
    },
  ];
  
  const expandable = {
    expandedRowRender: record => slots(record.slots)
  };

  const handleOnChange = pag =>{
    console.log(pag);
    fetchSchedule(pag.current, pag.pageSize);
  }
  
  const tableProps = {
    expandable,
    columns,
    dataSource: schedule,
    size: "small",
    style: { width: "100%" },
    onChange: handleOnChange
  }

  return <Table { ...tableProps } />
}