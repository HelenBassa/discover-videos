import { useRouter } from "next/router";
import Modal from "react-modal";

import { getYoutubeVideoById } from "@/lib/videos";

import NavBar from "@/components/navbar/navbar";

import styles from "@/styles/Video.module.css";

Modal.setAppElement("#__next");

export async function getStaticProps(context) {
  const id = context.params.id;

  const videoArray = await getYoutubeVideoById(id);

  return {
    props: {
      video: videoArray.length ? videoArray[0] : {},
    },
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const listOfVideos = ["mYfJxlgR2jw", "4zH5iYM4wJo", "KCPEHsAViiQ"];

  const paths = listOfVideos.map((id) => ({
    params: { id },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}

const Video = ({ video }) => {
  const router = useRouter();
  const { id } = router.query;

  const handleOnClose = () => {
    router.back();
  };

  const {
    title,
    publishTime,
    description,
    channelTitle,
    viewCount = 0,
  } = video;

  return (
    <div className={styles.container}>
      <NavBar />
      <Modal
        isOpen={true}
        contentLabel="Watch the video"
        onRequestClose={handleOnClose}
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <iframe
          className={styles.videoPlayer}
          id="ytplayer"
          type="text/html"
          width="640"
          height="360"
          src={`https://www.youtube.com/embed/${id}?autoplay=1&origin=http://example.com&controls=0&rel=1`}
          frameBorder="0"
        ></iframe>
        <div className={styles.modalBody}>
          <div className={styles.modalBodyContent}>
            <div className={styles.col1}>
              <p className={styles.publishTime}>{publishTime}</p>
              <p className={styles.title}>{title}</p>
              <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.col2}>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.infoKey}>Cast: </span>
                <span className={styles.info}>{channelTitle}</span>
              </p>
              <p className={`${styles.subText} ${styles.subTextWrapper}`}>
                <span className={styles.infoKey}>View Count: </span>
                <span className={styles.info}>{viewCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
