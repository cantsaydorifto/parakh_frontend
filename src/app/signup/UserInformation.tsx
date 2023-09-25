"use client";

import { type Dispatch, type SetStateAction, useState } from "react";
import styles from "./signup.module.css";

export default function UserInformation({
  userInfo,
  setUserInfo,
  handleAuth,
}: {
  userInfo: {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  setUserInfo: Dispatch<
    SetStateAction<{
      username: string;
      password: string;
      email: string;
      firstName: string;
      lastName: string;
    }>
  >;
  handleAuth: (userInfo: {
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => Promise<void>;
}) {
  const [cursor, setCursor] = useState(1);
  return (
    <div key={cursor} className={styles.formContent}>
      {cursor === 1 ? (
        <>
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
            <label htmlFor="email">Email</label>
            <input
              value={userInfo.email}
              onChange={(e) =>
                setUserInfo((prev) => {
                  return { ...prev, email: e.target.value };
                })
              }
              type="text"
              id="email"
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
        </>
      ) : (
        <>
          <div className={styles.inputContainer}>
            <label htmlFor="firstName">First Name</label>
            <input
              value={userInfo.firstName}
              onChange={(e) =>
                setUserInfo((prev) => {
                  return { ...prev, firstName: e.target.value };
                })
              }
              type="text"
              id="firstName"
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="lastName">Last Name</label>
            <input
              value={userInfo.lastName}
              onChange={(e) =>
                setUserInfo((prev) => {
                  return { ...prev, lastName: e.target.value };
                })
              }
              type="text"
              id="lastName"
            />
          </div>
        </>
      )}
      {cursor === 2 && (
        <button
          onClick={async (event) => {
            event.preventDefault();
            await handleAuth(userInfo);
          }}
        >
          Sign Up
        </button>
      )}
      <div className={styles.nextContainer}>
        {cursor === 1 ? (
          <button
            className={styles.nextBtn}
            onClick={(ev) => {
              ev.preventDefault();
              setCursor((prev) => prev + 1);
            }}
          >
            Next
          </button>
        ) : (
          <button
            className={styles.nextBtn}
            onClick={(ev) => {
              ev.preventDefault();
              setCursor((prev) => prev - 1);
            }}
          >
            Previous
          </button>
        )}
      </div>
    </div>
  );
}
