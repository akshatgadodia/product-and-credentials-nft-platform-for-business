import baseURL from "@/app/constants/baseURL";
import React from "react";

const Dashboard = () => {
  const login = async() => {
    console.log(`${baseURL}/support-user/login`)
    const data = await fetch(`${baseURL}/support-user/login`,{
      method:'post',
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify({
        email: "akshatgadodia@gmail.com",
        password: "qwerty"
      }),
      credentials: 'include',
    });
    console.log(data);
    console.log(await data.json());
  }
  return(
    <>
    <div style={{height:'100vh', border:"10px solid black"}}>HomePage</div>
    <button onClick={login}>CLICK ME</button>
    </>
  );
};

export default Dashboard;
