import React, { useState } from "react";
import moment from "moment";
import { Form, Button, DatePicker, Select, Tooltip } from "antd";
import DropDownUsersList from "../components/DropDownUsersList";
import styled from "styled-components";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default ({ slots, loading, onSubmit }) => {

  const [userId, setUserId] = useState();
  const [day, setDay] = useState(0);
  const [slot, setSlot] = useState(slots[0][0]?.unix || 0);
  const [from, setFrom] = useState(moment());
  const [to, setTo] = useState(moment().add(1, "months"));

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const onFinish = async () => {
    onSubmit(userId, day, slot, from.unix(), to.unix());
  };

  return (
    <Wrapper>
      <Form
        {...layout}
        name="basic"
        onFinish={onFinish}
      >

        <Form.Item label="User" name="user" >    
          <DropDownUsersList setUser={setUserId} />
        </Form.Item>

        <Form.Item label="Day" >
          <Select defaultValue={0} onChange={dayIndex => setDay(dayIndex)}>
            {week.map((day, i) => <Option key={Math.random()} value={i}>{day}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label="Slot" >
          <Select key={slots[day][0].unix} defaultValue={slots[day][0].value} onChange={slot => setSlot(slot)}>
            {slots[day].map(({ unix, value }) => <Option key={unix} value={unix} >{value}</Option>)}
          </Select>
        </Form.Item>

        <Form.Item label="From" >
          <DatePicker value={from} onChange={date => setFrom(date)} allowClear={false} />
        </Form.Item>

        <Form.Item label="To" >
          <DatePicker value={to} onChange={date => setTo(date)} allowClear={false} />
        </Form.Item>

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