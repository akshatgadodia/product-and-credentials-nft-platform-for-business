import React from 'react'
import styles from "./whyChooseUsPage.module.css";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from "./components/SecondFold";

const WhyChooseUsPage = () => {
  return (
    <div className={styles.whyChooseUsPage}> 
    <Head>
        <title>Why Choose Drunken Bytes</title>
        <meta name="description" content="Discover why Drunken Bytes is the perfect platform for creating, selling and managing your NFTs. Learn about our innovative features and services and why you should choose us as your trusted partner for NFTs." />
          <meta name="keywords" content="Drunken Bytes, NFTs, Non-fungible tokens, blockchain, marketplace, create NFTs, sell NFTs, manage NFTs, digital assets." />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </div>
  )
}

export default WhyChooseUsPage