import React from "react";
import styles from "./walletRechargeTransactionPage.module.css";
import Head from "next/head";
import CustomTable from "./components/CustomTable";

const WalletRechargeTransactionPage = props => {
  return (
    <div className={`${styles.walletRechargeDiv} transactionDiv`}>
      <Head>
        <title>Wallet Recharge Transactions | Support Drunken Bytes</title>
      </Head>
      <h1>Wallet Recharge Transactions</h1>
      <p>View all Wallet Recharge related transactions.</p>
      <CustomTable
        data={props.transactions}
        totalTransactions={props.totalTransactions}
      />
    </div>
  );
};

export default WalletRechargeTransactionPage;
