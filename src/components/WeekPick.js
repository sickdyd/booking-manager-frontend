import React, { useState } from "react";
import { Checkbox, Form } from "antd";

export default (onChange) => {

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const [weekCheckboxes, setWeekCheckboxes] = useState(Object.fromEntries(
    week.map(day => [day, false])
  ));

  const handleChange = day => {
    const newState = { ...weekCheckboxes, [day]: !weekCheckboxes[day] }
    setWeekCheckboxes(newState);
    console.log(newState);
    // onChange(newState);
  }

  return (
    <Form.Item label="Days">
      {week.map(day =>
        <Form.Item>
          <Checkbox onChange={(e) => handleChange(day)}>{day}</Checkbox>
        </Form.Item>
      )}
    </Form.Item>
  )
}