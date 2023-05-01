import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import styles from "@/styles/Login.module.css";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [userMSG, setUserMsg] = useState("");

  const handleOnChangeEmail = (e) => {
    setUserMsg("");
    const email = e.target.value;
    setEmail(email);
  };

  const handleLoginWithEmail = (e) => {
    e.preventDefault();

    if (!email) {
      setUserMsg("Enter a valid email address!");
    } else {
      if (email === "hb@gmail.com") {
        router.push("/");
      } else {
        setUserMsg("Something went wrong logging in!");
      }
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
        <meta
          name="description"
          content="Watch Netflix movies &amp; TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <a className={styles.logoLink} href="/">
            <div className={styles.logoWrapper}>
              <Image
                src={"/static/netflix-logo.svg"}
                alt="Netflix"
                width={128}
                height={34}
              />
            </div>
          </a>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.sighinHeader}>Sign In</h1>
          <input
            type="email"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMSG}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;
