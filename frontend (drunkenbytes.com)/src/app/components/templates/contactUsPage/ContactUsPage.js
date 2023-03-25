import React from "react";
import styles from "./contactUsPage.module.css";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const ContactUsPage = () => {
  return (
    <div className={styles.contactUsPage}>
      <Head>
        <title>Contact Us | Drunken Bytes</title>
        <meta name="description" content="The Drunken Bytes Contact Us page is your source for getting in touch with our team. Whether you have a question, feedback, or need support, we're here to help. Fill out our contact form or reach out to us via email or phone." />
        <meta name="keywords" content="Drunken Bytes, contact, contact us, support, feedback, email, phone, get in touch, reach out." />
      </Head>
      <FirstFold />
      <SecondFold />
    </div>
  );
};

export default ContactUsPage;
