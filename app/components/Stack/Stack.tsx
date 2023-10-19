import React, {ReactNode} from 'react';

type StackProps = {
  orient: 'v' | 'h';
  gap?: string;
  children: React.ReactNode;
};

export const Stack = ({orient, gap, children}: StackProps) => {
  const direction: 'column' | 'row' = orient === 'v' ? 'column' : 'row';
  const flexGap = gap || '0px';

  const style = {display: 'flex', gap: flexGap, flexDirection: direction};

  return (
    <div style={style}>
      {React.Children.map(children, (child) => {
        return <div>{child}</div>;
      })}
    </div>
  );
};
