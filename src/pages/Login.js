import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import authenticate from "../classes/Authenticate";

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

  const onFinish = async({ email, password }) => {
    setLoading(true);
    authenticate.login(email, password)
      .then(() => history.push("/schedule"))
      .catch(() => setLoading(false))
  };

  return (
    <Wrapper>
      <div className="container defaultBox">
        <h2>ようこそ!</h2>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true, email: "test@gmail.com", password: "testing123" }}
          onFinish={onFinish}
        >
          <Form.Item
            label="マイル"
            name="email"
            rules={[{ required: true, message: "Please input your email." }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="パスワード"
            name="password"
            rules={[{ required: true, message: "Please input your password." }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" loading={loading}>
              ログイン
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2em;
    box-shadow: 10px 10px 62px -25px rgba(0,0,0,0.75);

    h2 {
      margin: 16px 0 32px 0;
    }
  }
`