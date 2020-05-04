import React from "react";
import { Table } from "antd";
import { KeyOutlined, LockOutlined, CheckOutlined } from "@ant-design/icons";
import Media from "react-media"
import FormEditUser from "../components/FormEditUser";

export default ({ data, loading, fetchUsers }) => {

  const expandable = {
    expandedRowRender: record => <FormEditUser {...record} fetchUsers={fetchUsers} />
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ellipsis: true,
      width: "20%",
      hideOnSmall: true
    },
    {
      title: "Surname",
      dataIndex: "surname",
      key: "surname",
      ellipsis: true,
      width: "20%"
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
      width: "30%",
    },
    {
      title: <LockOutlined />,
      key: "disabled",
      render: value => value ? <CheckOutlined /> : "",
      dataIndex: "disabled",
      width: "10%"
    },
    {
      title: <KeyOutlined />,
      key: "admin",
      render: value => value ? <CheckOutlined /> : "",
      dataIndex: "admin",
      width: "10%"
    },
  ];

  const getResponsiveColumns = smallScreen =>
    columns.filter(({ hideOnSmall = false }) => !(smallScreen && hideOnSmall));

  const tableProps = {
    expandable,
    dataSource: data,
    loading: loading,
    size: "small"
  }

  return (
    <Media query="(max-width: 599px)">
      { smallScreen => <Table {...tableProps} columns={getResponsiveColumns(smallScreen)} /> }
    </Media>
  )

}