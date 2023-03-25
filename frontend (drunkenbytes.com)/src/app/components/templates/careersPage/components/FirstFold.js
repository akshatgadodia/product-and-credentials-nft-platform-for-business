import React from "react";
import styles from "../stylesheets/firstFold.module.css";
import CustomButton from "@/app/components/elements/CustomButton";

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
      <div className={styles.mainDiv} id="main-div">
        <div className={styles.heading}>
        Let’s build the future of Warranty Card NFT's together
        </div>
            <p className={styles.subParagraph}>
        Not only are we passionate about our work, we enjoy the people we surround ourselves with. At Drunken Bytes, we build trust, embrace feedback, grow rapidly, and love our work.
            </p>
            <CustomButton type="Gradient" text="View our open positions" onClick={() => {console.log("CLICKED")}} />


      </div>
      <div className={styles.mainImageDiv} id="main-image-div">
        <img src="/images/careers.png" alt="Image" className={styles.mainImage}/>
      </div>
    </div>
  );
};

export default FirstFold;
