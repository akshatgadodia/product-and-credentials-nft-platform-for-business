import React from "react";
import styles from "./raiseIssuePage.module.css";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const RaiseIssuePage = () => {
  return (
    <div className={styles.raiseIssuePage}>
      <Head>
        <title>Raise Issue | Drunken Bytes</title>
        <meta name="description" content="Raise an issue with Drunken Bytes and get support from our team. Submit your concern or problem, and we will work to address it as soon as possible." />
        <meta name="keywords" content="raise issue, support, concern, problem, customer service, help, Drunken Bytes." />
      </Head>
      <FirstFold />
      <SecondFold />
    </div>
  );
};

export default RaiseIssuePage;
