"use client";

import useAuth from "@/hooks/useAuth";
import styles from "./dashboard.module.css";
import Navbar from "@/components/Navbar/Navbar";

export default function Page() {
  const {
    auth: { user },
  } = useAuth();

  if (!user)
    return (
      <main className={styles.main}>
        <Navbar />
        <h1>Not Logged In</h1>
      </main>
    );

  return (
    <main className={styles.main}>
      <Navbar />
      <h1>
        Hello {user.firstName} {user.lastName}
      </h1>
      <h2>Tests</h2>
      <div className={styles.test}>
        <p>Sample Test</p>
        <p>Duration : 10min</p>
        <p>Questions : 10</p>
      </div>
    </main>
  );
}
