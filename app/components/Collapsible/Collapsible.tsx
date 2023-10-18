import {Item} from './Item';
import {useState} from 'react';

export const Collapsible = ({content}: any) => {
  const [open, setOpen] = useState('');
  return (
    <div>
      {content.map((c: any) => (
        <Item title={c.title} isOpen={open === c.title} setOpen={setOpen}>
          {c.description}
        </Item>
      ))}
    </div>
  );
};
