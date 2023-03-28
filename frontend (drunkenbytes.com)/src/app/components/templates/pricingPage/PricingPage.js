import React from 'react'
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';
import ThirdHalfFold from './components/ThirdHalfFold';

const PricingPage = (props) => {
  return (
    <div className={styles.pricingPage}> 
    <Head>
        <title>Pricing | Drunken Bytes</title>
        <meta name="description" content="Find out how Drunken Bytes charges a commission of 5% using a wallet-based pricing method. Explore our pricing page for more information." />
        <meta name="keywords" content="wallet-based pricing, commission, pricing page, Drunken Bytes." />
        <meta property="og:title" content="Pricing | Drunken Bytes" />
        <meta property="og:description" content="Find out how Drunken Bytes charges a commission of 5% using a wallet-based pricing method. Explore our pricing page for more information." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Pricing | Drunken Bytes" />
        <meta name="twitter:description" content="Find out how Drunken Bytes charges a commission of 5% using a wallet-based pricing method. Explore our pricing page for more information." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/pricing" />
      </Head>
      <FirstFold />
      <SecondFold price={props.price}/>
      <ThirdHalfFold/>
    </div>
  )
}

export default PricingPage