import React from "react";
import authenticate from "../classes/Authenticate";
import ScheduleSlot from "./ScheduleSlot";
import { Table, Badge } from "antd";

export default ({ schedule, fetchSchedule }) => {

  const slots = slots => {
    if (slots.length > 0) {
      return (
        <div className="defaultBox" style={{ display: "flex", justifyContent: "center" }}>
          <div>
            {slots.map((slot, i) =><div key={i}><ScheduleSlot { ...slot } fetchSchedule={fetchSchedule} /></div>)}
          </div>
        </div>
      )
    } else {
      return <i>No slots available.</i>
    }
  }

  const getBookedSlots = slots =>
    authenticate.isAdmin()
    ? slots.filter(slot => slot?.user !== null).length
    : slots.filter(slot => slot?.user?._id === authenticate.getId()).length
    
  const getFreeSlots = slots => slots.filter(slot => (slot.status === "available") !== (slot.status === "availableUncancellable")).length;

  const columns = [
    {
      title: "Schedule",
      dataIndex: "day",
      key: "day",
    },
    {
      dataIndex: "slots",
      key: Math.random(),
      width: "5%",
      render: slots => <Badge title="Reservations" count={getBookedSlots(slots)} style={{ backgroundColor: "#108ee9" }} />
    },
    {
      dataIndex: "slots",
      key: Math.random(),
      width: "5%",
      render: slots => <Badge title="Free slots" count={getFreeSlots(slots)} style={{ backgroundColor: "#52c41a" }} />
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