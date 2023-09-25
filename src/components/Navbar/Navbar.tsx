"use client";
import styles from "./navbar.module.css";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";

export default function Navbar() {
  const {
    auth: { user },
  } = useAuth();

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/" className={styles.logo}>
          <img src="/logo.png" alt="Parakh" />
        </Link>
        <ul>
          <li>Home</li>
          <li>Profile</li>
          <li>About us</li>
          <li>Contact</li>
          <li>Login</li>
        </ul>
      </nav>
    </>
  );
}
