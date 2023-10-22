import React, {ReactNode} from 'react';

type StackProps = {
  orient: 'v' | 'h';
  gap?: string;
  children: React.ReactNode;
};

export const Stack = ({orient, gap, children}: StackProps) => {
  const direction: 'column' | 'row' = orient === 'v' ? 'column' : 'row';
  const flexGap = gap || '0px';

  const style = {
    display: 'flex',
    gap: flexGap,
    flexDirection: direction,
    width: '100%',
    border: '2px solid green',
  };

  return (
    <div style={style}>
      {React.Children.map(children, (child) => {
        return <>{child}</>;
      })}
    </div>
  );
};
