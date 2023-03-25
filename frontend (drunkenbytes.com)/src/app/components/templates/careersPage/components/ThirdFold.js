import React from "react";
import styles from "../stylesheets/thirdFold.module.css";
const ThirdFold = () => {
  return (
    <div className={styles.thirdFold}>
    <div className={styles.heading}>Our Perks</div>
      <p className={styles.subParagraph}>
      Employees are our number-one priority, so we like to take care of them!
      </p>
      <div className={styles.mainDiv}>
      {
        [
       {
          src:"https://static.opensea.io/careers/icon-family.svg",
          alt:"",
          heading:"Paid family leave",
          content: "Whether you’re bonding with a new child or taking care of a family member, we understand you need this time off."
       },
       {
          src:"https://static.opensea.io/careers/icon-health.svg",
          alt:"",
          heading:"Health insurance",
          content: "Your wellness is important. We've got you covered. Take care of yourself to come to work happy and healthy."
       },

       {
          src:"https://static.opensea.io/careers/icon-vacation.svg",
          alt:"",
          heading:"Flexible vacation policy",
          content: "Sometimes we all need a break. Take one, take many. Just come back recharged and inspired."
       },
       {
          src:"https://static.opensea.io/careers/icon-time.svg",
          alt:"",
          heading:"Flexible hours",
          content: "We know you have personal priorities to take care of. Take care of them and work on your own hours; we’re flexible."
       },
       {
          src:"https://static.opensea.io/careers/icon-users.svg",
          alt:"",
          heading:"Workshops & conferences",
          content: "Attend relevant workshops and conferences to grow and develop. It’s our priority."
       } ,
       {
          src:"https://static.opensea.io/careers/icon-retreats.svg",
          alt:"",
          heading:"Travel & company retreats",
          content: "As a distributed team, we take the time to meet up for company retreats."
       }
      ].map((data,idx)=>{
        return <div className={styles.contaierDiv}>
          <img src={data.src} alt={data.alt} className={styles.image}/>
          <h2 className={styles.mainHeading}>{data.heading}</h2>
          <p className={styles.paragraph}>{data.content}</p>
        </div>
      })
      }
    </div>
  </div>
  );
};

export default ThirdFold;
