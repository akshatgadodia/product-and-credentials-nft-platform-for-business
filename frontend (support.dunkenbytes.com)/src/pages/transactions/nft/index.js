import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import NftTransactionsPage from "@/app/components/templates/nftTransactionsPage/NftTransactionsPage";
import baseURL from "@/app/constants/baseURL";

const NftTransaction = (props) => {
  return (
    <DefaultLayout>
      <NftTransactionsPage transactions={props.transactions} totalTransactions={props.totalTransactions}/>
    </DefaultLayout>
  );
};

export default NftTransaction;

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
    const transactions = await fetch(`${baseURL}/nft-transaction/get-all-transactions?q={}&page=1&size=10`, config);
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