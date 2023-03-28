import React from "react";
import styles from "../stylesheets/secondFold.module.css";
import TemplateTable from "./TemplateTable"
import CustomButton from "@/app/components/elements/CustomButton";
import { useRouter } from "next/router";

const SecondFold = props => {
  const router = useRouter();
  return (
    <div className={styles.secondFold}>
      <CustomButton type="Gradient" text="+ &nbsp; Create New Template" onClick={() => router.push('/template/create')} />
      <div className={`${styles.tableContainer} profile-tabs tab-pane`}>
        <TemplateTable />
      </div>
    </div>
  );
};

export default SecondFold;
