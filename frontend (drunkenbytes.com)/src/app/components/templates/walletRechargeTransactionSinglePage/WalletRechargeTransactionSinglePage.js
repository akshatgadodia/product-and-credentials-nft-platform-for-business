import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const WalletRechargeTransactionSinglePage = props => {
  const transactionData = props.transactionData;
  return (
    <>
      <Head>
        <title>
          {`${transactionData.txId.slice(0, 2)}...${transactionData.txId.slice(-3)}`}{" "}Wallet Recharge Transaction | Drunken Bytes
        </title>
        <title>Wallet Recharge Transactions | Support Drunken Bytes</title>
        <meta name="description" content="View details of a single wallet recharge transaction on Drunken Bytes. Get transaction ID, status, date, amount, and other relevant information."></meta>
        <meta name="keywords" content="wallet recharge transaction, single transaction, transaction ID, transaction status, transaction date, transaction amount, Drunken Bytes."></meta>
        <meta property="og:title" content="Wallet Recharge Transaction | Drunken Bytes" />
        <meta property="og:description" content="View details of a single wallet recharge transaction on Drunken Bytes. Get transaction ID, status, date, amount, and other relevant information." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Wallet Recharge Transaction | Drunken Bytes" />
        <meta name="twitter:description" content="View details of a single wallet recharge transaction on Drunken Bytes. Get transaction ID, status, date, amount, and other relevant information." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/transactions/wallet-recharge/" />
      </Head>
      <FirstFold transactionData = {props.transactionData}/>
      <SecondFold transactionData = {props.transactionData}/>
    </>
  );
};

export default WalletRechargeTransactionSinglePage;
