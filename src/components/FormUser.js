import React, { useState } from "react";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";

export default ({ id, name, surname, email, points, admin, disabled, loading, onComplete }) => {

  const [checkAdmin, setCheckAdmin] = useState(admin);
  const [checkDisabled, setCheckDisabled] = useState(disabled);

  const verifyPoints = points;

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
  };

  const onFinish = user => {
    onComplete({
      ...user,
      admin: checkAdmin,
      disabled: checkDisabled,
      verifyPoints
    }, id);
  }

  return (
    <Form
      {...layout}
      name="user"
      initialValues={{ remember: false, name, surname, email, points }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please input the name." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Surname"
        name="surname"
        rules={[{ required: true, message: "Please input the surname." }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please type a valid email.", type: "email" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Points"
        name="points"
        rules={[{ required: true }]}
      >
        <InputNumber min={0} />
      </Form.Item>

      <Form.Item
        label="Admin"
      >
        <Checkbox
          onChange={() => setCheckAdmin(!checkAdmin)}
          defaultChecked={checkAdmin}
        />
      </Form.Item>

      <Form.Item
        label="Disabled"
      >
        <Checkbox
          onChange={() => setCheckDisabled(!checkDisabled)}
          defaultChecked={checkDisabled}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button
          type="primary"
          loading={loading}
          htmlType="submit"
        >
          Save
        </Button>
      </Form.Item>

    </Form>
  );
};