import {Item} from './Item';
import {useState} from 'react';
import styles from './Collapsible.module.css';

export const Collapsible = ({content}: any) => {
  const [open, setOpen] = useState('');
  return <div className={styles.collapsibleContainer}>hello world</div>;
  return (
    <div className={styles.collapsibleContainer}>
      {content.map((c: any) => (
        <Item
          key={c.title}
          title={c.title}
          isOpen={open === c.title}
          setOpen={setOpen}
        >
          {c.description}
        </Item>
      ))}
    </div>
  );
};
