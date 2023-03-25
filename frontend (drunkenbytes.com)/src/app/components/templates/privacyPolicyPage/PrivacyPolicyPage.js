import React, { useContext } from "react";
import styles from "./privacyPolicyPage.module.css";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';
const TermsOfServicePage = () => {
  return (
    <div className={styles.supportLogin}>
    <Head>
        <title>Privacy Policy | Drunken Bytes</title>
        <meta name="description" content="Learn about Drunken Bytes' commitment to protecting your privacy and personal information. Read our comprehensive privacy policy to know how we collect, use, and disclose your data." />
        <meta name="keywords" content="Drunken Bytes, privacy policy, personal information, data protection, data collection, data usage, data disclosure." />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </div>
  );
};

export default TermsOfServicePage;
