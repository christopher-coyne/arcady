import styles from './Card.module.css';
import {HydroLink} from '../Link/Link';
export const Card = ({title, description, link}: any) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <HydroLink to={link.destination} title={title} />
    </div>
  );
};
