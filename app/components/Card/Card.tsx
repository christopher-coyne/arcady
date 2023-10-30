import styles from './Card.module.css';
import {HydroLink} from '../Link/Link';

type CardProps = {
  title: string;
  description: string;
  link: {destination: string; title: string};
};
export const Card = ({title, description, link}: CardProps) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <HydroLink to={link.destination} title={title} />
    </div>
  );
};
