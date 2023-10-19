import styles from './styles.module.css';
import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import {HydroLink} from '../Link/Link';

export const ImageAndText = ({title, description, link, image}: any) => {
  const replacementImage = {...image};
  if (!replacementImage.url && replacementImage.src) {
    replacementImage.url = replacementImage.src;
  }
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <HydroLink link={link} title={'Find Your Board'} />
      </div>
      <Image data={replacementImage} />
    </div>
  );
};
