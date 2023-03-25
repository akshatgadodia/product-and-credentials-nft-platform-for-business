import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag  } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";

const WalletRechargeTable = props => {
  const { sendRequest, isLoading } = useHttpClient();
  const [tableData, setTableData] = useState(props.data);
  const [totalTransactions, setTotalTransactions] = useState(props.totalTransactions)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);
  
  useEffect(() => {
    const getData = async() => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({[key]: filters[key]}))
      }
      const transactionsData = await sendRequest(`/wallet-transaction/get-transactions?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      console.log(transactionsData);
      setTableData(transactionsData.transactions)
      setTotalTransactions(transactionsData.totalTransactions)
    }
    getData()
  }, []);

  useEffect(() => {
    const getData = async() => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({[key]: filters[key]}))
      }
      const transactionsData = await sendRequest(`/wallet-transaction/get-transactions?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(transactionsData.transactions)
      setTotalTransactions(transactionsData.totalTransactions)
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
          onClick={() => {
              clearFilters && handleReset(close, dataIndex, setSelectedKeys);
            }}
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
      title: "Transaction Hash",
      dataIndex: "txId",
      key: "txId",
      ...getColumnSearchProps('txId'),
      render: (_, { txId }) =>
        <Link href={`/transactions/wallet-recharge/${txId}`}>
          {`${txId.slice(0, 4)}...${txId.slice(-6)}`}
        </Link>
    },
    {
      title: "Date Created",
      dataIndex: "dateCreated",
      key: "dateCreated",
      sorter: (a, b) => new Date(a.dateCreated) > new Date(b.dateCreated),
      sortDirections: ["descend", "ascend"],
      render: (_, { dateCreated }) =>
        <div>
          {new Date(dateCreated).getDate() +
            "/" +
            (new Date(dateCreated).getMonth() + 1) +
            "/" +
            new Date(dateCreated).getFullYear() +
            " " +
            new Date(dateCreated).getHours() +
            ":" +
            new Date(dateCreated).getMinutes() +
            ":" +
            new Date(dateCreated).getSeconds()}
        </div>
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      ...getColumnSearchProps('status'),
      render: (_, { status }) =>
        <Tag
          color={
            status === "Success"
              ? "green"
              : status === "Pending" ? "geekblue" : "volcano"
          }
          key={status}
        >
          {status.toUpperCase()}
        </Tag>
    },
    {
      title: "Value",
      dataIndex: "value",
      key: "value",
      sorter: (a, b) => a.value > b.value,
      sortDirections: ["descend", "ascend"],
      render: (_, { value }) =>
        <div>
          {`${(Number(value) * 1000000000).toFixed(2)} gwei`}
        </div>
    }
  ];



  return (
    <Table
      size="small"
      columns={columns}
      dataSource={tableData}
      pagination={{ size: 'default', total: totalTransactions, pageSize: pageSize, showSizeChanger: true, responsive: true, onChange:onPageChangeHandler}}
      bordered
      scroll={{
        x: "max-content"
      }}
      loading={isLoading}
      rowKey="id"
    />
  );
};

export default WalletRechargeTable;
