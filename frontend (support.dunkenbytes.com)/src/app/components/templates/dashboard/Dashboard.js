import React from "react";
import dynamic from "next/dynamic";

let Editor = dynamic(() => import("../../modules/Editor"), {
    ssr: false
  });
const Dashboard = () => {
  return(
    <>
    <div>HomePage</div>
    <Editor/>
    </>
  );
};

export default Dashboard;
