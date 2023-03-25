import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import baseURL from "@/app/constants/baseURL";
import UserPage from '@/app/components/templates/userPage/UserPage';

const User = (props) => {
  return (
    <DefaultLayout>
      <UserPage users={props.users} totalUsers={props.totalUsers}/>
    </DefaultLayout>
  );
};

export default User;

export async function getStaticProps(context) {
  const config = {
    method: "GET",
    body: null,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    credentials: "include"
  };
  try {
    const users = await fetch(`${baseURL}/user/get-all-users?q={}&page=1&size=10`,config);
    const usersData = await users.json();
    return {
      props: {
        users:usersData.data.users,
        totalUsers: usersData.data.totalUsers
      },
      revalidate: 60
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        users:[],
        totalUsers: 0
      },
      revalidate: 60
    };
  }
}