import React, { useContext } from "react";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';

const Privacy PolicyPage = () => {
  return (
    <div className={styles.supportLogin}>
    <Head>
        <title>Privacy Policy | Drunken Bytes</title>
        <meta name="description" content="Learn about Drunken Bytes' commitment to protecting your privacy and personal information. Read our comprehensive privacy policy to know how we collect, use, and disclose your data." />
        <meta name="keywords" content="Drunken Bytes, privacy policy, personal information, data protection, data collection, data usage, data disclosure." />
        <meta property="og:title" content="Privacy Policy | Drunken Bytes" />
        <meta property="og:description" content="Learn about Drunken Bytes' commitment to protecting your privacy and personal information. Read our comprehensive privacy policy to know how we collect, use, and disclose your data." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Privacy Policy | Drunken Bytes" />
        <meta name="twitter:description" content="Learn about Drunken Bytes' commitment to protecting your privacy and personal information. Read our comprehensive privacy policy to know how we collect, use, and disclose your data." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/privacy-policy" />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </div>
  );
};

export default Privacy PolicyPage;
