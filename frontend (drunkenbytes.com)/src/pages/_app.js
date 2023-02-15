import React, {useReducer, useLayoutEffect} from "react";
import Head from "next/head";
import 'antd/dist/reset.css';
import "../app/styles/globals.css"
import "../app/styles/antdOverrides.css"
import AppContext from "@/app/context/AppContext";
import { reducer, initialLoggedInDetails } from "@/app/context/Reducer";
import Cookies from 'js-cookie';
import Loader from "@/app/components/modules/Loader";

export default function MyApp({ Component, pageProps }) {
  const [loggedInDetails, dispatch] = useReducer( reducer, initialLoggedInDetails);
  useLayoutEffect(() => {
    const setLoggedInDetails = async () => {
      const role = Cookies.get('userRole')
      if (role) {
          dispatch({
            type: "UserLogin",
            payload: {role}
          });
      }
    };
    setLoggedInDetails();
  }, []);
  return (
    <AppContext.Provider value={{loggedInDetails, dispatch}}>
      <Head>
        <title>Support | Drunken Bytes</title>
        <meta charSet="UTF-8" />
        <meta name="author" content="Akshat Gadodia" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Loader/>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
