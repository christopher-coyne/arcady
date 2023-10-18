import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';

import type {
  Product,
  Collection,
} from '@shopify/hydrogen-react/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';

export function meta() {
  return [{title: 'Hydrogen'}, {description: 'Our Custom Store'}];
}

export async function loader({context}: LoaderArgs) {
  const collections = await context.storefront.query(
    PRODUCTS_IN_HYDROGEN_COLLECTION_QUERY,
  );
  // const featuredProducts = await context.storefront.query(PRODUCTS_QUERY);
  console.log('all collections ', collections.collections);
  // const hydrogenProducts = await context.storefront.query(PRODUCT_QUERY);
  return collections;
}

// [ 'Men', 'Women', 'Unisex', 'Tops', 'Bottoms', 'Accessories', 'Shoes' ]
export default function Index() {
  const {collections} = useLoaderData();
  console.log('collections ', collections);
  return (
    <section className="w-full gap-4">
      <h2>Collections</h2>
      <div>
        <ul>
          {collections.nodes.length &&
            collections.nodes[0].products.edges.map((product: any) => {
              return (
                <li key={product.node.id}>
                  <Link to={`/collections/${collections.nodes[0].handle}`}>
                    <div>
                      {product.node.image && (
                        <Image
                          alt={`Image of ${product.title}`}
                          data={product.node.image}
                          key={product.node.id}
                          sizes="(max-width: 32em) 100vw, 33vw"
                          crop="center"
                        />
                      )}
                      <h2>{product.node.title}</h2>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
    </section>
  );
}
const COLLECTIONS_QUERY = `#graphql
    query FeaturedCollections {
      collections(first: 1, query: "collection_type:smart") {
        nodes {
          id
          title
          handle
          image {
            altText
            width
            height
            url
          }
        }
      }
    }
  `;

const PRODUCTS_IN_HYDROGEN_COLLECTION_QUERY = `#graphql
  query ProductsInHydrogenCollection {
    collections(first: 1, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
        products(first: 4) {
          edges {
            node {
              id
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    altText
                    width
                    height
                    src
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
        }
      }
    }
  }
`;
