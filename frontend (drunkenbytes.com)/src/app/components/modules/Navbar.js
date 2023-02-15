import styles from "./stylesheets/navbar.module.css";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { UserOutlined, LockOutlined, LogoutOutlined} from "@ant-design/icons";
import { Dropdown, Avatar, Button } from "antd";
import AppContext from "@/app/context/AppContext";

const Navbar = () => {
  const { loggedInDetails } = useContext(AppContext);
  const [isNavBarFixed, setNavBarFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 30) {
      setNavBarFixed(true);
    } else {
      setNavBarFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  const items = [
    {
      key: "1",
      label: (
        <Link href="/profile">
          <div className={styles.avatarItem}>
            <UserOutlined className={styles.avatarItemIcon} />Profile
          </div>
        </Link>
      )
    },
    {
      key: "2",
      label: (
        <Link href="/profile/change-password">
          <div className={styles.avatarItem}>
            <LockOutlined className={styles.avatarItemIcon} />
            Change Password
          </div>
        </Link>
      )
    },
    {
      key: "3",
      label: (
        // <button className={styles.avatarItemButton} onClick={logoutHandler}>
        <button className={styles.avatarItemButton}>
          <div className={styles.avatarItem}>
            <LogoutOutlined className={styles.avatarItemIcon} />
            Logout
          </div>
        </button>
      )
    }
  ];
  return (
    <div
      className={`${styles.navbar} ${isNavBarFixed ? styles.fixedNavbar : ""}`}
    >
      <div className={styles.logoContainer}>
        <Link href="/">
          <img
            alt="Mountains"
            src="/images/drunken-bytes-logo-complete.png"
            className={styles.logo}
          />
        </Link>
      </div>
      <div className={styles.buttonsContainer}>
      <div className={styles.linksContainer}>
        <Link href="/" className={styles.link}>Pricing</Link>
        <Link href="/" className={styles.link}>Documentation</Link>
        {!loggedInDetails.isLoggedIn && <Link href="/" className={styles.link}>Create</Link> }
        {!loggedInDetails.isLoggedIn && <Link href="/" className={styles.link}>Transfer</Link> }
      </div>
        {!loggedInDetails.isLoggedIn
          ? <Dropdown
              menu={{
                items
              }}
              placement="bottom"
            >
              <Avatar
                type="button"
                size="large"
                icon={<UserOutlined />}
                className={styles.avatar}
              />
            </Dropdown>
          : <Link href="/login" className={styles.button}>
              <Avatar
                type="button"
                size="large"
                icon={<UserOutlined />}
                className={styles.avatar}
              />
            </Link>}
      </div>
    </div>
  );
};

export default Navbar;
