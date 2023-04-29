import Head from "next/head";
import styles from "@/styles/Home.module.css";

import Banner from "@/components/banner/banner";
import NavBar from "@/components/navbar/navbar";

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
        <NavBar username="Helen Bassa" />
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
