import {Link} from '@remix-run/react';
import styles from './Link.module.css';

export const HydroLink = ({link, title}: any) => {
  return (
    <Link to={link} className={styles.linkButton}>
      {title}
    </Link>
  );
};
