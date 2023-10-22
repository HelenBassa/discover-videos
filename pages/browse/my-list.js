import Head from "next/head";

import NavBar from "@/components/navbar/navbar";
import SectionCards from "@/components/card/section-cards";

import styles from "@/styles/MyList.module.css";

import useRedirectUser from "@/utils/redirectUser";

import { getFavouritedVideos } from "@/lib/videos";

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

  const myListVideos = await getFavouritedVideos(token, userId);

  return {
    props: {
      myListVideos,
    },
  };
}

export default function MyList({ myListVideos }) {
  return (
    <div>
      <Head>
        <title>My List</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />
        </div>
      </main>
    </div>
  );
}
