export const Item = ({title, children, isOpen, setOpen}: any) => {
  return (
    <div>
      <h3 onClick={() => setOpen(title)}>{title}</h3>
      {isOpen && children}
    </div>
  );
};
