import React from "react";
import client from "../api/client";
import authenticate from "../classes/Authenticate";
import { Table, Popconfirm } from "antd";
import { KeyOutlined, LockOutlined, CheckOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Media from "react-media"
import FormEditUser from "../components/FormEditUser";

export default ({ data, loading, fetchUsers }) => {

  const deleteUserPopConfirm = {
    disabled: false,
    placement: "left",
    title: <p>Delete user?<br /><br />Delete user and all boookings.</p>,
    okText: "OK",
    cancelText: "Cancel"
  }

  const DeleteButton = ({ userId }) =>
    <Popconfirm { ...deleteUserPopConfirm } onConfirm={() => client.deleteUser(userId)} >
      <CloseCircleOutlined />
    </Popconfirm>

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
      width: "20%",
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
    {
      title: "",
      key: "id",
      dataIndex: "id",
      render: value => authenticate.getId() === value ? null : <DeleteButton userId={value} />,
      width: "5%"
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