import React, { useReducer, useEffect, useState } from "react";
import Head from "next/head";
import "antd/dist/reset.css";
import "../app/styles/globals.css";
import "../app/styles/antdOverrides.css";
import AppContext from "@/app/context/AppContext";
import { reducer, initialLoggedInDetails } from "@/app/context/Reducer";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export default function MyApp({ Component, pageProps }) {
  const [loggedInDetails, dispatch] = useReducer(
    reducer,
    initialLoggedInDetails
  );
  const router = useRouter();
  useEffect(() => {
    const setLoggedInDetails = async () => {
      const role = Cookies.get("supportUserRole");
      if (role !== undefined) {
        dispatch({
          type: "UserLogin",
          payload: { role }
        });
      }
    };
    setLoggedInDetails();
  }, []);

  useEffect(
    () => {
      const handleStart = url => {
        // console.log(`Loading: ${url}`);
        NProgress.start()
      };

      const handleStop = () => {
        NProgress.done();
        // console.log(`Loading Stop`);
      };

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleStop);
      router.events.on("routeChangeError", handleStop);

      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleStop);
        router.events.off("routeChangeError", handleStop);
      };
    },
    [router]
  );

  return (
    <AppContext.Provider value={{ loggedInDetails, dispatch }}>
      <Head>
        <title>Support | Drunken Bytes</title>
        <meta charSet="UTF-8" />
        <meta name="author" content="Akshat Gadodia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossorigin="anonymous"
        />
      </Head>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
