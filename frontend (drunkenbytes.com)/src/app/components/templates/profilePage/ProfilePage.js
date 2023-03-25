import React, { useEffect, useState } from "react";
import styles from "./profilePage.module.css";
import { useHttpClient } from "@/app/hooks/useHttpClient";
import { Image, Tabs, Skeleton } from 'antd';
import Head from 'next/head'
import NftTable from "./components/NftTable";
import WalletRechargeTable from "./components/WalletRechargeTable";

const ProfilePage = () => {
  const { error, sendRequest, clearError, isLoading } = useHttpClient();
  const [profileData, setProfileData] = useState({});
  useEffect(() => {
    const sendFetchRequest = async () => {
      const result = await sendRequest("/user/get-user-profile");
      setProfileData(result.user)
    }
    sendFetchRequest();
  }, [])

  return (
    <div className={styles.profile}>
      <Head>
        <title>Profile | Drunken Bytes</title>
        <meta name="description" content="Get access to your personalized profile page on Drunken Bytes. View your account information, update your profile, and manage your settings." />
        <meta name="keywords" content="profile page, account information, user settings, personalization, manage account. Drunken Bytes" />
      </Head>
      <h1 className={styles.heading}>Drunken Bytes Profile</h1>
      <p className={styles.paragraph}>Here you can find your profile information</p>
        <div className={styles.profileDiv}>
          <div className={styles.headerDiv}><strong>User Profile</strong></div>
          <div className={styles.contentDiv}>
            <div className={styles.imageDiv}>
              {
                (profileData?.logo === undefined) ? <Skeleton.Avatar shape="circle" active block size={200} /> :
                  <Image
                    width={200}
                    src={profileData.logo}
                    alt="brand-logo"                  
                    placeholder={<Skeleton.Avatar shape="circle" active block size={200} className={styles.logoSkeleton}/>}
                  />
              }
            </div>
            <div className={styles.informationDiv}>
              <div className={styles.informationContent}>
                {(profileData?.name === undefined) ? <Skeleton.Input active block /> : <>
                  <p>Business Name</p>
                  <p>{profileData.name}</p>
                </>}
              </div>
              <div className={styles.informationContent}>
                {(profileData?.accountAddress === undefined) ? <Skeleton.Input active block /> : <>
                  <p>Wallet Address</p>
                  <p>{profileData.accountAddress}</p>
                </>}

              </div>
              <div className={styles.informationContent}>
                {(profileData?.email === undefined) ? <Skeleton.Input active block /> : <>
                  <p>Business Email</p>
                  <p>{profileData.email}</p>
                </>}

              </div>
              <div className={styles.informationContent}>
                {(profileData?.walletBalance === undefined) ? <Skeleton.Input active block /> : <>
                  <p>Wallet Balance</p>
                  <p>{profileData.walletBalance} ETH</p>
                </>}

              </div>
            </div>
          </div>
        </div>
      <Tabs
        defaultActiveKey="1"
        className="profile-tabs"
        size="middle"
        type="card"
        animated
      >
        <Tabs.TabPane tab="NFT Transactions" key="1" className="tab-pane">
          <NftTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Wallet Transactions" key="2" className="tab-pane">
          <WalletRechargeTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Template" key="3" className="tab-pane">
          HAHA

        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default ProfilePage;
