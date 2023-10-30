import {Link} from '@remix-run/react';
import styles from './Link.module.css';

type LinkProps = {
  link: string;
  title: string;
};

export const LinkButton = ({link, title}: LinkProps) => {
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
