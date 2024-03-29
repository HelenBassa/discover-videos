import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import styles from "./card.module.css";

const defaultImg =
  "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1159&q=80";

const defaultSize = "medium";

const Card = ({
  imgUrl = defaultImg,
  size = defaultSize,
  id,
  shouldScale = true,
}) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.largeItem,
    medium: styles.mediumItem,
    small: styles.smallItem,
  };

  const handleOnError = () => {
    console.error("Error: imgUrl not found");
    setImgSrc(defaultImg);
  };

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={`${classMap[size]} ${styles.imgMotionWrapper}`}
        {...shouldHover}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt="card image"
          fill
          onError={handleOnError}
        />
      </motion.div>
    </div>
  );
};

export default Card;
