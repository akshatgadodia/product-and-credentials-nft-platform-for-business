import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import baseURL from "@/app/constants/baseURL";
import WalletRechargeTransactionSinglePage from "../../../../app/components/templates/walletRechargeTransactionSinglePage/WalletRechargeTransactionSinglePage";

const WalletTransaction = props => {
  return (
    <DefaultLayout>
      <WalletRechargeTransactionSinglePage
        transactionData={props.transaction}
      />
    </DefaultLayout>
  );
};

export default WalletTransaction;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          txId:
            "0xa046091545e6daaa542e80e86fe7798a2e349da98628706e42ccd56259eca762"
        }
      }
    ],
    fallback: "blocking" // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const txId = params.txId;
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
    const transactions = await fetch(
      `${baseURL}/wallet-transaction/get-transaction?transactionHash=${txId}`,
      config
    );
    const transactionsData = await transactions.json();
    return {
      props: {
        transaction: transactionsData.data.transaction
      },
      revalidate: 60
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        transaction: null,
      },
      revalidate: 60
    };
  }
}
