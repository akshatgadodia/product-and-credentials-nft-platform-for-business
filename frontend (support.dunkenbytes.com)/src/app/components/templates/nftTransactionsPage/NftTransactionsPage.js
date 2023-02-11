import React, { useState, useEffect } from "react";
import styles from "./nftTransactionsPage.module.css";
import Head from "next/head";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import CustomTable from "./components/CustomTable";

const NftTransactionsPage = (props) => {
  const [transactions, setTransactions] = useState(props.transactions);
  const [totalTransactions, setTotalTransactions] = useState(props.totalTransactions);
  const { error, sendRequest, isLoading } = useHttpClient();

  // useEffect(() => {
  //   const fetchHistory = async () => {
  //     try {
  //       const result = await sendRequest(
  //         "/nft-transaction/get-all-transactions"
  //       );
  //       if (!error) {
  //         setTransactions(result.transactions);
  //         setTotalTransactions(result.totalTransactions);
  //       }
  //     } catch (err) {}
  //   };
  //   fetchHistory();
  // }, []);

  
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
