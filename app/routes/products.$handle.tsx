import {LoaderArgs, json} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {Image, Money, ShopPayButton} from '@shopify/hydrogen-react';
import {ProductOptions} from '~/components/ProductOptions/ProductOptions';
import {useState} from 'react';
import {assertNullableType} from 'graphql';
import styles from '../styles/product.module.css';

import {QuantityCount} from '../components/QuantityCount/QuantityCount';

export async function loader({params, context, request}: any) {
  console.log('LOADER RUNNING... ');
  const {handle} = params;
  const searchParams = new URL(request.url).searchParams;
  const selectedOptions: any = [];

  // set selected options from the query string
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle,
      selectedOptions,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // Set a default variant so you always have an "orderable" product selected
  const selectedVariant =
    product.selectedVariant ?? product?.variants?.nodes[0];

  return json({
    product,
    selectedVariant,
    shop,
  });
}

export default function ProductHandle() {
  const {shop, product, selectedVariant} = useLoaderData();
  const [quantity, setQuantity] = useState(1);

  console.log('product ', product.options);

  return (
    <section className={styles.productContainer}>
      <div>
        <Image
          data={product.selectedVariant?.image || product.featuredImage}
          className={styles.img}
        />
      </div>
      <div className={styles.descriptionContainer}>
        <h1>{product.title}</h1>
        <Money
          withoutTrailingZeros
          data={selectedVariant.price}
          className="text-xl font-semibold mb-2"
        />
        <QuantityCount setQuantity={setQuantity} quantity={quantity} />
        <ProductOptions
          options={product.options}
          selectedVariant={selectedVariant}
        />
        {selectedVariant.availableForSale && (
          <ShopPayButton
            storeDomain={shop.primaryDomain.url}
            variantIds={[selectedVariant?.id]}
            width={'400px'}
          />
        )}
        <p>Selected Variant: {product.selectedVariant?.id}</p>
        <div dangerouslySetInnerHTML={{__html: product.descriptionHtml}}></div>
      </div>
    </section>
  );
}

const PRODUCT_QUERY = `#graphql
  query product($handle: String!, $selectedOptions: [SelectedOptionInput!]!) {
    shop {
      primaryDomain {
        url
      }
    }
    product(handle: $handle) {
      id
      title
      handle
      vendor
      description
      descriptionHtml
      featuredImage {
        id
        url
        altText
        width
        height
      }
      options {
        name,
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        id
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          id
          url
          altText
          width
          height
        }
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        sku
        title
        unitPrice {
          amount
          currencyCode
        }
        product {
          title
          handle
        }
      }
      variants(first: 1) {
        nodes {
          id
          title
          availableForSale
          price {
            currencyCode
            amount
          }
          compareAtPrice {
            currencyCode
            amount
          }
          selectedOptions {
            name
            value
          }
        }
      }
    }
  }
`;
