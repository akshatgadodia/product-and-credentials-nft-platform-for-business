import styles from "../stylesheets/cookieBar.module.css";
import React, { useState } from "react";
import CustomButton from "./../../../elements/CustomButton";
import Link from "next/link";
import { InfoCircleFilled, CheckCircleTwoTone } from "@ant-design/icons";
import { Modal, Switch  } from "antd";
// import "../../../../styles/antdOverrides.css";

const CookieBar = () => {
  const [openPreferences, setOpenPreferences] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [analyticsCookiesSelected, setAnalyticsCookiesSelected] = useState(true);
  return (
    <div className={isAccepted ? styles.hide : styles.cookieBar}>
      <Modal
        title="Manage Cookie Preference"
        closable={false}
        open={openPreferences}
        className="cookieBarModal"
        footer={
          <CustomButton
            text="SAVE"
            onClickHandler={() => {
              setIsAccepted(true), 
              setOpenPreferences(false);
            }}
            type="NoBorder"
          />
        }
      >
        <div className={styles.modalText}>
          <p>
            Cookies are small text files placed on your device to store data so
            web servers can use it later. Enjin and our third-party partners use
            cookies to remember your preferences and settings, help you log in
            and analyse how well our websites are working. For more information,
            please refer to our{" "}
            <Link href="/" className={styles.link}>
              Privacy Policy
            </Link>.
          </p>
          <div className={styles.modalCookiesContainer}>
            <div className={styles.modalCookieTypeContainer}>
              <div className={styles.modalCookieTypeContainerOne}>
                <strong>Required Cookies</strong>
                <CheckCircleTwoTone className={styles.checkIcon} style={{color:'#fefefe', fontSize:'20px'} } twoToneColor="#4caf50"/>
              </div>
              <div className={styles.modalCookieTypeContainerTwo}>
                These cookies are essential so that you can move around the
                website and use its features. Without these cookies services you
                have asked for cannot be provided.
              </div>
            </div>
            <div className={styles.modalCookieTypeContainer}>
              <div className={styles.modalCookieTypeContainerOne}>
                <strong>Analytics Cookies</strong>
                <Switch defaultChecked onChange={()=>{setAnalyticsCookiesSelected(!analyticsCookiesSelected)}}/>
              </div>
              <div className={styles.modalCookieTypeContainerTwo}>
                These cookies help us to improve the user experience of our
                services.
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className={styles.cookieBarText}>
        <span>
          <InfoCircleFilled className={styles.icon} />&nbsp; We use cookies to
          improve your experience on our website.&nbsp;
          <Link href="" className={styles.link}>
            Privacy Policy
          </Link>
        </span>
      </div>
      <div className={styles.cookieBarContainer}>
        <CustomButton
          text="ACCEPT ALL"
          onClickHandler={() => setIsAccepted(true)}
          type="NoBorder"
        />
        <CustomButton
          text="MANAGE SETTINGS"
          onClickHandler={() => {
            setOpenPreferences(true);
          }}
          type="NoBorder"
        />
      </div>
    </div>
  );
};

export default CookieBar;
