import styles from './styles.module.css';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';

export const ImageAndText = ({title, description, link, image}: any) => {
  const replacementImage = {...image};
  if (!replacementImage.url && replacementImage.src) {
    replacementImage.url = replacementImage.src;
  }
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2>{title}</h2>
        <p>{description}</p>
        <Link to={link}>Find Your Board</Link>
      </div>
      <Image data={replacementImage} />
    </div>
  );
};
