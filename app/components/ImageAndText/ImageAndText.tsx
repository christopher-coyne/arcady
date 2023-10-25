import styles from './styles.module.css';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {LinkButton} from '../Link/Link';

export const ImageAndText = ({
  title,
  description,
  link,
  image,
  srcSetOptions,
}: any) => {
  const replacementImage = {...image};
  console.log('replacement image ', replacementImage);
  if (!replacementImage.url && replacementImage.src) {
    replacementImage.url = replacementImage.src;
  }
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <LinkButton link={link} title={'Find Your Board'} />
      </div>
      <div className={styles.img}>
        <Image data={replacementImage} srcSetOptions={srcSetOptions} />
      </div>
    </div>
  );
};
