import React, { useContext } from "react";
import styles from "./cookiesPolicyPage.module.css";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';
const TermsOfServicePage = () => {
  return (
    <div className={styles.supportLogin}>
    <Head>
        <title>Cookies Policy | Drunken Bytes</title>
        <meta name="description" content="Learn about Drunken Bytes' cookie policy and how we use cookies to enhance your browsing experience. Find out how to manage cookies on our website." />
        <meta name="keywords" content="Drunken Bytes, cookie policy, cookies, online privacy, data collection, website cookies, cookie management, cookie consent" />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </div>
  );
};

export default TermsOfServicePage;
