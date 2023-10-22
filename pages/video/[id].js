import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Modal from "react-modal";

import { getYoutubeVideoById } from "@/lib/videos";

import NavBar from "@/components/navbar/navbar";
import Like from "@/components/icons/like-icon";
import DisLike from "@/components/icons/dislike-icon";

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

  const [toggleLike, setToggleLike] = useState(false);
  const [toggleDislike, setToggleDislike] = useState(false);

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

  useEffect(() => {
    async function getFavourited() {
      const response = await fetch(`/api/stats?videoId=${id}`, {
        method: "GET",
      });
      const data = await response.json();

      if (data.findVideo.length > 0) {
        const favourited = data.findVideo[0].favourited;

        if (favourited === 1) {
          setToggleLike(true);
        } else if (favourited === 0) {
          setToggleDislike(true);
        }
      }
    }
    getFavourited();
  }, []);

  const runRatingService = async (favourited) => {
    return await fetch("/api/stats", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId: id,
        favourited,
      }),
    });
  };

  const handleToggleLike = async () => {
    const value = !toggleLike;
    setToggleLike(value);
    setToggleDislike(toggleLike);

    const favourited = value ? 1 : 0;

    const response = await runRatingService(favourited);
  };

  const handleToggleDislike = async () => {
    const value = !toggleDislike;
    setToggleDislike(value);
    setToggleLike(toggleDislike);

    const favourited = value ? 0 : 1;

    const response = await runRatingService(favourited);
  };
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

        <div className={styles.likeDislikeBtnWrapper}>
          <div className={styles.likeBtnWrapper}>
            <button onClick={handleToggleLike}>
              <div className={styles.btnWrapper}>
                <Like selected={toggleLike} />
              </div>
            </button>
          </div>
          <button onClick={handleToggleDislike}>
            <div className={styles.btnWrapper}>
              <DisLike selected={toggleDislike} />
            </div>
          </button>
        </div>
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
