import React, { useEffect, useState } from "react";
import client from "../api/client";
import { Select } from "antd";

export default ({ setUser }) => {

  const [options, setOptions] = useState([]);

  useEffect(() => {
    client.getUsers()
      .then(res => setOptions(res.data))
      .catch(err => console.log(err))
  }, []);

  const { Option } = Select;

  function onChange(value) {
    setUser(value);
  }
  
  return(
    <Select
      showSearch
      style={{ width: 200 }}
      placeholder="Select a user"
      optionFilterProp="children"
      onChange={onChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options.map(user =>
        <Option
          key={user.email}
          value={user._id}
        >
          {user.email}
        </Option>)}
    </Select>
  )
}


