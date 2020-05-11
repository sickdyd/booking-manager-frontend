import React, { useState } from "react";
import moment from "moment";
import { Form, Button, TimePicker, DatePicker, InputNumber, Checkbox, Select, Tooltip } from "antd";
import styled from "styled-components";

export default ({ onComplete, loading, settings }) => {

  const layout = {
    labelCol: { offset: 1, span: 10 },
    wrapperCol: { offet: 10, span: 24 },
  };
  
  const tailLayout = {
    wrapperCol: { offset: 10, span: 14 },
  };

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [dayIndex, setDayIndex] = useState(0);

  const [weekSettings, setWeekSettings] = useState(
    settings.week.map(day =>
      ({
        startHours: day.startHours,
        startMinutes: day.startMinutes,
        slotNumber: day.slotNumber,
        off: day.off
      })
    )
  );

  const handleChangeWeekSettings = (e, field, index) => {

    const newWeekSettings = new Array(...weekSettings);

    switch (field) {
      case "time":
        newWeekSettings[index].startHours = e.hours();
        newWeekSettings[index].startMinutes= e.minutes();
        break;
      case "slots":
        newWeekSettings[index].slotNumber = e;
        break;
      case "off":
        newWeekSettings[index].off = e.target.checked;
        break;
      default:
        break;
    }

    setWeekSettings(newWeekSettings);
  }

  const convertToMoment = (h, m) => moment(h + ":" + m, "HH:mm");

  const onDaySelect = index => setDayIndex(index);

  const onFinish = settings => {

    const {
      cancelationNotice,
      interval,
      expireOffset,
      slotDuration,
      dailyLimit
    } = settings;

    const validSettings = {
      cancelationNotice,
      interval,
      expireOffset,
      slotDuration,
      lastBookableDay: settings.lastBookableDay.unix(),
      dailyLimit,
      week: weekSettings
    }

    onComplete(validSettings);
  }

  const DaySettings = () => {

    const format = "HH:mm";
    const time = convertToMoment(weekSettings[dayIndex].startHours, weekSettings[dayIndex].startMinutes);
    return (
      <div>
        <Tooltip placement="right" title={"Starting time for " + week[dayIndex]}>
          <TimePicker
            defaultValue={time}
            format={format}
            allowClear={false}
            style={{ marginBottom: 8 }}
            onChange={e => handleChangeWeekSettings(e, "time", dayIndex)}
            className="expand" 
          />
        </Tooltip><br />
        <Tooltip placement="right" title={"Number of slots for " + week[dayIndex]}>
          <InputNumber
            placeholder="slots"
            defaultValue={weekSettings[dayIndex].slotNumber}
            style={{ marginBottom: 8 }}
            min={1}
            onChange={e => handleChangeWeekSettings(e, "slots", dayIndex)}
            className="expand" 
          />
        </Tooltip><br />
        <Checkbox
          defaultChecked={weekSettings[dayIndex].off}
          onChange={e => handleChangeWeekSettings(e, "off", dayIndex)}
        >
          Day off
        </Checkbox>
      </div>
    )
  }

  return (
    <Wrapper>
    <Form
      {...layout}
      name="settings"
      initialValues={{
        remember: false,
        ...settings,
        lastBookableDay: moment.unix(settings.lastBookableDay),
        day: 0,
      }}
      onFinish={onFinish}
      className="form-settings"
    >

      <Form.Item name="lastBookableDay" label="Last day">
        <DatePicker allowClear={false} className="expand" />
      </Form.Item>

      <Form.Item name="slotDuration" label="Slot duration (mins)" hidden={true}>
        <InputNumber min={5} max={1440} step={5} className="expand" disabled />
      </Form.Item>

      <Form.Item name="interval" label="Interval (m)" hidden={true}>
        <InputNumber min={0} max={1440} step={5} className="expand" disabled />
      </Form.Item>

      <Form.Item name="expireOffset" label="Expiration (m)">
        <InputNumber min={0} max={1440} step={5} className="expand" />
      </Form.Item>

      <Form.Item name="cancelationNotice" label="Cancellation (h)">
        <InputNumber min={0} max={365} step={1} className="expand" />
      </Form.Item>

      <Form.Item name="dailyLimit" label="Bookings ">
        <InputNumber min={0} step={1} className="expand" />
      </Form.Item>

      <Form.Item name="day" label="Day settings">
        <Select
          onSelect={onDaySelect}
          options={week.map((day, i) => ({ label: day, value: i }))} />
      </Form.Item>
    
      <Form.Item label="Day options">
        <DaySettings dayIndex={dayIndex} className="expand" />
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
    </Wrapper>
  );
}

const Wrapper = styled.div`

  .expand {
    width: 100%;
  }

  .form-settings {
    min-width: 120px;
  }
`