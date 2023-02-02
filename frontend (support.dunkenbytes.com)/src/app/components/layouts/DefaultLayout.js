import "../../styles/globals.css";
import React from "react";
import Head from "next/head";
import Navbar from "../modules/Navbar";
import Footer from "../modules/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Support | Drunken Bytes</title>
        <meta charSet="UTF-8" />
        <meta name="author" content="Syamlal CM" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Navbar />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
};

export default DefaultLayout;
