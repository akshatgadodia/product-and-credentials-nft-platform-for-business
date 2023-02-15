import React from "react";
import DefaultLayout from "@/app/components/layouts/DefaultLayout";
import baseURL from "@/app/constants/baseURL";
import UserSinglePage from '@/app/components/templates/userSinglePage/UserSinglePage';

const UserSingle = (props) => {
  return (
    <DefaultLayout>
      <UserSinglePage userData={props.userData}/>
    </DefaultLayout>
  );
};

export default UserSingle;

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          userId: "63e4da7da3fed4adf7ba15ab"
        }
      }
    ],
    fallback: "blocking" // false or 'blocking'
  };
}

export async function getStaticProps({ params }) {
  const userId = params.userId;
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
    const user = await fetch(
      `${baseURL}/user/get-user?userId=${userId}`,
      config
    );
    const userData = await user.json();
    return {
      props: {
        userData: userData.data.user
      },
      revalidate: 60
    }
  } catch (err) {
    console.log(err);
    return {
      props: {
        userData: null,
      },
      revalidate: 60
    };
  }
}