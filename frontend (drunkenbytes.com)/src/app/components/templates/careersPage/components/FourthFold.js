import React from "react";
import styles from "../stylesheets/fourthFold.module.css";
import CustomButton from "@/app/components/elements/CustomButton";
const FourthFold = () => {
  return (
    <div className={styles.fourthFold}>
        <div className={styles.heading}>Interested in joining us?</div>
      <p className={styles.subParagraph}>
      Hop aboard and view our open positions
      </p>
      <CustomButton type="Gradient" text="See open roles" onClick={() => {}} />
    </div>
  );
};

export default FourthFold;
