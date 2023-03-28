import React from "react";
import styles from "../stylesheets/secondFold.module.css";
import IssuesTable from "./IssuesTable";

const SecondFold = props => {
  return (
    <div className={`${styles.secondFold} tab-pane`}>
      <IssuesTable />
    </div>
  );
};

export default SecondFold;
