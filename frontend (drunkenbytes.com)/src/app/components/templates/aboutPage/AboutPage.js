import React from 'react'
import styles from "./aboutPage.module.css";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';
import ThirdFold from './components/ThirdFold';
import FourthFold from './components/FourthFold';
import FifthFold from './components/FifthFold';

const AboutPage = (props) => {
  return (
    <>
    <Head>
        <title>About | Drunken Bytes</title>
        <meta name="description" content="Learn about Drunken Bytes, a technology company that offers innovative solutions for businesses and individuals. Discover our mission, values, and team, and find out how we can help you achieve your goals in the digital world."/>
        <meta name="keywords" content="Drunken Bytes, about, information, team, mission, values, services" />
      </Head>
      <FirstFold/>
      <SecondFold businessServed={props.businessServed} nftsCreated={props.nftsCreated} netTransactionValue={props.netTransactionValue}/>
      <ThirdFold/>
      <FourthFold/>
      <FifthFold/>
    </>
  )
}

export default AboutPage