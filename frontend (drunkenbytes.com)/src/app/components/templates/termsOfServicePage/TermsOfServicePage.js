import React from "react";
import styles from "./termsOfServicePage.module.css";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';
const TermsOfServicePage = () => {
  return (
    <div className={styles.supportLogin}>
    <Head>
        <title>Terms of Service | Drunken Bytes</title>
        <meta name="description" content="Read through Drunken Bytes' terms of service page to understand our policies and guidelines. Learn how to use our platform and what we expect from our users." />
        <meta name="keywords" content="Drunken Bytes, terms of service, platform policies, guidelines, user expectations." />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </div>
  );
};

export default TermsOfServicePage;
