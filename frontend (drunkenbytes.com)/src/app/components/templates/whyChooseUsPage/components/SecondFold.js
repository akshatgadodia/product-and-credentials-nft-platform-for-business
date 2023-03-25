import React from "react";
import styles from "../stylesheets/secondFold.module.css";


const SecondFold = props => {
  return (
    <div className={styles.secondFold}>
      {[
        {
          src: "/images/easy-to-use.png",
          alt: "easy-to-use",
          heading: "Easy to use",
          paragraph: "Drunken Bytes simplifies creating NFT-based warranty cards with website or API integration, saving time and resources for users."
        },
        {
          src: "/images/transferable.png",
          alt: "transferable",
          heading: "Transferable",
          paragraph: "Drunken Bytes' NFT-based warranty cards facilitate NFT transfer between owners, adding value for customers when reselling products."
        },
        {
          src: "/images/innovative.png",
          alt: "innovative",
          heading: "Innovative",
          paragraph: "Drunken Bytes is innovating NFT technology in warranties, ensuring customers work with a company that seeks new solutions."
        },
        {
          src: "/images/cost-effective.png",
          alt: "cost-effective",
          heading: "Cost-effective",
          paragraph: "NFT-based warranties are cost-effective, reduce admin costs, and prevent fraud compared to traditional solutions."
        },
        {
          src: "/images/customer-friendly.png",
          alt: "customer-friendly",
          heading: "Customer-friendly",
          paragraph: "NFT-based warranties are customer-friendly, transferable, and build trust between businesses and customers with blockchain verification."
        },
        {
          src: "/images/customer-support.png",
          alt: "customer-support",
          heading: "Customer support",
          paragraph: "Drunken Bytes offers customer support for users creating and managing NFT-based warranties, especially those new to blockchain technology."
        }
      ].map((data, idx)=>{
        return <div className={styles.containerDiv} key={idx}>
        <img src={data.src} alt={data.alt}/>
        <h2>{data.heading}</h2>
        <p>{data.paragraph}</p>
      </div>
      })}
    </div>
  );
};

export default SecondFold;
