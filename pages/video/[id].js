import { useRouter } from "next/router";
import Modal from "react-modal";

import styles from "@/styles/Video.module.css";

Modal.setAppElement("#__next");

const Video = () => {
  const router = useRouter();
  const { id } = router.query;

  const handleOnClose = () => {
    router.back();
  };

  const video = {
    title: "Ted Lasso",
    publishTime: "2023-05-04",
    description:
      "Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description Ted Lasso long long long long long long description",
    channelTitle: "Apple TV",
    viewCount: 10000,
  };

  const { title, publishTime, description, channelTitle, viewCount } = video;

  return (
    <div className={styles.container}>
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
          frameborder="0"
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
