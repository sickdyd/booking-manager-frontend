import React, { useState, forwardRef } from "react";
import moment from "moment";
import client from "../api/client";
import { Button, Popconfirm } from "antd";
import { LockOutlined, UnlockOutlined, DeleteOutlined, UserOutlined, UserAddOutlined } from "@ant-design/icons";
import ModalAddUser from "./ModalAddUser";

export default ({ status, bookedAt, user, id, fetchSchedule }) => {

  const [loading, setLoading] = useState(false);

  const noop = () => {};

  const execute = (action) => {
    setLoading(true);
    action(id).finally(() => {
      fetchSchedule()
        .finally(() => setLoading(false));
    });
  }

  // const CircleButton = props =>
  //   <Button shape="circle" size="small" style={{ marginRight: "8px" }} {...props} />

  const CircleButton = forwardRef((props, ref) => // doesn't give the warning
    <div style={{ display: "inline-block" }} ref={ref}>
      <Button shape="circle" size="small" style={{ marginRight: "8px" }} {...props} />
    </div>)

  const cancelLessonPopover = {
    onConfirm: () => execute(client.deleteUserBooking),
    placement: "top",
    title:
      <>
        <p>Cancel booking?</p>
        <p>If you proceed you will cancel this booking:</p>
        <p>{moment.unix(id).locale("en").format("LLLL")}</p>
        <p>{user?.name} {user?.surname}</p>
      </>,
    okText: "Ok",
    cancelText: "Cancel"
  };

  const viewUserPopover = {
    onConfirm: noop,
    placement: "top",
    title:
      <>
        <p>Booked by</p>
        <p>
          Name: {user?.name} <br />
          Surname: {user?.surname} <br />
          Email: {user?.email} <br />
          at: {moment.unix(bookedAt).locale("en").format("LLLL")} <br />
        </p>
      </>,
    okText: "Ok",
    cancelText: "Cancel"
  };

  const Menu = () => {
    switch (status) {
      case "available":
      case "availableUncancellable":
        return (
          <>
            <CircleButton onClick={() => execute(client.close)} icon={<LockOutlined />} disabled={loading} />
            <ModalAddUser slotId={id} onOk={client.bookForUser} fetchSchedule={fetchSchedule}>
                <CircleButton icon={<UserAddOutlined />} />
            </ModalAddUser>
          </>
        )
      case "booked":
      case "bookedUncancellable":
        return (
          <>
            <Popconfirm {...cancelLessonPopover}>
              <CircleButton icon={<DeleteOutlined />} disabled={loading} />
            </Popconfirm>
            <Popconfirm {...viewUserPopover}>
              <CircleButton icon={<UserOutlined />} disabled={loading} />
            </Popconfirm>
          </>
        )
      case "unavailable":
        return null;
      case "closed":
        return (
          <CircleButton onClick={() => execute(client.open)} icon={<UnlockOutlined />} disabled={loading} />
        )
      default:
        return null;
    }
  }

  return Menu()
}