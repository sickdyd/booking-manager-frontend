import React, { useState } from "react";
import { Form, Input, Button, DatePicker } from "antd";
import DropDownUsersList from "../components/DropDownUsersList";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import authenticate from "../classes/Authenticate";
import WeekPick from "../components/WeekPick";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default () => {

  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const onFinish = async({ email, password }) => {
    setLoading(true);
    authenticate.login(email, password)
      .then(() => history.push("/home"))
      .catch(() => setLoading(false))
  };

  return (
    <Wrapper>
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >

        <Form.Item label="User" >
          <DropDownUsersList setUser={setUser} />
        </Form.Item>

        <Form.Item label="Day" >
          <Input />
        </Form.Item>

        <Form.Item label="Slot" >
          <Input />
        </Form.Item>

        <Form.Item label="From" >
          <DatePicker />
        </Form.Item>

        <Form.Item label="To" >
          <DatePicker />
        </Form.Item>

        <WeekPick />

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" loading={loading}>
            Create
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`