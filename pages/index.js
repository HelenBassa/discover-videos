import Head from "next/head";

import styles from "@/styles/Home.module.css";

import NavBar from "@/components/navbar/navbar";
import Banner from "@/components/banner/banner";
import SectionCards from "@/components/card/section-cards";

import {
  getWatchItAgainVideos,
  getVideos,
  getPopularVideos,
} from "@/lib/videos";

import useRedirectUser from "@/utils/redirectUser";

export async function getServerSideProps(context) {
  const { token, userId } = await useRedirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const watchItAgainVideos = await getWatchItAgainVideos(token, userId);
  const disneyVideos = await getVideos("disney");
  const travelVideos = await getVideos("travel");
  const productivityVideos = await getVideos("productivity");
  const popularVideos = await getPopularVideos("PL");

  return {
    props: {
      watchItAgainVideos,
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
    },
  };
}

export default function Home({
  watchItAgainVideos,
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
}) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta
          name="description"
          content="Watch Netflix movies &amp; TV shows online or stream right to your smart TV, game console, PC, Mac, mobile, tablet and more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <NavBar />
        <Banner
          id="IR9yjn7Lkdg"
          title="Ted Lasso"
          subTitle="American college football coach Ted Lasso heads to London to manage AFC Richmond, a struggling English Premier League football team."
          imgUrl="/static/ted-lasso.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="Watch it again"
            videos={watchItAgainVideos}
            size="small"
          />
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </main>
    </>
  );
}
