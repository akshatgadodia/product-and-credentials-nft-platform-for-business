import React, {useState} from "react";
import styles from "./articlesWritePage.module.css";
import Head from "next/head";
import { Button, Form, Input, DatePicker, Modal, Spin } from "antd";
import dynamic from "next/dynamic";

let Editor = dynamic(() => import("@/app/components/modules/Editor"), {
    ssr: false
  });
const Login = () => {
  const [articleData,setArticleData] = useState({});
  const editorCore = React.useRef(null);
  const [form] = Form.useForm();
  const onFinish = async values => {
    try {
      // const result = await sendRequest(
      //   "/nft/mint-nft",
      //   "POST",
      //   JSON.stringify({
      //     createdBy: values.createdBy,
      //     buyerName: values.buyerName,
      //     buyerEmail: values.buyerEmail,
      //     brandName: values.brandName,
      //     productName: values.productName,
      //     productId: values.productId,
      //     warrantyExpireDate: values.warrantyExpireDate.$d,
      //     buyerMetamaskAddress: values.buyerMetamaskAddress,
      //     methodType: 0
      //   })
      // );
      // if (!error) {
      //   setTransactionID(result.txId);
      //   setOpenModal(true);
      //   form.resetFields();
      // 
      const savedData = await editorCore.current.save();
      console.log("Name");
      console.log(values.name)
      console.log("URL");
      console.log(values.url)
      console.log("ARTICLE DATA");
      console.log(savedData);
    } catch (err) {}
  };
  return (
    <div className={styles.writeArticle}>
      <Head>
        <title>Write Article | Support Drunken Bytes</title>
      </Head>
      <h1>Write a Article</h1>
      <p className={styles.p}>Write whats on your mind</p>
      <div className={styles.articleDiv}>
        <Form
          name="basic"
          form={form}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          autoComplete="on"
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please enter Article Name"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Article Name" className={styles.input} />
          </Form.Item>
          <Form.Item
            name="url"
            rules={[
              {
                required: true,
                message: "Please enter Article URL"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Article URL" className={styles.input} />
          </Form.Item>
            <Editor data={articleData} setData={setArticleData} editorCore={editorCore}/>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              CREATE ARTICLE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
