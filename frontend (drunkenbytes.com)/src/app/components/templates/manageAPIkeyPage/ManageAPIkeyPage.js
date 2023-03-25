import React from "react";
import styles from "./manageAPIkeyPage.module.css";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const ManageAPIkeyPage = () => {
  return (
    <div className={styles.addProductPage}> 
    <Head>
        <title>Manage API Keys | Drunken Bytes</title>
        <meta name="description" content="Create a template for your products on Drunken Bytes so you don't have to enter the same information every time you generate an NFT. Our user-friendly interface allows you to easily set up fields for product name, traits, and other details. Save time and streamline your NFT creation process with Drunken Bytes."></meta>
        <meta name="keywords" content="Drunken Bytes, add product, create template, NFT generation, product information, product template"></meta>
      </Head>
      <FirstFold />
      <SecondFold/>
    </div>
  )
};

export default ManageAPIkeyPage;
