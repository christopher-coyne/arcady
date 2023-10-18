import styles from './styles.module.css';

export const ProductGrid = ({products}: any) => {
  return (
    <ul className={styles.productGrid}>
      {products.map((product: any) => (
        <li className={styles.product}>{product.title}</li>
      ))}
    </ul>
  );
};
