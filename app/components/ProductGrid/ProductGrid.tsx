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

export default function ProductGridTest({collection}: any) {
  return (
    <section>
      <Pagination connection={collection.products}>
        {({nodes, NextLink, PreviousLink, isLoading}) => (
          <>
            <div>
              <PreviousLink>
                {isLoading ? 'Loading...' : 'Load previous products'}
              </PreviousLink>
            </div>
            <div>
              {nodes.map((product: any) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
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
