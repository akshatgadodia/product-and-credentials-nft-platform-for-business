import React from "react";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";
import ScrollToTop from "../modules/ScrollToTop";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <ScrollToTop/>
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
