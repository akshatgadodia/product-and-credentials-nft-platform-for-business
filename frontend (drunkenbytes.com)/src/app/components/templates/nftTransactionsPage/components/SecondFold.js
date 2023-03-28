import React from "react";
import styles from "../stylesheets/secondFold.module.css";
import NftTable from "./NftTable"

const SecondFold = props => {
  return (
    <div className={`${styles.secondFold} tab-pane`}>
      <NftTable />
    </div>
  );
};

export default SecondFold;
