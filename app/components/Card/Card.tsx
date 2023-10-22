import styles from './Card.module.css';
export const Card = ({title, description, link}: any) => {
  return (
    <div className={styles.card}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{link}</p>
    </div>
  );
};
