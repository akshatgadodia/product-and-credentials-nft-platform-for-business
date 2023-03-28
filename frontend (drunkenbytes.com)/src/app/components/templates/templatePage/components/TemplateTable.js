import React from "react";
import { SearchOutlined, EditOutlined, DeleteOutlined  } from "@ant-design/icons";
import { Button, Input, Space, Table, notification  } from "antd";
import { useRef, useState, useEffect } from "react";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";
import {useRouter} from 'next/router'
import DisplayTraitsModal from "./DisplayTraitsModal";
import CustomButton from "@/app/components/elements/CustomButton";

const TemplateTable = props => {
  const router = useRouter();
  const { sendRequest, isLoading, error } = useHttpClient();
  const [tableData, setTableData] = useState(props.data);
  const [totalTemplates, setTotalTemplates] = useState(props.totalTemplates)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filters, setFilters] = useState({});
  const searchInput = useRef(null);
  const [refresh, setRefresh] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalData, setModalData] = useState([]);

  useEffect(() => {
    const getData = async() => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({[key]: filters[key]}))
      }
      const templatesData = await sendRequest(`/product?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(templatesData.templates);
      setTotalTemplates(templatesData.totalTemplates)
    }
    getData()
  }, []);

  useEffect(() => {
    const getData = async() => {
      let queryParams = []
      for (const key in filters) {
        queryParams.push(JSON.stringify({[key]: filters[key]}))
      }
      const templatesData = await sendRequest(`/product?q=${queryParams}&page=${currentPage}&size=${pageSize}`);
      setTableData(templatesData.templates)
      setTotalTemplates(templatesData.totalTemplates)
    }
    getData()
  },[currentPage, pageSize, filters, refresh])

  const deleteTemplate = async id => {
    try {
      await sendRequest(
        `/product/${id}`,
        "DELETE"
      );
      if (!error) {
        notification.success({
          message: "Success",
          description: "Template Deleted Successfully",
          placement: "top",
          // duration: null,
          className: "error-notification"
        });
        setRefresh(!refresh);
      }
    } catch (err) { console.log(err) }
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
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps('name'),
    },
    {
      title: "NFT Type",
      dataIndex: "nftType",
      key: "nftType",
      ...getColumnSearchProps('nftType'),
    },
    {
      title: "Traits",
      dataIndex: "traits",
      key: "traits",
      render: (text, record) => 
        <CustomButton type="Gradient" text="View Traits" onClickHandler={()=>{
          setModalData(record.traits);
          setIsModalVisible(true);
        }} />
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "_id",
      render: (_, { _id }) =>
        <Button
          type="text"
          onClick={() => {
            router.push(`/template/edit/${_id.toString()}`)
          }}
        >
          <EditOutlined />
        </Button>
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "_id",
      render: (_, { _id }) =>
        <Button
          type="text"
          onClick={() => deleteTemplate(_id)}
        >
          <DeleteOutlined />
        </Button>
    }
  ];



  return (
    <>
    <Table
      size="small"
      columns={columns}
      dataSource={tableData}
      pagination={{ size: 'default', total: totalTemplates, pageSize: pageSize, showSizeChanger: true, responsive: true, onChange:onPageChangeHandler}}
      bordered
      scroll={{
        x: "max-content"
      }}
      loading={isLoading}
      rowKey="_id"
    />
    <DisplayTraitsModal isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} modalData={modalData} setModalData={setModalData}/>
    </>
  );
};

export default TemplateTable;
