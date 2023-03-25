import React from 'react'
import styles from "./homePage.module.css"
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import FirstHalfFold from './components/FirstHalfFold';
import SecondFold from './components/SecondFold';
import SecondHalfFold from './components/SecondHalfFold';
import ThirdFold from './components/ThirdFold';
import ThirdHalfFold from './components/ThirdHalfFold';

const HomePage = (props) => {
  return (
    <>
       <Head>
        <title>Drunken Bytes</title>
        <meta name="description" content="Drunken Bytes is an innovative platform for creating and trading NFTs. Discover unique digital assets and join the blockchain revolution today." />
        <meta name="keywords" content="Drunken Bytes, NFT, blockchain, digital assets, trading, marketplace." />
      </Head>
      <FirstFold/>
      <FirstHalfFold/>
      <SecondFold/>
      <SecondHalfFold businessServed={props.businessServed} nftsCreated={props.nftsCreated} netTransactionValue={props.netTransactionValue}/>
      <ThirdFold/>
      <ThirdHalfFold/>

    </>
  )
}

export default HomePage