import React, { useContext } from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Dashboard from "@/app/components/templates/dashboard/Dashboard";
import Login from "@/app/components/templates/login/Login";
import AppContext from "@/app/context/AppContext";
import baseURL from "@/app/constants/baseURL";

const HomePage = props => {
  const { loggedInDetails } = useContext(AppContext);
  return !loggedInDetails.isLoggedIn
    ? <Login />
    : <DefaultLayout>
        <Dashboard props={props} />
      </DefaultLayout>;
};

export default HomePage;

export async function getServerSideProps(context) {
  try {
    const performanceDataResponse = await fetch(
      `${baseURL}/admin-dashboard/get-performance-data`,
      {
        method: "GET",
        body: null,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include"
      }
    );
    const performanceData = await performanceDataResponse.json();
    const gas = await fetch(
      `https://api.owlracle.info/v3/goerli/gas?apikey=bf6e75b6686345f982f91bfedf1eb244&feeinusd=false&eip1559=false`
    );
    const gasData = await gas.json();
    const gasHistory = await fetch(
      "https://api.owlracle.info/v3/goerli/history?apikey=bf6e75b6686345f982f91bfedf1eb244&candles=10"
    );
    const gasHistoryData = await gasHistory.json();
    const chartData = [["time", "gas price", "open", "close", "high"]];
    for (let i = 9; i >= 0; i--) {
      const data = gasHistoryData[i];
      const dataObject = [
        new Date(data.timestamp).toLocaleString(),
        data.gasPrice.low,
        data.gasPrice.open,
        data.gasPrice.close,
        data.gasPrice.high
      ];
      chartData.push(dataObject);
    }
    return {
      props: {
        businessServed: performanceData.data.businessServed,
        nftsCreated: performanceData.data.nftsCreated,
        netTransactionValue: `${performanceData.data.netTransactionValue}`,
        chartData: chartData,
        gasPrice: `${gasData.speeds[3].gasPrice} gwei`,
        avgBlockTime: `${gasData.avgTime} min`,
        gasLimit: 30000000, 
      }
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        businessServed: "N/A",
        nftsCreated: "N/A",
        netTransactionValue: "N/A",
        chartData:"N/A",
        gasPrice: "N/A",
        avgBlockTime: "N/A",
        gasLimit: "N/A"
      }
    };
  }
}
