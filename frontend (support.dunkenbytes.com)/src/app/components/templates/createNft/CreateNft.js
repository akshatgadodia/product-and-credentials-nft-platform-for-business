import React, { useState } from "react";
import styles from "./createNft.module.css";
import Head from "next/head";
import { Button, Form, Input, DatePicker, Modal, Spin  } from "antd";

import Loader from "@/app/components/modules/Loader";
import { useHttpClient } from "@/app/hooks/useHttpClient";

const Login = () => {
  const { error, sendRequest, isLoading } = useHttpClient();
  const [openModal, setOpenModal] = useState(false);
  const [transactionID, setTransactionID] = useState("");
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      const result = await sendRequest(
        "/nft/mint-nft",
        "POST",
        JSON.stringify({
          createdBy: values.createdBy,
          buyerName: values.buyerName,
          buyerEmail: values.buyerEmail,
          brandName: values.brandName,
          productName: values.productName,
          productId: values.productId,
          warrantyExpireDate: values.warrantyExpireDate.$d,
          buyerMetamaskAddress: values.buyerMetamaskAddress,
          methodType: 0
        })
      );
      if (!error) {
        setTransactionID(result.txId);
        setOpenModal(true);
        form.resetFields();
      }
    } catch (err) {}
  };
  return (
    <div className={styles.createNft}>
      <Loader isLoading={isLoading} />
      <Modal
        title="Your Transfer is Processing..."
        closable={true}
        onCancel={() => setOpenModal(false)}
        destroyOnClose
        open={openModal}
        className="displayResultModal"
        footer=""
      >
        <div className={styles.modalDiv}>
          <p>
            Minting of your Warranty Card NFT is processing. <br />
            It should be confirmed on blockchain shortly
          </p>
          <Spin/> 
          <div className={styles.modalInsideDiv}>
            <p>TRANSACTION ID</p>
            <a href={`https://goerli.etherscan.io/tx/${transactionID}`} target="_blank">
              {`${transactionID.slice(0, 6)}...${transactionID.slice(-4)}`}
            </a>
          </div>
        </div>
      </Modal>
      <Head>
        <title>Create Warranty Card NFT | Support Drunken Bytes</title>
      </Head>
      <div className={styles.headingDiv}>
        <h1>Create Warranty Card NFT</h1>
        <p>Create a warranty card NFT.</p>
      </div>
      <div className={styles.loginDiv}>
        <Form
          name="basic"
          form={form}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            name="createdBy"
            rules={[
              {
                required: true,
                message: "Please input User ID!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="User ID" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="buyerName"
            rules={[
              {
                required: true,
                message: "Please input Buyer Name!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Buyer Name" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="buyerEmail"
            rules={[
              {
                type: "email",
                message: "The input is not valid Email!"
              },
              {
                required: true,
                message: "Please input Buyer Email!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Buyer Email" className={styles.input} />
          </Form.Item>

          <Form.Item
            name="brandName"
            rules={[
              {
                required: true,
                message: "Please input Brand Name!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Brand Name" className={styles.input} />
          </Form.Item>

          <Form.Item
            name="productName"
            rules={[
              {
                required: true,
                message: "Please input Product Name!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Product Name" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="productId"
            rules={[
              {
                required: true,
                message: "Please input Product ID!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Product ID" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="warrantyExpireDate"
            rules={[
              {
                required: true,
                message: "Please enter Warranty Expiry Date!"
              }
            ]}
            className={styles.formItem}
          >
            <DatePicker
              className={styles.input}
              placeholder="Select Warranty Expiry Date"
            />
          </Form.Item>
          <Form.Item
            name="buyerMetamaskAddress"
            rules={[
              {
                required: true,
                message: "Please input Buyer Metamask Address!"
              }
            ]}
            className={styles.formItem}
          >
            <Input
              placeholder="Buyer Metamask Address"
              className={styles.input}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              CREATE WARRANTY CARD NFT
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
