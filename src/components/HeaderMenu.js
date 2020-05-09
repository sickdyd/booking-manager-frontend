import React, { useState, useEffect } from "react";
import authenticate from "../classes/Authenticate";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  KeyOutlined,
  UserAddOutlined,
  SlidersOutlined,
  BookOutlined } from "@ant-design/icons";

export default () => {

  const history = useHistory();

  // eslint-disable-next-line
  useEffect(() => {
    setCurrent(window.location.pathname.replace("/", ""));
  })

  const [current, setCurrent] = useState("home");

  const handleClick = e => {
    setCurrent(e.key);
    history.push("/" + e.key);
  }

  const adminMenu = [
    <Menu.Item key="users">
      <UserOutlined />
      <span className="label">Users</span>
    </Menu.Item>,
    <Menu.Item key="create-user">
      <UserAddOutlined />
      <span className="label">Create user</span>
    </Menu.Item>,
    <Menu.Item key="create-bookings">
      <BookOutlined />
      <span className="label">Create bookings</span>
    </Menu.Item>,
    <Menu.Item key="settings">
      <SlidersOutlined />
      <span className="label">Settings</span>
    </Menu.Item>
  ]

  return (
    <Wrapper>
      <Menu mode="horizontal" selectedKeys={current} onClick={handleClick}>
        <Menu.Item key="schedule">
          <CalendarOutlined />
          <span className="label">Schedule</span>
        </Menu.Item>
        <Menu.Item key="change-password">
          <KeyOutlined />
          <span className="label">Change password</span>
        </Menu.Item>
        {authenticate.isAdmin() && adminMenu.map(item => item)}
      </Menu>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  @media (max-width: 575.28px) {

  }
`