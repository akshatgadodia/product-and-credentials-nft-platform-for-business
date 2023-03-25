import React from "react";
import styles from "../stylesheets/secondFold.module.css";
import ArticleCard from './ArticleCard';

const SecondFold = props => {
  return (
    <div className={styles.secondFold}>
      <h2 className={styles.heading}>Articles</h2>
      <div className={styles.articlesDiv}>
        {
          [
            {},
            {},
            {},
          ].map((data, idx) => {
            return <ArticleCard key={idx} />
          })
        }
      </div>
    </div>
  );
};

export default SecondFold;
