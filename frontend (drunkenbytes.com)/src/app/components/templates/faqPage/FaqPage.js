import React from "react";
import Head from 'next/head'
import FirstFold from './components/FirstFold';
import SecondFold from './components/SecondFold';

const FAQPage = () => {
  return (
    <>
    <Head>
        <title>Frequently Asked Questions | Drunken Bytes</title>
        <meta name="description" content="Get answers to frequently asked questions about Drunken Bytes, our services, and policies. Find solutions to common issues and learn more about our company." />
        <meta name="keywords" content="Drunken Bytes, FAQ, frequently asked questions, solutions, issues, company." />
        <meta property="og:title" content="Frequently Asked Questions | Drunken Bytes" />
        <meta property="og:description" content="Get answers to frequently asked questions about Drunken Bytes, our services, and policies. Find solutions to common issues and learn more about our company." />
        <meta property="og:image" content="" />
        <meta name="twitter:title" content="Frequently Asked Questions | Drunken Bytes" />
        <meta name="twitter:description" content="Get answers to frequently asked questions about Drunken Bytes, our services, and policies. Find solutions to common issues and learn more about our company." />
        <meta name="twitter:image" content=""/>
        <link rel="canonical" href="https://drunkenbytes.vercel.app/faq" />
      </Head>
      <FirstFold/>
      <SecondFold/>
    </>
  );
};

export default FAQPage;
