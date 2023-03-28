import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const WalletRechargeTransactionPage = props => {
  return (
    <div>
      <Head>
        <title>Wallet Recharge Transactions | Support Drunken Bytes</title>
        <meta name="description" content="The Drunken Bytes transaction page displays all your wallet recharge transactions. Stay updated on the status of your transactions and manage them efficiently."></meta>
        <meta name="keywords" content="Drunken Bytes, transaction page, wallet recharge, transactions, manage, status."></meta>
        <meta property="og:title" content="Wallet Recharge Transactions | Drunken Bytes" />
        <meta property="og:description" content="The Drunken Bytes transaction page displays all your wallet recharge transactions. Stay updated on the status of your transactions and manage them efficiently." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Wallet Recharge Transactions | Drunken Bytes" />
        <meta name="twitter:description" content="The Drunken Bytes transaction page displays all your wallet recharge transactions. Stay updated on the status of your transactions and manage them efficiently." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/transactions/wallet-recharge" />
      </Head>
      <FirstFold />
      <SecondFold />
    </div>
  );
};

export default WalletRechargeTransactionPage;
