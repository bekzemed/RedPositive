import {
  Button,
  Drawer,
  Layout,
  Menu,
  PageHeader,
  Space,
  Statistic,
  Table,
  Tag,
} from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import image from "./assets/redpositive.jpeg";

import { PlusCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import UserForm from "./userForm";
import UserUpdateForm from "./userUpdateForm";
import { State } from "./redux/root-reducer";
import { getUserRequest, removeUserRequest } from "./redux/store/actions";

interface DataType {
  _id: string;
  name: string;
  email: string;
  phone: number;
  hobbies: string[];
}

/*
*
Menu items for the main sidemenu
*
*/
const MAIN_MENU_ITEMS = [
  {
    key: "users",
    icon: <UserOutlined />,
    label: "Users",
  },
];

const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [user, setUser] = useState("");
  const users = useSelector((state: State) => state.users);

  useEffect(() => {
    dispatch(getUserRequest());
  }, [dispatch]);

  const deleteUser = (id: string) => {
    dispatch(removeUserRequest(id));
  };

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (_, { hobbies }) => (
        <>
          {hobbies.map((hobby, index) => {
            return (
              <Tag color={"geekblue"} key={index}>
                {hobby.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (user) => (
        <Space size="middle">
          <a
            onClick={() => {
              setVisible(true);
              setUser(user);
            }}
          >
            Update
          </a>
          <a onClick={() => deleteUser(user._id)}>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider className="sider">
        <Header style={{ paddingLeft: "24px" }}>
          <img alt="REDPOSITIVE LOGO" style={{ width: "47%" }} src={image} />
        </Header>
        <Menu
          items={MAIN_MENU_ITEMS}
          mode="inline"
          theme={"dark"}
          defaultSelectedKeys={["users"]}
        />
      </Sider>
      <Layout>
        <Header className="header-shadow menu-bar"></Header>
        <PageHeader
          ghost={false}
          title="Registered Users"
          extra={[
            <Button
              key="add"
              type="primary"
              onClick={() => {
                setVisible(true);
                setUser("");
              }}
              icon={<PlusCircleOutlined />}
            >
              Register new User
            </Button>,
          ]}
        />
        <Content className="container">
          <Statistic title="Total registered" value={users?.length} />
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={users}
          />
        </Content>
        {user ? (
          <Drawer
            title="Update new user"
            placement="right"
            closable={false}
            onClose={() => setVisible(false)}
            open={visible}
          >
            <UserUpdateForm
              onSuccess={() => {
                setVisible(false);
              }}
              data={user}
            />
          </Drawer>
        ) : (
          <Drawer
            title="Register new user"
            placement="right"
            closable={false}
            onClose={() => setVisible(false)}
            open={visible}
          >
            <UserForm
              onSuccess={() => {
                setVisible(false);
              }}
            />
          </Drawer>
        )}
      </Layout>
    </Layout>
  );
};

export default App;
