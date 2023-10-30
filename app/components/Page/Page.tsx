import styles from './page.module.css';

type PageProps = {
  children: React.ReactNode;
};

export const Page = ({children}: PageProps) => {
  return <div className={styles.container}>{children}</div>;
};
