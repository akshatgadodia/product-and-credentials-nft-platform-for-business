import React from "react";
import styles from "../stylesheets/secondFold.module.css";
import WalletRechargeTable from "./WalletRechargeTable"

const SecondFold = props => {
  return (
    <div className={`${styles.secondFold} tab-pane`}>
      <WalletRechargeTable />
    </div>
  );
};

export default SecondFold;
