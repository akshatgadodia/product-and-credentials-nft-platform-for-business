import React, {useContext} from 'react'
import styles from "./homePage.module.css"
import AppContext from "@/app/context/AppContext";

const HomePage = () => {
  const { loggedInDetails } = useContext(AppContext);
  return (
    <div className={styles.homePage}>
    HomePage
    </div>
  )
}

export default HomePage