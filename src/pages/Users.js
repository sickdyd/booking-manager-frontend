import React, { useEffect, useState } from "react";
import client from "../api/client";
import TableUsers from "../components/TableUsers";

export default () => {

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  const convert = data => {

    const result = data.map(user => ({
      key: user._id,
      id: user._id,
      name: user.name,
      surname: user.surname,
      email: user.email,
      points: user.points,
      admin: user.admin,
      disabled: user.disabled,
    }));

    setUsers(result);
  }

  const fetchUsers = () =>
    client.getUsers()
      .then(res => convert(res?.data || []))
      .finally(() => setLoading(false))
  // eslint-disable-next-line
  useEffect(() => { fetchUsers() }, []);

  return <TableUsers data={users} loading={loading} fetchUsers={fetchUsers} />

}