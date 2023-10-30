import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import {Product} from '@shopify/hydrogen/storefront-api-types';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({product}: ProductCardProps) {
  const {price, compareAtPrice} = product.variants?.nodes[0] ?? undefined;
  const isDiscounted = compareAtPrice?.amount
    ? compareAtPrice?.amount > price?.amount
    : false;

  const imageData = product?.variants?.nodes[0]?.image ?? undefined;

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
          <div className={styles.imageWrapper}>
            {imageData && (
              <Image
                data={imageData}
                alt={product.title}
                srcSetOptions={srcSetOptions}
                className={styles.img}
              />
            )}
          </div>
          <div className={styles.textContainer}>
            <h3 className={styles.title}>{product.title}</h3>
            <div>
              <span className={styles.cost}>
                <Money withoutTrailingZeros data={price} />
                {compareAtPrice && (
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
