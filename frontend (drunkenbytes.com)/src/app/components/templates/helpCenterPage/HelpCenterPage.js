import React, { useContext } from "react";
import styles from "./helpCenterPage.module.css";
import Link from "next/link";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const HelpCenterPage = () => {
  
  return (
    <div className={styles.helpCenterPage}>
      <Head>
        <title>Help Center | Drunken Bytes</title>
        <meta name="description" content="Looking for help with our products and services? Visit our Help Center for answers to frequently asked questions, tutorials, and guides." />
        <meta name="keywords" content="Drunken Bytes, help center, customer support, FAQs, tutorials, guides." />
      </Head>
      <FirstFold />
      <SecondFold />
    </div>
  );
};

export default HelpCenterPage;
