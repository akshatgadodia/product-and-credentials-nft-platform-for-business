import React from "react";
import styles from "./dashboard.module.css";
import PerformanceDisplay from "./components/PerformanceDisplay";
import { useContext, useState } from "react";
import Chart from "react-google-charts";
import AppContext from "@/app/context/AppContext";
import MessageDisplay from "./components/MessageDisplay";
import NewsDisplay from "./components/NewsDisplay";
import { ReloadOutlined } from "@ant-design/icons";
const Dashboard = props => {
  const { loggedInDetails } = useContext(AppContext);
  const [messagesData, setMessagesData] = useState(props.props.messagesData);
  const [messagesPage, setMessagesPage] = useState(0);
  const [newsData, setNewsData] = useState(props.props.newsData);
  const [nextNewsPage, setNextNewsPage] = useState(props.props.nextNewsPage);

  const loadMoreMessagesHandler = async () => {
    console.log("MORE MESSAGES LOADED");
  };
  const refreshMessagesHandler = async () => {
    console.log("MESSAGES REFRESHED");
  };
  const loadMoreNewsHandler = async () => {
    console.log("MORE NEWS LOADED");
  };
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
          ].map((data, idx) => {
            return (
              <PerformanceDisplay
                key={idx}
                src={data.src}
                heading={data.heading}
                value={data.value}
                backgroundColor={data.backgroundColor}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.middleContainer}>
        {loggedInDetails.role === "EDITOR"
          ? <div className={styles.middleDiv}>
              <span>Latest News</span>
              <hr />
              <div
                className={`${styles.middleDivContainer} ${styles.newsContainer}`}
              >
                {newsData.map((data, idx) => {
                  return (
                    <NewsDisplay
                      key={idx}
                      title={data.title}
                      link={data.link}
                    />
                  );
                })}
                <button
                  onClick={loadMoreMessagesHandler}
                  className={styles.loadMoreButton}
                >
                  Load More...
                </button>
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
                      value: props.props.gasPrice
                    },
                    {
                      name: "Avg Block Time",
                      value: props.props.avgBlockTime
                    },
                    { name: "Gas Limit", value: `${props.props.gasLimit}` }
                  ].map((data, idx) => {
                    return (
                      <div className={styles.statsDiv} key={idx}>
                        <p>
                          {data.name}
                        </p>
                        <span>
                          {data.value}
                        </span>
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
          <span>
            Messages
            <ReloadOutlined
              className={styles.reloadIcon}
              onClick={refreshMessagesHandler}
            />
          </span>
          <hr />
          <div
            className={`${styles.middleDivContainer} ${styles.messagesContainer}`}
          >
            {messagesData.map((data, idx) => {
              return (
                <MessageDisplay
                  key={idx}
                  date={data.date}
                  messageBy={data.messageBy.name}
                  subject={data.subject}
                  isRead={data.isRead}
                />
              );
            })}
            <button
              onClick={loadMoreMessagesHandler}
              className={styles.loadMoreButton}
            >
              Load More...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
