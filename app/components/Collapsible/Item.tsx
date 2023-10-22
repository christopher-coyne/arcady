import styles from './Collapsible.module.css';

export const Item = ({title, children, isOpen, setOpen}: any) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <h3 onClick={() => setOpen(title)} className={styles.title}>
          {title}
        </h3>
      </div>
      {isOpen && children}
    </div>
  );
};
