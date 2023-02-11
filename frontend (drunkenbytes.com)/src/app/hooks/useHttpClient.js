import { useState, useCallback, useContext } from "react";
import { notification } from "antd";
import baseURL from "@/app/constants/baseURL";
import "@/app/styles/antdOverrides.css";
import AppContext from "@/app/context/AppContext";

export const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const sendRequest = useCallback(
    async (url, method = "GET", body = null, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await fetch(`${baseURL}${url}`, {
          method,
          body,
          headers,
          credentials: "include"
        });
        // console.log(response)
        const responseData = await response.json();
        // console.log(responseData);
        if (!responseData.success) {
          //console.log(responseData)
          throw new Error(responseData.data.error);
        }
        setIsLoading(false);
        return responseData.data;
      } catch (err) {
        // console.log(err)
        setError(err.message);
        setIsLoading(false);
        notification.error({
          message: "Error",
          description: err.message,
          placement: "top",
          duration: null,
          className: "error-notification"
        });
        throw err;
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};
