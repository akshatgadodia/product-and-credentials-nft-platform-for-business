import React from "react";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag  } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";

const CustomTable = props => {
  const { sendRequest, isLoading } = useHttpClient();
  const [tableData, setTableData] = useState(props.data);
  const [totalTransactions, setTotalTransactions] = useState(props.totalTransactions)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);
  
  useEffect(() => {
    setTableData(props.data);
    setTotalTransactions(props.totalTransactions);
  }, [props]);

  useEffect(() => {
    const getData = async() => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({[key]: filters[key]}))
      }
      const transactionsData = await sendRequest(`/nft-transaction/get-all-transactions?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(transactionsData.transactions)
      setTotalTransactions(transactionsData.totalTransactions)
    }
    getData()
  },[currentPage, pageSize, filters])

  const handleSearch = async(selectedKeys, confirm, dataIndex, clearFilters) => {
    confirm({closeDropdown : true});
    setFilters(prevState => ({
      ...prevState,
      [dataIndex]: selectedKeys[0]
  }));
  };
  const handleReset = (clearFilters, selectedKeys, confirm, dataIndex) => {
    clearFilters();
    const { [dataIndex]: tmp, ...rest } = filters;
    setFilters(rest);
  };
  const onPageChangeHandler = async (current, size) => {
    setCurrentPage(current);
    setPageSize(size)
  }
  
  const repeatTransactionHandler = async(txId) => {
   await sendRequest('/nft-transaction/repeat-transaction',"POST",JSON.stringify({txId}))
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
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex, clearFilters)}
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
            onClick={() => clearFilters && handleReset(clearFilters, selectedKeys, confirm, dataIndex)}
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
        <Link href={`/transactions/nft/${txId}`}>
          {`${txId.slice(0, 4)}...${txId.slice(-6)}`}
        </Link>
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (_, { createdBy }) =>
        <Link href={`/user/${createdBy._id}`}>
          {createdBy.name}
        </Link>
    },
    {
      title: "Buyer Metamask Address",
      dataIndex: "buyerMetamaskAddress",
      key: "buyerMetamaskAddress",
      ...getColumnSearchProps('buyerMetamaskAddress'),
      render: (_, { buyerMetamaskAddress }) =>
      <div>
        {`${buyerMetamaskAddress.slice(0, 5)}...${buyerMetamaskAddress.slice(-8)}`}
      </div>
    },
    {
      title: "Token ID",
      dataIndex: "tokenId",
      key: "tokenId",
      sorter: (a, b) => a.tokenId > b.tokenId,
      sortDirections: ["descend", "ascend"],
      ...getColumnSearchProps('tokenId'),
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
      title: "Expiry Date",
      dataIndex: "warrantyExpireDate",
      key: "warrantyExpireDate",
      sorter: (a, b) =>
        new Date(a.warrantyExpireDate) > new Date(b.warrantyExpireDate),
      sortDirections: ["descend", "ascend"]
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
      title: "Method Type",
      dataIndex: "methodType",
      key: "methodType",
      ...getColumnSearchProps('methodType'),
      render: (_, { methodType }) =>
        <div>
          {methodType === 0
            ? "Safe Mint"
            : methodType === 1 ? "Transfer" : "Burn"}
        </div>
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
    },
    {
      title: "Retry",
      dataIndex: "retry",
      key: "retry",
      render: (_, record) => <Button type="text" onClick={()=>repeatTransactionHandler(record.txId)}><RedoOutlined /></Button>
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
    />
  );
};

export default CustomTable;
