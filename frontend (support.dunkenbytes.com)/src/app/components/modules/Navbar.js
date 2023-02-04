import styles from "./stylesheets/navbar.module.css";
import React, { useState, useEffect } from "react";
import Link from 'next/link'
import SideDrawer from "./SideDrawer";
import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Avatar } from "antd";

const Navbar = () => {
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
        <Link
          href="https://www.antgroup.com"
        >
          1st menu item
        </Link>
      )
    },
  ]
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
        <Dropdown
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
        <SideDrawer />
      </div>
    </div>
  );
};

export default Navbar;
