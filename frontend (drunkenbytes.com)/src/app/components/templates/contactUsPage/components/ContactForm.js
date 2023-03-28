import React, { useState, useContext } from "react";
import styles from "../stylesheets/contactForm.module.css";
import { Button, Form, Input, Spin, Select, notification } from "antd";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import AppContext from "@/app/context/AppContext";

const ContactForm = props => {
  const { loggedInDetails } = useContext(AppContext);
  const { Option } = Select;
  const { TextArea } = Input;
  const { error, sendRequest, isLoading } = useHttpClient();
  const [topic, setTopic] = useState(null);
  const [form] = Form.useForm();

  const onFinish = async values => {
    try {
      const result = await sendRequest(
        (loggedInDetails?.isConnected) ? '/message/save-message' : '/message/save-contact-message',
        "POST",
        JSON.stringify({
          name: values.name,
          email: values.email,
          subject: values.subject,
          type: topic ?? 'sales',
          message: values.message,
        })
      );
      if (!error) {
        notification.success({
          message: "Success",
          description: result.message,
          placement: "top",
          className: "error-notification"
        });
        form.resetFields();
      }
    } catch (err) { }
  };

  const onTopicChange = (value) => {
    switch (value) {
      case 'sales':
        setTopic('sales');
        break;
      case 'support':
        setTopic('support');
        break;
      case 'other':
        setTopic('other');
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.contactForm}>
      <Spin size="large" spinning={isLoading}>
        <Form 
          name="basic"
          form={form}
          style={{ maxWidth: "100%" }}
          onFinish={onFinish}
          autoComplete="on"
        >
          {!loggedInDetails?.isConnected &&
            <Form.Item
              name="name" label="Name"
              rules={[
                {
                  required: true,
                  message: "Please input Name"
                }
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Please Enter Your Name" className={styles.input} />
            </Form.Item>
          }
          {!loggedInDetails?.isConnected &&
            <Form.Item
              name="email" label="Email"
              rules={[
                {
                  type: "email",
                  message: "Entered email is not a valid Email!"
                },
                {
                  required: true,
                  message: "Please enter email!"
                }
              ]}
              className={styles.formItem}
            >
              <Input placeholder="Please Enter Your Email" className={styles.input} />
            </Form.Item>
          }
          <Form.Item
            name="subject" label="Subject"
            rules={[
              {
                required: true,
                message: "Please input Subject!"
              }
            ]}
            className={styles.formItem}
          >
            <Input placeholder="Please Enter Subject" className={styles.input} />
          </Form.Item>
          {loggedInDetails?.isConnected &&
            <Form.Item
              name="topic" label="Topic"
              rules={[
                {
                  required: true,
                },
              ]}
              className={styles.formItem}
            >
              <Select
                placeholder="Please select a Topic"
                onChange={onTopicChange}
                allowClear
                className={styles.input}
              >
                <Option value="sales">Sales</Option>
                <Option value="support">Support</Option>
                <Option value="other">Other</Option>
              </Select>
            </Form.Item>
          }
          <Form.Item
            name="message" label="Message"
            rules={[
              {
                required: true,
                message: "Please input Message!"
              }
            ]}
            className={styles.formItem}
          >
            <TextArea placeholder="Please Enter Message" rows={4} className={styles.input} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.button}>
              SUBMIT
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default ContactForm;
