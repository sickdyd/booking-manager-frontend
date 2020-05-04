import React, { useState, cloneElement } from "react";
import { Modal, Button } from "antd";
import DropDownUsersList from "./DropDownUsersList";

export default ({ children, slotId, onOk, fetchSchedule }) => {
  
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const toggle = () => setShow(!show);

  const childrenWithProps = React.Children.map(children, child =>
    cloneElement(child, { onClick: toggle })
  );

  const handleOk = () => {
    setLoading(true);
    onOk(slotId, user)
      .then(() => fetchSchedule())
      .finally(() => {
        setShow(false);
        toggle();
      })
  }

  return (
    <>
      {childrenWithProps}
      <Modal
        title="Assign slot to user"
        visible={show}
        onOk={handleOk}
        onCancel={toggle}
        footer={[
          <Button key="back" onClick={toggle}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk} disabled={user === undefined}>
            Ok
          </Button>,
        ]}
      >
        <p>Select the user</p>
        <DropDownUsersList setUser={setUser} />
      </Modal>
    </>
  );
}
