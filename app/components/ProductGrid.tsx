import {Pagination} from '@shopify/hydrogen';
import ProductCard from './ProductCard/ProductCard';

export default function ProductGrid({collection}: any) {
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
