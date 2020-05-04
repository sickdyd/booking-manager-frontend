import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";

export default ({ id, name, surname, email, admin, disabled, loading, onComplete }) => {

  const [checkAdmin, setCheckAdmin] = useState(admin);
  const [checkDisabled, setCheckDisabled] = useState(disabled);

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 10, span: 12 },
  };

  const onFinish = user => {
    console.log(user);
    onComplete(user, id);
  }

  return (
    <Form
      {...layout}
      name="user"
      initialValues={{ remember: false, name, surname, email }}
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
          size="small"
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