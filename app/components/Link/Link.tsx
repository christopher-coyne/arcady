import {Link} from '@remix-run/react';
import styles from './Link.module.css';

export const LinkButton = ({link, title}: any) => {
  return (
    <Link to={link} className={styles.linkButton}>
      {title}
    </Link>
  );
};

export const HydroLink = ({link, title}: any) => {
  return (
    <Link to={link} className={styles.link}>
      {title}
    </Link>
  );
};
