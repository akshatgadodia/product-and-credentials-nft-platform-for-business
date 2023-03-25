import React, { useState, useEffect } from "react";
import styles from "../stylesheets/secondFold.module.css";
import { Button, Form, Input, Spin, Upload, Modal, notification } from "antd";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import { PlusOutlined } from "@ant-design/icons"
import { uploadImage, deleteImage } from "@/app/utils/uploadImage"
import AppContext from "@/app/context/AppContext";
import { useContext } from "react";
import { useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

const SecondFold = props => {
  const router = useRouter();
  const { disconnect } = useDisconnect();
  const { loggedInDetails } = useContext(AppContext);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([]);
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();
  const [modalOpen, setModalOpen] = useState(false);

  const onClose = () => {
    router.push("/");
    Cookies.remove('db_register');
    disconnect();
    setModalOpen(false);
}

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadMainImage = async options => {
    const { onSuccess, onError, file, onProgress } = options;
    try {
      const res = await uploadImage(file, loggedInDetails.address, "users")
      onSuccess("Ok");
      setFileList([{
        uid: file.uid,
        name: file.name,
        status: 'done',
        url: res.file.url
      }])
    } catch (err) {
      console.log(err);
      onError({ err });
    }
  };
  const removeMainImage = async (file) => {
    deleteImage(loggedInDetails.address, "users");
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload Logo
      </div>
    </div>
  );

  const onFinish = async values => {
    try {
      const result = await sendRequest(
        "/user/user-register-request",
        "POST",
        JSON.stringify({
          accountAddress: loggedInDetails.address,
          logo: fileList[0].url,
          name: values.name,
          email: values.email,
        })
      );
      if (!error) {
        Cookies.remove('db_register');
        form.resetFields();
        disconnect();
        notification.success({
          message: "Success",
          description: "Account Registration Request has been generated successfully",
          placement: "top",
          // duration: null,
          className: "error-notification"
        });
        router.push('/')
      }
      clearError();
    } catch (err) { }
  };

  useEffect(()=>{
    form.setFieldsValue({ accountAddress: loggedInDetails.address })
  },[loggedInDetails])

  return (
    <div className={styles.createNft}
      style={{
        backgroundImage:
          "url(" +
          "/images/background/gradient-left-side.png" +
          ")"
      }}
    >
      <div className={styles.loginDiv}>
        <Spin size="large" spinning={isLoading}>
          <Form
            scrollToFirstError
            layout="vertical"
            name="basic"
            form={form}
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
            autoComplete="on"
            className={styles.form}
            disabled={!loggedInDetails.isConnected}
          >
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please enter Main Photo"
                }
              ]}
              className={styles.formUploadItem}>
              <Upload
                accept="image/*"
                listType="picture-circle"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                customRequest={uploadMainImage}
                onRemove={removeMainImage}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Form.Item>
            <Form.Item
              label="Business Wallet Address" required
              name="accountAddress"
              rules={[
                {
                  required: true,
                  message: "Please input Receiver Wallet Address!"
                },
                {
                  pattern: new RegExp(/(\b0x[a-f0-9A-F]{40}\b)/g),
                  message: "Please input valid Wallet Address!"
                }
              ]}
              className={styles.formItem}
            >
              <Input
                placeholder="Enter Receiver Wallet Address"
                className={styles.input} disabled
                value={loggedInDetails.address}
              />
            </Form.Item>

            <Form.Item
              label="Business Name" required
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input Business Name!"
                }
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Enter Business Name" className={styles.input} />
            </Form.Item>
            <Form.Item
              label="Business Email" required
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid Email!"
                },
                {
                  required: true,
                  message: "Please input Business Email!"
                }
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Enter Business Email" className={styles.input} />
            </Form.Item>
            <div className={styles.buttonContainer}>
            <Form.Item className={styles.buttonCancel}>
              <Button type="primary" onClick={onClose} className={styles.button}>
                Cancel
              </Button>
            </Form.Item>
            <Form.Item className={styles.buttonRegister}>
              <Button type="primary" htmlType="submit" className={styles.button}>
                Register
              </Button>
            </Form.Item>
            
            </div>
          </Form>
        </Spin>
      </div>
    </div>
  );
};

export default SecondFold;
