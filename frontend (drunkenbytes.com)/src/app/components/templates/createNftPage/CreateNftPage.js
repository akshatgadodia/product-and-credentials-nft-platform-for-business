import React from "react";
import styles from "./createNft.module.css";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const CreateNftPage = () => {
  return (
    <div className={styles.createNftPage}> 
    <Head>
        <title>Create NFT | Drunken Bytes</title>
        <meta name="description" content="Create your own unique NFTs on Drunken Bytes. Our user-friendly platform allows you to easily generate and manage your digital assets. Start minting now!" />
        <meta name="keywords" content="Drunken Bytes, NFT, create NFT, digital assets, minting, blockchain, cryptocurrency, non-fungible tokens, crypto art, collectibles, tokenization." />
      </Head>
      <FirstFold />
      <SecondFold/>
    </div>
  )
};

export default CreateNftPage;
