import CustomButton from "@/app/components/elements/CustomButton";
import React from "react";
import styles from "../stylesheets/firstFold.module.css";
import {Link} from "react-scroll";
const FirstFold = () => {
  return (
    <div className={styles.firstFold}>
      <div className={styles.mainDiv}>
        <h1 className={styles.heading}>Help Center</h1>
        <p className={styles.subParagraph}>Get answers straight from the Drunken Bytes team.</p>
      </div>
      <img src="/images/background/help-center.png" alt=""/>
    </div>
  );
};

export default FirstFold;
