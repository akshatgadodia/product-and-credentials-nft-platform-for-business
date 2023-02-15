import React, { useState, useEffect } from "react";
import styles from "./userSinglePage.module.css";
import Head from "next/head";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import Link from "next/link";
import { Tag } from "antd";

const NftTransactionsSinglePage = props => {
  return (
    <div className={`${styles.transactionSingleDiv}`}>
      <Head>
        <title>
          NFT Transaction | Support Drunken Bytes
        </title>
      </Head>
      <h1>NFT Transaction Details</h1>
    </div>
  );
};

export default NftTransactionsSinglePage;
