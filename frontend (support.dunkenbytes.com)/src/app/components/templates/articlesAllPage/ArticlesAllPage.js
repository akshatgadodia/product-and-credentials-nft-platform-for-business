import React from "react";
import styles from "./articlesAllPage.module.css";
import Head from 'next/head';

const ArticlesAllPage = () => {
  return ( 
    <div className={styles.articlesAllPage}>
    <Head>
      <title>Articles | Support Drunken Bytes</title>
    </Head>
    <h1>Articles</h1>
      <p>View all NFT related transactions.</p>
    </div>
  );
};

export default ArticlesAllPage;
