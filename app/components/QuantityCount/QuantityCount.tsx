import styles from './QuantityCount.module.css';
import {Dispatch, SetStateAction} from 'react';

type QuantityCountProps = {
  setQuantity: Dispatch<SetStateAction<number>>;
  quantity: number;
};

export const QuantityCount = ({setQuantity, quantity}: QuantityCountProps) => {
  return (
    <div>
      <div className={styles.counter}>
        <button
          onClick={() =>
            setQuantity((prev: number) => (prev <= 1 ? prev : prev - 1))
          }
        >
          -
        </button>
        <span className={styles.number}>{quantity}</span>
        <button onClick={() => setQuantity((prev: number) => prev + 1)}>
          +
        </button>
      </div>
    </div>
  );
};
