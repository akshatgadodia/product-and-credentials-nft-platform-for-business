import React from "react";
import styles from "./userPage.module.css";
import Head from "next/head";
import CustomTable from "./components/CustomTable";

const UserPage = props => {
  return (
    <div className={`${styles.userDiv} transactionDiv`}>
      <Head>
        <title>Users | Support Drunken Bytes</title>
      </Head>
      <h1>Users</h1>
      <p>View all Users.</p>
      <CustomTable
        data={props.users}
        totalTransactions={props.totalUsers}
      />
    </div>
  );
};

export default UserPage;