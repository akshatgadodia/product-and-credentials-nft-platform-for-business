import React from "react";
import styles from "../stylesheets/firstFold.module.css";

const FirstFold = () => {
  return (
    <div className={styles.firstFold}
      style={{
        backgroundImage:
          "url(" +
          "/images/background/gradient-bottom-2000x1113.jpeg" +
          ")"
      }}
    >
      <h1 className={styles.heading}>Register</h1>
      <p className={styles.subParagraph}>
        Unlock the Power of NFTs for Your Business - Register with Drunken Bytes Today!
      </p>
    </div>
  );
};

export default FirstFold;
