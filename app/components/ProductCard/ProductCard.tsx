import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import styles from './ProductCard.module.css';

export default function ProductCard({product}: any) {
  const {price, compareAtPrice} = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;

  const srcSetOptions = {
    intervals: 5,
    startingWidth: 320,
    incrementSize: 160,
    placeholderWidth: 32,
  };

  return (
    <Link to={`/products/${product.handle}`} className={styles.cardContainer}>
      <div>
        <div>
          {isDiscounted && <label>Sale</label>}
          <Image
            data={product.variants.nodes[0].image}
            alt={product.title}
            srcSetOptions={srcSetOptions}
            className={styles.img}
          />
          <div>
            <h3 className={styles.title}>{product.title}</h3>
            <div>
              <span className={styles.cost}>
                <Money withoutTrailingZeros data={price} />
                {isDiscounted && (
                  <Money withoutTrailingZeros data={compareAtPrice} />
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
