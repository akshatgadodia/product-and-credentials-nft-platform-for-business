import React, { useContext } from "react";
import CookieBar from "./components/CookieBar";
import styles from "./loginPage.module.css";
import Image from "next/image";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import AppContext from "@/app/context/AppContext";
import Cookies from "js-cookie";
import Loader from "@/app/components/modules/Loader";
import Head from "next/head";
import { useRouter } from "next/router";

const LoginPage = () => {
  const router = useRouter();
  const { error, sendRequest, isLoading } = useHttpClient();
  const { dispatch } = useContext(AppContext);
  const onFinish = async values => {
    try {
      await sendRequest(
        "/support-user/login",
        "POST",
        JSON.stringify({
          email: values.email,
          password: values.password
        })
      );
      if (!error) {
        const role = Cookies.get("supportUserRole");
        Cookies.set('supportUserRole', 'role', { expires: 7 })
        dispatch({
          type: "UserLogin",
          payload: { role }
        });
        router.push('/');
      }
    } catch (err) {}
  };
  return (
    <div className={styles.supportLogin}>
      <Head>
        <title>Support Login | Drunken Bytes</title>
      </Head>
      <Loader isLoading={isLoading} />
      <CookieBar />
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            src="/images/drunken-bytes-logo-icon.png"
            fill
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className={styles.loginDiv}>
          <h1>Login to Drunken Bytes</h1>
          <Form
            name="basic"
            style={{ maxWidth: "100%" }}
            onFinish={onFinish}
            autoComplete="on"
          >
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid Email!"
                },
                {
                  required: true,
                  message: "Please input your Email!"
                }
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Email" className={styles.input} />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" }
              ]}
              className={styles.formItem}
            >
              <Input.Password placeholder="Password" className={styles.input} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.button}
              >
                LOGIN
              </Button>
            </Form.Item>
          </Form>
          <p>
            Read our{" "}
            <Link href="" className={styles.link}>
              Terms & Conditions
            </Link>,{" "}
            <Link href="" className={styles.link}>
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link href="" className={styles.link}>
              Cookie Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
