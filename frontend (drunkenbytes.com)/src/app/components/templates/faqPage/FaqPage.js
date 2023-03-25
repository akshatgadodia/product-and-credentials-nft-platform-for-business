import React, { useContext } from "react";
import styles from "./faqPage.module.css";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';
const FAQPage = () => {
  return (
    <div className={styles.supportLogin}>
    <Head>
        <title>Frequently Asked Questions | Drunken Bytes</title>
        <meta name="description" content="Get answers to frequently asked questions about Drunken Bytes, our services, and policies. Find solutions to common issues and learn more about our company." />
        <meta name="keywords" content="Drunken Bytes, FAQ, frequently asked questions, solutions, issues, company." />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </div>
  );
};

export default FAQPage;
