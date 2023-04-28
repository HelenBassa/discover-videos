import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner/banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Netflix app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Netflix</h1>
        {/* <NavBar></NavBar> */}
        <Banner
          title="Ted Lasso"
          subTitle="American college football coach Ted Lasso heads to London to manage AFC Richmond, a struggling English Premier League football team."
          imgUrl="/static/ted-lasso.webp"
        />
        {/* <Card></Card> */}
      </main>
    </>
  );
}
