import styles from './styles.module.css';
import {Pagination} from '@shopify/hydrogen';
import ProductCard from '../ProductCard/ProductCard';

export const ProductGrid = ({products}: any) => {
  return (
    <ul className={styles.productGrid}>
      {products.map((product: any) => (
        <li className={styles.product}>{product.title}</li>
      ))}
    </ul>
  );
};

const ProductGridInterior = ({nodes}: any) => {
  console.log('NODES 2', nodes);
  if (nodes?.length) {
    return (
      <div className={styles.productGrid}>
        {nodes.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
};

export default function ProductGridTest({collection}: any) {
  // if no pagination - simply return grid
  const isPaginated = collection?.products?.pageInfo;
  if (!isPaginated) {
    const nodes = collection;
    console.log('NODES ', nodes);
    return (
      <div>
        <ProductGridInterior nodes={nodes?.nodes} />
      </div>
    );
  }
  return (
    <section className={styles.productGridContainer}>
      <Pagination connection={collection.products}>
        {({nodes, NextLink, PreviousLink, isLoading}) => (
          <>
            <div>
              <PreviousLink className="link">
                {isLoading ? 'Loading...' : 'Load previous products'}
              </PreviousLink>
            </div>
            <ProductGridInterior nodes={nodes} />
            <div>
              <NextLink>
                {isLoading ? 'Loading...' : 'Load more products'}
              </NextLink>
            </div>
          </>
        )}
      </Pagination>
    </section>
  );
}
