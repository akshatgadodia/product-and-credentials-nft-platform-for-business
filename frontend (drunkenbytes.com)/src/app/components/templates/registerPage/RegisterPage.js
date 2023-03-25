import React, {useLayoutEffect} from "react";
import styles from "./registerPage.module.css";
import Head from "next/head";
import RegisterModal from '../../modules/RegisterModal';
import FirstFold from "./components/FirstFold";
import SecondFold from './components/SecondFold';

const RegisterPage = () => {

  return (
    <div className={styles.RegisterPage}> 
      <Head>
        <title>Register | Drunken Bytes</title>
        <meta name="description" content="Create an account on Drunken Bytes and access our NFT marketplace. Register now and join our community of businesses and enthusiasts." />
        <meta name="keywords" content="Drunken Bytes, register, create account, Product NFT, community, Document NFT, grow your business, enthusiasts." />
      </Head>
      <RegisterModal/>
      <FirstFold />
      <SecondFold/>
    </div>
  )
};

export default RegisterPage;
