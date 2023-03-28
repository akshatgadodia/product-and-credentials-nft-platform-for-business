import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const NftTransactionsSinglePage = props => {
  const transactionData = props.transactionData
  return (
    <>
      <Head>
        <title>
          {`${transactionData.txId.slice(0, 2)}...${transactionData.txId.slice(-3)}`}{" "}NFT Transaction | Drunken Bytes
        </title>
        <meta name="description" content="View details of your single NFT transaction on Drunken Bytes transaction page. Get real-time updates and keep track of your NFT transactions."></meta>
        <meta name="keywords" content="Drunken Bytes, NFT, transaction, details, real-time updates, track"/>
        <meta property="og:title" content="NFT Transaction | Drunken Bytes"/>
        <meta property="og:description" content="View details of your single NFT transaction on Drunken Bytes transaction page. Get real-time updates and keep track of your NFT transactions." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="NFT Transaction | Drunken Bytes"/>
        <meta name="twitter:description" content="View details of your single NFT transaction on Drunken Bytes transaction page. Get real-time updates and keep track of your NFT transactions." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/transactions/nft" />
      </Head>
      <FirstFold transactionData = {props.transactionData}/>
      <SecondFold transactionData = {props.transactionData}/>
    </>
  );
};

export default NftTransactionsSinglePage;
