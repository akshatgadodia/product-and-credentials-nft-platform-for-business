import React from "react";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, Tag  } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";

const NftTable = props => {
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
      const transactionsData = await sendRequest(`/nft-transaction/get-transactions?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(transactionsData.transactions);
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
      const transactionsData = await sendRequest(`/nft-transaction/get-transactions?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
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
            onClick={() => {
              clearFilters && handleReset(close, dataIndex, setSelectedKeys);
            }}
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
      title: "Receiver Wallet Address",
      dataIndex: "receiverWalletAddress",
      key: "receiverWalletAddress",
      ...getColumnSearchProps('receiverWalletAddress'),
      render: (_, { receiverWalletAddress }) =>
      <div>
        {`${receiverWalletAddress.slice(0, 5)}...${receiverWalletAddress.slice(-8)}`}
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
      title: "Nft Type",
      dataIndex: "nftType",
      key: "nftType",
      ...getColumnSearchProps('nftType'),
    },
    {
      title: "NFT Name",
      dataIndex: "nftName",
      key: "nftName",
      ...getColumnSearchProps('nftName'),
    },
    {
      title: "Custom Image Used",
      dataIndex: "useCustomImage",
      key: "useCustomImage",
      ...getColumnSearchProps('useCustomImage'),
      render: (_, { useCustomImage }) =>
      <div>
        {useCustomImage.toString()}
      </div>
    },
    {
      title: "Soulbound",
      dataIndex: "isTransferable",
      key: "isTransferable",
      ...getColumnSearchProps('isTransferable'),
      render: (_, { isTransferable }) =>
      <div>
        {isTransferable.toString()}
      </div>
    },
    {
      title: "Permanent",
      dataIndex: "isBurnable",
      key: "isBurnable",
      ...getColumnSearchProps('isBurnable'),
      render: (_, { isBurnable }) =>
      <div>
        {isBurnable.toString()}
      </div>
    },
    {
      title: "Burn After",
      dataIndex: "burnAfter",
      key: "burnAfter",
      render: (_, { burnAfter }) =>
      burnAfter===null ? <div> Permanent </div> :
        <div>
          {new Date(burnAfter).getDate() +
            "/" +
            (new Date(burnAfter).getMonth() + 1) +
            "/" +
            new Date(burnAfter).getFullYear() +
            " " +
            new Date(burnAfter).getHours() +
            ":" +
            new Date(burnAfter).getMinutes() +
            ":" +
            new Date(burnAfter).getSeconds()}
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
          {`${value} ETH`}
        </div>
    },
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
      rowKey="_id"
    />
  );
};

export default NftTable;
