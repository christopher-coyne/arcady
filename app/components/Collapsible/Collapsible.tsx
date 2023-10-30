import styles from './Collapsible.module.css';
import React from 'react';

type CollapsibleProps = {
  children: React.ReactNode;
};

export const Collapsible = ({children}: CollapsibleProps) => {
  return <div className={styles.collapsibleContainer}>{children}</div>;
};
