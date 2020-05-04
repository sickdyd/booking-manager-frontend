import React from "react";
import { Form, Input, Button } from "antd";

export default ({ id, onComplete, loading }) => {

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
  };

  const onFinish = ({ password }) => onComplete(password, id);

  return (
    <Form
      {...layout}
      name="password"
      onFinish={onFinish}
    >
      <Form.Item
        label="New"
        name="password"
        rules={[{ required: true, message: "Please input the password." }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
      name="confirm"
      label="Confirm"
      dependencies={["password"]}
      hasFeedback
      rules={[
        {
          required: true,
          message: "Please confirm the password!",
        },
        ({ getFieldValue }) => ({
          validator(rule, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject("The two passwords that you entered do not match!");
          },
        }),
      ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button size="small" type="primary" htmlType="submit" loading={loading}>
          Change password
        </Button>
      </Form.Item>
    </Form>
  );
};