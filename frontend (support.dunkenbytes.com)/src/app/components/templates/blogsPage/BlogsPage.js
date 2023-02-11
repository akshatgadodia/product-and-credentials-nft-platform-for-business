import React, { useContext } from "react";
import styles from "./blogsPage.module.css";
import Head from 'next/head';

const BlogsPage = () => {
  return (
    <div className={styles.supportBlogsPage}>
    <Head>
      <title>Blogs | Support Drunken Bytes</title>
    </Head>
      Blogs Page
    </div>
  );
};

export default BlogsPage;
