import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag  } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";

const CustomTable = props => {
  const { sendRequest, isLoading } = useHttpClient();
  const [tableData, setTableData] = useState(props.users);
  const [totalData, setTotalData] = useState(props.totalUsers)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);
  
  useEffect(() => {
    setTableData(props.data);
    setTotalData(props.totalData);
  }, [props]);

  useEffect(() => {
    const getData = async() => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({[key]: filters[key]}))
      }
      const usersData = await sendRequest(`/user/get-all-users?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(usersData.users)
      setTotalData(usersData.totalUsers)
    }
    getData()
  },[currentPage, pageSize, filters])

  const handleSearch = async (close, selectedKeys, dataIndex) => {
    close();
    setFilters(prevState => ({
      ...prevState,
      [dataIndex]: selectedKeys[0]
    }));
  };

  const handleReset = (close, dataIndex, setSelectedKeys) => {
    setSelectedKeys([]);
    close();
    const { [dataIndex]: tmp, ...rest } = filters;
    setFilters(rest);
  };

  const onPageChangeHandler = async (current, size) => {
    setCurrentPage(current);
    setPageSize(size)
  }
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(close, selectedKeys, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(close, selectedKeys, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
              color: 'var(--white)'
            }}
          >
            Search
          </Button>
          <Button
          onClick={() =>
              clearFilters && handleReset(close, dataIndex, setSelectedKeys)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
        text
  });
  const columns = [
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
      render: (_, { _id, name }) =>
        <Link href={`/users/${_id}`}>
          {name}
        </Link>
    },
    {
      title: "Account Address",
      dataIndex: "accountAddress",
      key: "accountAddress",
      ...getColumnSearchProps('accountAddress'),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps('email'),
    },
    {
      title: "Wallet Balance",
      dataIndex: "walletBalance",
      key: "walletBalance",
      sorter: (a, b) => a.walletBalance > b.walletBalance,
      sortDirections: ["descend", "ascend"],
      render: (_, { walletBalance }) =>
        <div>
          {`${Number(walletBalance).toFixed(10)} ETH`}
        </div>
    }
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={tableData}
      pagination={{ size: 'default', total: totalData, pageSize: pageSize, showSizeChanger: true, responsive: true, onChange:onPageChangeHandler}}
      bordered
      scroll={{
        x: "max-content"
      }}
      loading={isLoading}
      rowKey="id"
    />
  );
};

export default CustomTable;
