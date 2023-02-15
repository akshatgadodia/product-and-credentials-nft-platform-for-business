import React from "react";
import styles from "./walletRechargeTransactionSinglePage.module.css";
import Head from "next/head";
import Link from "next/link";
import { Button, Tag } from "antd";

const WalletRechargeTransactionSinglePage = props => {
  const transactionData = props.transactionData;
  return (
    <div className={`${styles.transactionSingleDiv}`}>
      <Head>
        <title>
          {`${transactionData.txId.slice(0, 2)}...${transactionData.txId.slice(
            -3
          )}`}{" "}
          Wallet Recharge Transaction | Support Drunken Bytes
        </title>
      </Head>
      <h1>Wallet Recharge Transaction Details</h1>
      <p className={styles.p}>
        Details of Wallet Recharge Transaction hashed {transactionData.txId}.
      </p>
      <div className={styles.buttonDiv}>
        <Button
          className={styles.button}
          onClick={() =>
            window.open(
              `https://goerli.etherscan.io/tx/${transactionData.txId}`,
              "_blank"
            )}
        >
          View transaction on Etherscan
        </Button>
      </div>
      <div className={styles.detailsDiv}>
        <div className={styles.detail}>
          <p className={styles.title}>Transaction Hash: </p>
          <p className={styles.value}>
            {transactionData.txId}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Created By: </p>
          <p className={styles.value}>
            <Link href={`/user/${transactionData.createdBy._id}`}>
              {transactionData.createdBy.name}
            </Link>
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Date Crated: </p>
          <p className={styles.value}>
            {new Date(transactionData.dateCreated).getDate() +
              "/" +
              (new Date(transactionData.dateCreated).getMonth() + 1) +
              "/" +
              new Date(transactionData.dateCreated).getFullYear() +
              " " +
              new Date(transactionData.dateCreated).getHours() +
              ":" +
              new Date(transactionData.dateCreated).getMinutes() +
              ":" +
              new Date(transactionData.dateCreated).getSeconds()}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Value: </p>
          <p className={styles.value}>
            {`${(Number(transactionData.value) * 1000000000).toFixed(2)} gwei`}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Status: </p>
          <p className={styles.value}>
            {
              <Tag
                color={
                  transactionData.status === "Success"
                    ? "green"
                    : transactionData.status === "Pending"
                      ? "geekblue"
                      : "volcano"
                }
              >
                {transactionData.status.toUpperCase()}
              </Tag>
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default WalletRechargeTransactionSinglePage;
