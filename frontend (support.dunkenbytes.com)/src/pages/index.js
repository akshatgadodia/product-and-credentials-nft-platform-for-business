import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import Dashboard from "@/app/components/templates/dashboard/Dashboard";

const HomePage = () => {
  return (
    <DefaultLayout>
      <Dashboard />
    </DefaultLayout>
  );
};

export default HomePage;
