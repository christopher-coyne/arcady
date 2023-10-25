import styles from './Collapsible.module.css';

import React, {lazy, Suspense, useState} from 'react';
import {Checkbox} from '../Svgs/Checkbox';
import {DropdownArrow} from '../Svgs/DropdownArrow';

// const CheckBox = lazy(() => import('../Svgs/Checkbox'));
// const ComponentB = lazy(() => import('./ComponentB'));

export const Item = ({title, children, isOpen, setOpen, icon}: any) => {
  console.log('icon ', icon);

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

export const TestItem = ({title, children, Icon}: any) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer} onClick={handleClick}>
        <div className={styles.iconContainer}>
          {!!Icon && <Icon />}
          <h3 className={styles.title}>{title}</h3>
        </div>
        <DropdownArrow rotated={isOpen} />
      </div>
      {isOpen && <div className={styles.contentContainer}>{children}</div>}
    </div>
  );
};
