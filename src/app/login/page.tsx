"use client";

import useAuth from "@/hooks/useAuth";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import styles from "./login.module.css";
import { useRouter } from "next/navigation";

export default function Page() {
  const ctx = useAuth();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
  });

  const router = useRouter();

  async function handleAuth(userInfo: {
    username: string;
    email?: string;
    password: string;
  }) {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post<{
        username: string;
        email: string;
        token: string;
        firstName: string;
        lastName: string;
      }>("http://localhost:3001/user/login", {
        username: userInfo.username,
        password: userInfo.password,
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
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            value={userInfo.username}
            onChange={(e) =>
              setUserInfo((prev) => {
                return { ...prev, username: e.target.value };
              })
            }
            type="text"
            id="username"
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            value={userInfo.password}
            onChange={(e) =>
              setUserInfo((prev) => {
                return { ...prev, password: e.target.value };
              })
            }
            type="password"
            id="password"
          />
        </div>
        <div className={styles.help}>
          <Link href="/forgot">Forgot Password?</Link>
          <Link href="/help">Help</Link>
          <p className={styles.signup}>
            Dont Have an account? <Link href="/signup">Sign Up</Link>
          </p>
        </div>
        <button
          onClick={async (event) => {
            event.preventDefault();
            await handleAuth(userInfo);
          }}
        >
          Log In
        </button>
        {!loading && !error && <p></p>}
        {loading && <p key={"loading"}>Loading...</p>}
        {error && <p key={error}>{error}</p>}
      </form>
    </main>
  );
}
