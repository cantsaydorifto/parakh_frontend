"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import styles from "./signup.module.css";
import UserInformation from "./UserInformation";
import { useRouter } from "next/navigation";

export default function Page() {
  const ctx = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const router = useRouter();

  async function handleAuth(userInfo: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{
        username: string;
        id: number;
        email: string;
        token: string;
        firstName: string;
        lastName: string;
      }>("http://localhost:3001/user/signup", {
        username: userInfo.username,
        password: userInfo.password,
        email: userInfo.email,
        lastName: userInfo.lastName,
        firstName: userInfo.firstName,
      });
      console.log(res.data);
      ctx.setAuth({ isAuthenticated: true, user: res.data });
      setError(null);
      setLoading(false);
      router.push("/dashboard");
    } catch (err: any) {
      setLoading(false);
      console.log(err);
      setError(err.response.data.message);
    }
  }

  return (
    <main className={styles.main}>
      <form>
        <img className={styles.logo} src="/logo.png" alt="" />
        <UserInformation
          userInfo={userInfo}
          setUserInfo={setUserInfo}
          handleAuth={handleAuth}
        />
        {!loading && !error && <p></p>}
        {loading && <p key={"loading"}>Loading...</p>}
        {error && <p key={error}>{error}</p>}
      </form>
    </main>
  );
}
