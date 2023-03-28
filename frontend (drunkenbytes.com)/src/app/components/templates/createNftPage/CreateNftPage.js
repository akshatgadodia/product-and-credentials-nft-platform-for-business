import React from "react";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const CreateNftPage = () => {
  return (
    <> 
    <Head>
        <title>Create NFT | Drunken Bytes</title>
        <meta name="description" content="Create your own unique NFTs on Drunken Bytes. Our user-friendly platform allows you to easily generate and manage your digital assets. Start minting now!" />
        <meta name="keywords" content="Drunken Bytes, NFT, create NFT, digital assets, minting, blockchain, cryptocurrency, non-fungible tokens, crypto art, collectibles, tokenization." />
        <meta property="og:title" content="Create NFT | Drunken Bytes" />
        <meta property="og:description" content="Create your own unique NFTs on Drunken Bytes. Our user-friendly platform allows you to easily generate and manage your digital assets. Start minting now!" />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Create NFT | Drunken Bytes" />
        <meta name="twitter:description" content="Create your own unique NFTs on Drunken Bytes. Our user-friendly platform allows you to easily generate and manage your digital assets. Start minting now!" />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/create" />
      </Head>
      <FirstFold />
      <SecondFold/>
    </>
  )
};

export default CreateNftPage;
