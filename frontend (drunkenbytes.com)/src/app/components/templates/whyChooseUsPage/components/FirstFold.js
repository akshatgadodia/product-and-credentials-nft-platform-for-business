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
      }}>
    {/* <img src="/images/background/gradient-bottom-2000x1113.jpeg" alt="bg" className={styles.bgImage}/> */}
      <div className={styles.mainDiv} id="main-div">
        <div className={styles.heading}>
          Why Choose Us?
        </div>
            <p className={styles.subParagraph}>
            Experience hassle-free NFT-based warranties with Drunken Bytes: Innovative, Cost-Effective, and Customer-Friendly.
            </p>
      </div>
      <div className={styles.mainImageDiv} id="main-image-div">
        <img src="/images/why-choose-us.png" alt="Image" className={styles.mainImage}/>
      </div>
    </div>
  );
};

export default FirstFold;
