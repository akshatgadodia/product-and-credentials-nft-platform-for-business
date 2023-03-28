import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table, notification } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import { DeleteOutlined } from "@ant-design/icons"

const APIKeyTable = props => {
  const { sendRequest, isLoading, error } = useHttpClient();
  const [tableData, setTableData] = useState([]);
  const [totalApiKeys, setTotalApiKeys] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({});
  const [refresh, setRefresh] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    const getData = async () => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({ [key]: filters[key] }))
      }
      const apiKeysData = await sendRequest(`/api-key/get-api-keys?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      console.log(apiKeysData);
      setTableData(apiKeysData.apiKeys)
      setTotalApiKeys(apiKeysData.totalApiKeys)
    }
    getData()
  }, []);

  useEffect(() => {
    const getData = async () => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({ [key]: filters[key] }))
      }
      const apiKeysData = await sendRequest(`/api-key/get-api-keys?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(apiKeysData.apiKeys)
      setTotalApiKeys(apiKeysData.totalApiKeys)
    }
    getData()
  }, [currentPage, pageSize, filters, props.modalOpen, refresh])

  const deleteApiKey = async apiKey => {
    try {
      await sendRequest(
        `/api-key/delete-api-key/${apiKey}`,
        "DELETE"
      );
      if (!error) {
        notification.success({
          message: "Success",
          description: "API Key Deleted Successfully",
          placement: "top",
          // duration: null,
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
      title: "API Key Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name')
    },
    {
      title: "API Key",
      dataIndex: "apiKey",
      key: "apiKey",
      ...getColumnSearchProps('apiKey')
    },
    {
      title: "Delete",
      dataIndex: "apiKey",
      key: "apiKey",
      render: (_, { apiKey }) =>
        <Button
          type="text"
          onClick={() => deleteApiKey(apiKey)}
        >
          <DeleteOutlined />
        </Button>
    }
  ];

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={tableData}
      pagination={{ size: 'default', total: totalApiKeys, pageSize: pageSize, showSizeChanger: true, responsive: true, onChange: onPageChangeHandler }}
      bordered
      scroll={{
        x: "max-content"
      }}
      loading={isLoading}
      rowKey="_id"
    />
  );
};

export default APIKeyTable;
