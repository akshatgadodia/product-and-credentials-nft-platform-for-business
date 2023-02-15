import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import baseURL from "@/app/constants/baseURL";
import UserPage from '@/app/components/templates/userPage/UserPage';

const User = (props) => {
  return (
    <DefaultLayout>
      <UserPage transactions={props.transactions} totalTransactions={props.totalTransactions}/>
    </DefaultLayout>
  );
};

export default User;

export async function getStaticProps(context) {
  const config = {
    method: "GET",
    body: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  try {
    const transactions = await fetch(`${baseURL}/nft-transaction/get-all-transactions`,config);
    const transactionsData = await transactions.json();
    return {
      props: {
        transactions:transactionsData.data.transactions,
        totalTransactions: transactionsData.data.totalTransactions
      },
      revalidate: 60
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        transactions:[],
        totalTransactions: 0
      },
      revalidate: 60
    };
  }
}