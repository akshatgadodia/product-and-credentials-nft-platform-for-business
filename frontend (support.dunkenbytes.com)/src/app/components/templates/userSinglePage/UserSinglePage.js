import React, { useState, useEffect } from "react";
import styles from "./userSinglePage.module.css";
import Head from "next/head";
import { Tabs } from "antd";
import NftTable from "./components/NftTable";
import WalletRechargeTable from "./components/WalletRechargeTable";
import { useRouter } from 'next/router'
const NftTransactionsSinglePage = props => {
  const TabPane = Tabs.TabPane;
  const router = useRouter();
  return (
    <div className={`${styles.userSingleDiv}`}>
      <Head>
        <title>
          User {props.userData.name} | Support Drunken Bytes
        </title>
      </Head>
      <h1>
        {props.userData.name}
      </h1>
      <p>
        {props.userData.walletBalance} ETH
      </p>
      <p>
        {props.userData.accountAddress}
      </p>
      <p className={styles.p}>
        {props.userData.email}
      </p>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane key={"1"} tab={<h4>NFT Transactions</h4>}>
          <div className={`${styles.tableContainer} transactionDiv`}>
            <NftTable userId={router.query.userId}/>
          </div>
        </TabPane>
        <TabPane key={"2"} tab={<h4>Wallet Recharge Transactions</h4>}>
          <div className={`${styles.tableContainer} transactionDiv`}>
            <WalletRechargeTable userId={router.query.userId}/>
          </div>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default NftTransactionsSinglePage;
