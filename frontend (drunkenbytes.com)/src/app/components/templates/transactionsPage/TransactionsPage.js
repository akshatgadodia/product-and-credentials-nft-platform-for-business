import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const CreateTemplatePage = () => {
  return (
    <> 
    <Head>
        <title>Transactions | Drunken Bytes</title>
        <meta name="description" content="Explore your NFT transactions or wallet recharge transactions with Drunken Bytes Transactions page. Choose which transaction you want to view and manage easily."></meta>
        <meta name="keywords" content="Explore your NFT transactions or wallet recharge transactions with Drunken Bytes Transactions page. Choose which transaction you want to view and manage easily."></meta>
        <meta property="og:title" content="Transactions | Drunken Bytes" />
        <meta property="og:description" content="Explore your NFT transactions or wallet recharge transactions with Drunken Bytes Transactions page. Choose which transaction you want to view and manage easily." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Transactions | Drunken Bytes" />
        <meta name="twitter:description" content="Explore your NFT transactions or wallet recharge transactions with Drunken Bytes Transactions page. Choose which transaction you want to view and manage easily." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/transactions" />
      </Head>
      <FirstFold />
      <SecondFold/>
    </>
  )
};

export default CreateTemplatePage;
