import React, { useState } from "react";
import styles from "../stylesheets/secondFold.module.css";
import CustomButton from "@/app/components/elements/CustomButton";
import APIKeyTable from "./APIKeyTable";
import CreateAPIModal from "./CreateAPIModal";

const SecondFold = props => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.profile}>
      <CreateAPIModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <CustomButton type="Gradient" text="+ &nbsp; Create New API Key" onClick={() => setModalOpen(true)} />
      <div className={`${styles.tableContainer} profile-tabs tab-pane`}>
        <APIKeyTable modalOpen={modalOpen} setModalOpen={setModalOpen}/>
      </div>
    </div>
  );
};

export default SecondFold;
