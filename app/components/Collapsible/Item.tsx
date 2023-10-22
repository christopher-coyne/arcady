import styles from './Collapsible.module.css';

export const Item = ({title, children, isOpen, setOpen}: any) => {
  const handleClick = (title: string) => {
    if (isOpen) {
      setOpen('');
    } else {
      setOpen(title);
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer} onClick={() => handleClick(title)}>
        <h3 className={styles.title}>{title}</h3>
      </div>
      {isOpen && <div className={styles.contentContainer}>{children}</div>}
    </div>
  );
};
