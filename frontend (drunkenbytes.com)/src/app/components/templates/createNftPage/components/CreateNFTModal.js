import React, { useState, useEffect } from "react";
import styles from "../stylesheets/createNFTModal.module.css";
import { Modal, Spin  } from "antd";
const SecondFold = props => {
  return (
      <Modal
        title="Your Transfer is Processing..."
        closable={true}
        onCancel={() => props.setOpenModal(false)}
        destroyOnClose
        open={props.openModal}
        className="displayResultModal"
        footer=""
      >
        <div className={styles.modalDiv}>
          <p>
            Minting of your Warranty Card NFT is processing. <br />
            It should be confirmed on blockchain shortly
          </p>
          <div className={styles.modalInsideDiv}>
            <p>TRANSACTION ID</p>
            <a href={`https://goerli.etherscan.io/tx/${props.transactionID}`} target="_blank">
              {`${props.transactionID.slice(0, 6)}...${props.transactionID.slice(-4)}`}
            </a>
          </div>
          <p>
            We will inform you via mail about the status.<br />
            Thank You for using our service
          </p>
        </div>
      </Modal>
  );
};

export default SecondFold;
