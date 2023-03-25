import React from 'react'
import styles from "./careersPage.module.css";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';
import ThirdFold from './components/ThirdFold';
import FourthFold from './components/FourthFold';
import FifthFold from './components/FifthFold';



const CareersPage = (props) => {
  return (
    <>
    <Head>
        <title>Careers | Drunken Bytes</title>
        <meta name="description" content="Discover exciting career opportunities with Drunken Bytes. Join our team and work with the latest technologies in a dynamic and collaborative environment." />
        <meta name="keywords" content="careers, job openings, employment, work, job opportunities, technology, collaboration, team, Drunken Bytes" />
      </Head>
      <FirstFold/>
      <SecondFold businessServed={props.businessServed} nftsCreated={props.nftsCreated} netTransactionValue={props.netTransactionValue}/>
      <ThirdFold/>
      <FourthFold/>
      <FifthFold/>
    </>
  )
}

export default CareersPage