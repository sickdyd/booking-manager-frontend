import React, { useState } from "react";
import authenticate from "../classes/Authenticate";
import client from "../api/client";
import Button from "./Button";
import { Tooltip, Popconfirm, Tag } from "antd";
import Badge from "./Badge";
import ScheduleAdminControls from "./ScheduleAdminControls";

export default (props) => {

  const { unix, start, status, user, fetchSchedule } = props;
  const [loading, setLoading] = useState(false);

  const noop = () => {};

  const execute = (action) => {
    setLoading(true);
    action(unix).finally(() => {
      fetchSchedule()
        .finally(() => setLoading(false));
    });
  }

  const availableButUncancellable = {
    onConfirm: () => execute(client.book),
    disabled: false,
    placement: "top",
    title: <p>予約をしたいですか？<br /><br /> 予約をしましたらキャンセルができません。</p>,
    okText: "はい",
    cancelText: "キャンセル"
  }

  const getConfig = status => {

    if (!authenticate.isAdmin()) {

      switch (status) {
        case "available":
          return {
            tooltip: "予約をします",
            button: "default",
            onClick: () => execute(client.book),
            popconfirm: { disabled: true },
            icon: "success",
            text: "フリー",
          }
        case "availableUncancellable": 
          return {
            tooltip: "予約をします",
            button: "default",
            onClick: noop,
            popconfirm: availableButUncancellable,
            icon: "warning",
            text: "フリー", 
          }
        case "booked":
          return {
            tooltip: "キャンせル",
            button: "primary",
            onClick: () => execute(client.deleteBooking),
            popconfirm: { disabled: true },
            icon: "processing",
            text: "予約",
          }
        case "bookedUncancellable":
          return {
            tooltip: "キャンせルできません",
            button: "danger",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "processing",
            text: "予約",
          }
        case "unavailable":
          return {
            tooltip: "利用できません",
            button: "dashed",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "default",
            text: "無効",
          }
        default: // "closed"
          return {
            tooltip: "利用できません",
            button: "dashed",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "default",
            text: "無効",
          }
      }

    } else {

      switch (status) {
        case "available":
        case "availableUncancellable":
          return {
            tagColor: "green",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "success",
            text: "Available",
          }
        case "booked":
        case "bookedUncancellable":
          return {
            tagColor: "red",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "processing",
            text: `${user?.name} ${user?.surname}`,
          }
        case "unavailable":
          return {
            tagColor: "default",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "default",
            text: "unavailable",
          }
        default: // "closed"
          return {
            tagColor: "geekblue",
            onClick: noop,
            popconfirm: { disabled: true },
            icon: "default",
            text: "Closed",
          }
      }
    }
  }

  const slotConfig = getConfig(status);

  const TimeSlot = () =>
    authenticate.isAdmin()
      ?
        <>
          <Tag color={slotConfig.tagColor} style={{ margin: "8px" }}>{start}</Tag>
          <ScheduleAdminControls {...props} />
        </>
      :
      <Popconfirm {...slotConfig.popconfirm}>
        <Tooltip placement="left" title={slotConfig.tooltip}>
          <Button type={slotConfig.button} onClick={slotConfig.onClick} loading={loading}>
            {start}
          </Button>
        </Tooltip>
      </Popconfirm>

  return (
    <>
      <TimeSlot />
      <Badge icon={slotConfig.icon} text={slotConfig.text}/>
    </>
  )
}