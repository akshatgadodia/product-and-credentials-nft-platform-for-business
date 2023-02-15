import React from "react";
import styles from "./nftTransactionsPage.module.css";
import Head from "next/head";
import CustomTable from "./components/CustomTable";

const NftTransactionsPage = (props) => {
  return (
    <div className={`${styles.transactionDiv} transactionDiv`}>
      <Head>
        <title>NFT Transactions | Support Drunken Bytes</title>
      </Head>
      <h1>NFT Transactions</h1>
      <p>View all NFT related transactions.</p>
      <CustomTable
        data={props.transactions}
        totalTransactions={props.totalTransactions}
      />
    </div>
  );
};

export default NftTransactionsPage;
