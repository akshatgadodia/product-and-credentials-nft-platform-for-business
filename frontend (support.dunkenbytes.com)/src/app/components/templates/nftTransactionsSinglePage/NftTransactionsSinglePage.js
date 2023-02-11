import React, { useState, useEffect } from "react";
import styles from "./nftTransactionsSinglePage.module.css";
import Head from "next/head";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";
import { Button, Tag } from "antd";
import CustomButton from './../../elements/CustomButton';

const NftTransactionsSinglePage = props => {
  const transactionData = props.transactionData;
  let date = transactionData.dateCreated;

  return (
    <div className={`${styles.transactionSingleDiv}`}>
      <Head>
        <title>
          {`${transactionData.txId.slice(0, 2)}...${transactionData.txId.slice(
            -3
          )}`}{" "}
          NFT Transaction | Support Drunken Bytes
        </title>
      </Head>
      <h1>NFT Transaction Details</h1>
      <p className={styles.p}>
        Details of NFT Transaction hashed {transactionData.txId}.
      </p>
      <div className={styles.buttonDiv}>
          <Button className={styles.button} onClick={()=>window.open(`https://goerli.etherscan.io/tx/${transactionData.txId}`, '_blank')} >View transaction on Etherscan</Button>
          <Button className={styles.button} onClick={()=>window.open(`https://testnets.opensea.io/assets/goerli/0x15b8e16dba7821d336606f9d25cbb374beb08ffd/${transactionData.tokenId}`, '_blank')} >View NFT on OpenSea</Button>
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
          <p className={styles.title}>Token ID: </p>
          <p className={styles.value}>
            {transactionData.tokenId}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Date Crated: </p>
          <p className={styles.value}>
            {new Date(date).getDate() +
              "/" +
              (new Date(date).getMonth() + 1) +
              "/" +
              new Date(date).getFullYear() +
              " " +
              new Date(date).getHours() +
              ":" +
              new Date(date).getMinutes() +
              ":" +
              new Date(date).getSeconds()}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Value: </p>
          <p className={styles.value}>
            {`${(Number(transactionData.value) * 1000000000).toFixed(2)} gwei`}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Method: </p>
          <p className={styles.value}>
            {transactionData.methodType === 0
              ? "Safe Mint"
              : methodType === 1 ? "Transfer" : "Burn"}
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
        <div className={styles.detail}>
          <p className={styles.title}>Buyer Name: </p>
          <p className={styles.value}>
            {transactionData.buyerName}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Buyer Email: </p>
          <p className={styles.value}>
            {transactionData.buyerEmail}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Buyer Metamask Address: </p>
          <p className={styles.value}>
            {transactionData.buyerMetamaskAddress}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Brand Name: </p>
          <p className={styles.value}>
            {transactionData.brandName}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Product Name: </p>
          <p className={styles.value}>
            {transactionData.productName}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Product Id: </p>
          <p className={styles.value}>
            {transactionData.productId}
          </p>
        </div>
        <div className={styles.detail}>
          <p className={styles.title}>Warranty Expiry Date: </p>
          <p className={styles.value}>
            {transactionData.warrantyExpireDate}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NftTransactionsSinglePage;
