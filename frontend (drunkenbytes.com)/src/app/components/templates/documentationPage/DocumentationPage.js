import React from "react";
import styles from "./documentationPage.module.css";
import Head from "next/head";
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const DocumentationPage = () => {
  return (
    <div className={styles.documentationPage}>
      <Head>
        <title>Documentation | Drunken Bytes</title>
        <meta name="description" content="Browse through our comprehensive documentation to learn more about Drunken Bytes platform, its features, and how to get started." />
        <meta name="keywords" content="Drunken Bytes, documentation, platform, features, tutorials, guides." />
      </Head>
      <FirstFold />
      <SecondFold />
    </div>
  );
};

export default DocumentationPage;
