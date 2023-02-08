import React from "react";
import styles from "./dashboard.module.css";
import PerformanceDisplay from "./components/PerformanceDisplay";
import { useContext } from "react";
import Chart from "react-google-charts";
import AppContext from "@/app/context/AppContext";

const Dashboard = props => {
  const { loggedInDetails } = useContext(AppContext);
  return (
    <div className={styles.dashboard}>
      <div className={styles.performanceDiv}>
        <span>Business Performance</span>
        <hr />
        <div className={styles.performanceContainer}>
          {[
            {
              src: "/images/business-served-icon.png",
              heading: "Business Served",
              value: props.props.businessServed,
              backgroundColor: "#f6ba28"
            },
            {
              src: "/images/nfts-created.png",
              heading: "NFT's Created",
              value: `${props.props.nftsCreated}`,
              backgroundColor: "#dd3d63"
            },
            {
              src: "/images/net-transaction-value-icon.png",
              heading: "Net Transaction Value",
              value: `${props.props.netTransactionValue} ETH`,
              backgroundColor: "#55ce8e"
            }
          ].map((data,idx) => {
                return (
                  <PerformanceDisplay
                    key={idx}
                    src={data.src}
                    heading={data.heading}
                    value={data.value}
                    backgroundColor={data.backgroundColor}
                  />
                );
              }
          )}
        </div>
      </div>
      <div className={styles.middleContainer}>
        {loggedInDetails.role === "EDITOR"
          ? <div className={styles.middleDiv}>
              <span>Latest News</span>
              <hr />
              <div className={styles.middleDivContainer}> 

              </div>
            </div>
          : <div className={styles.middleDiv}>
              <span>Goerli Stats</span>
              <hr />
              <div className={styles.middleDivContainer}>
                <div className={styles.stats}>
                  {[
                    {
                      name: "Gas Price",
                      value: Number(props.props.gasPrice).toFixed(2)
                    },
                    {
                      name: "Avg Block Time",
                      value: Number(props.props.avgBlockTime).toFixed(2)
                    },
                    { name: "Gas Limit", value: `${props.props.gasLimit}` }
                  ].map((data, idx) => {
                    return (
                      <div className={styles.statsDiv} key={idx}>
                        <p>{data.name}</p>
                        <span>{data.value}</span>
                      </div>
                    );
                  })}
                </div>
                <Chart
                  width={"100%"}
                  height={400}
                  chartType="CandlestickChart"
                  loader={<div>Loading Chart</div>}
                  data={props.props.chartData}
                  options={{
                    legend: "none"
                  }}
                  className={styles.chart}
                />
              </div>
            </div>}
        <div className={styles.middleDiv}>
          <span>Messages</span>
          <hr />
          <div className={styles.middleDivContainer} >

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
