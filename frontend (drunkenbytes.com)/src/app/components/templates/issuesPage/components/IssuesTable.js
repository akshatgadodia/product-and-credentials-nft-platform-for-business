import React from "react";
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";

const IssuesTable = props => {
  const { sendRequest, isLoading, error } = useHttpClient();
  const [tableData, setTableData] = useState([]);
  const [totalIssues, setTotalIssues] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const getData = async () => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({ [key]: filters[key] }))
      }
      const issuesData = await sendRequest(`/issue/get-issues?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(issuesData.issues);
      setTotalIssues(issuesData.totalIssues)
    }
    getData()
  }, []);

  useEffect(() => {
    const getData = async () => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({ [key]: filters[key] }))
      }
      const issuesData = await sendRequest(`/issue/get-issues?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(issuesData.issues)
      setTotalIssues(issuesData.totalIssues)
    }
    getData()
  }, [currentPage, pageSize, filters, refresh])

  const solveIssue = async id => {
    try {
      await sendRequest(
        `/issue/solve-issue/${id}`,
        "PATCH"
      );
      if (!error) {
        notification.success({
          message: "Success",
          description: "Issue Solved Successfully",
          placement: "top",
          className: "error-notification"
        });
        setRefresh(!refresh);
      }
    } catch (err) { }
  };

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
        <Link href={`/issues/nft/${txId}`}>
          {`${txId.slice(0, 4)}...${txId.slice(-6)}`}
        </Link>
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ...getColumnSearchProps('email'),
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Date Created",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => new Date(a.date) > new Date(b.date),
      sortDirections: ["descend", "ascend"],
      render: (_, { date }) =>
        <div>
          {new Date(date).getDate() +
            "/" +
            (new Date(date).getMonth() + 1) +
            "/" +
            new Date(date).getFullYear() +
            " " +
            new Date(date).getHours() +
            ":" +
            new Date(date).getMinutes() +
            ":" +
            new Date(date).getSeconds()}
        </div>
    },
    {
      title: "Solve Issue",
      dataIndex: "_id",
      key: "_id",
      render: (_, { _id, isSolved }) =>
        isSolved ? <div>Already Solved</div> :
          <Button
            type="text"
            onClick={() => {
              solveIssue(_id)
            }}
          >
            <CheckOutlined />
          </Button>
    },
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={tableData}
      pagination={{ size: 'default', total: totalIssues, pageSize: pageSize, showSizeChanger: true, responsive: true, onChange: onPageChangeHandler }}
      bordered
      scroll={{
        x: "max-content"
      }}
      rowKey="_id"
      loading={isLoading}
    />
  );
};

export default IssuesTable;
