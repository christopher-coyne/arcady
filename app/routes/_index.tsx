import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import {Collapsible} from '~/components/Collapsible/Collapsible';
import styles from '../styles/index.module.css';
import {Stack} from '~/components/Stack/Stack';
import {HydroLink} from '~/components/Link/Link';
import {Item} from '~/components/Collapsible/Item';

import type {
  Product,
  Collection,
} from '@shopify/hydrogen-react/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';
import {ImageAndText} from '~/components/ImageAndText/ImageAndText';

import {
  heroDescription,
  featuredProductDescription,
  collapsibleBlurbs,
  finCardDescription,
} from '~/text/home';
import {Card} from '~/components/Card/Card';
import ProductGrid from '~/components/ProductGrid';
import ProductGridTest from '~/components/ProductGrid/ProductGrid';

export function meta() {
  return [{title: 'Hydrogen'}, {description: 'Our Custom Store'}];
}

export async function loader({context}: LoaderArgs) {
  const collections = await context.storefront.query(
    PRODUCTS_IN_HYDROGEN_COLLECTION_QUERY,
  );

  // return a featured collection
  const allCollections = await context.storefront.query(COLLECTIONS_QUERY);

  // return a featured collection
  const featuredCollection = await context.storefront.query(
    FEATURED_COLLECTIONS_QUERY,
  );

  // return a featured product
  const featuredProduct = await context.storefront.query(
    FEATURED_PRODUCT_QUERY,
  );

  // const hydrogenProducts = await context.storefront.query(PRODUCT_QUERY);
  return {
    collections: collections?.collections,
    allCollections,
    featuredCollection,
    featuredProduct,
  };
}

// [ 'Men', 'Women', 'Unisex', 'Tops', 'Bottoms', 'Accessories', 'Shoes' ]
export default function Index() {
  const srcSetOptions = {
    intervals: 5,
    startingWidth: 320,
    incrementSize: 160,
    placeholderWidth: 32,
  };

  const imageObj = {
    width: 200,
    altText: 'xyz',
    id: 'header-surf',
    url: 'https://cdn.shopify.com/s/files/1/0557/9508/9496/files/surfer_guy.jpg?v=1697649524',
  };

  const srcSetOptions2 = {
    intervals: 5,
    startingWidth: 320,
    incrementSize: 1,
    placeholderWidth: 32,
  };

  let {collections, featuredCollection, featuredProduct} = useLoaderData();
  console.log('collections ', collections);

  return (
    <section>
      <ImageAndText
        srcSetOptions={srcSetOptions}
        image={imageObj}
        link="/collections/men"
        description={heroDescription}
        title="Freedom To Escape"
      />
      <h2>Collections</h2>
      <div>
        {collections.nodes.length && (
          <ProductGridTest collection={collections.nodes[0].products} />
        )}
        <ul>
          {collections.nodes.length &&
            collections.nodes[0].products.nodes.map((product: any) => {
              console.log('data info ', product.images.edges[0].node);
              let imageObj = null;
              if (product.images.edges[0]) {
                imageObj = {
                  ...product.images.edges[0].node,
                  url: product.images.edges[0].node.src,
                };
              }

              return (
                <li key={product.id}>
                  <Link to={`/collections/${collections.nodes[0].handle}`}>
                    <div>
                      {imageObj && (
                        <Image
                          alt={`Image of ${product.title}`}
                          data={imageObj}
                          key={imageObj.id}
                          sizes="(max-width: 32em) 100vw, 33vw"
                          crop="center"
                        />
                      )}
                      <h2>{product.title}</h2>
                    </div>
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>
      {featuredProduct?.node && (
        <div id="featuredProduct">
          <ImageAndText
            image={featuredProduct.node.images.edges[0].node}
            title={featuredProduct.node.handle}
            link="/collections/men"
            description={featuredProductDescription}
          />
          <h2>{featuredProduct.node.handle}</h2>
        </div>
      )}
      <div className={styles.multimedia}>
        <Card
          description={finCardDescription}
          title="SWAP FINS ON THE FLY"
          link="Shop Fins"
        />
        <div>
          <Image
            data={{
              url: 'https://cdn.shopify.com/s/files/1/0557/9508/9496/files/IMG_7145_1200x_8451a1d3-1698-4245-852a-42136f93a331.webp?v=1697677078',
            }}
          />
        </div>
        <div>
          <Image
            data={{
              url: 'https://cdn.shopify.com/s/files/1/0557/9508/9496/files/FCS-II-CI-Upright_White_002_1200x_8b6cbd61-36f5-4f4b-8e8f-e8ddc230eb89.webp?v=1697677070',
            }}
          />
        </div>
      </div>
      <Stack orient="h">
        <div>
          <Image
            data={{
              url: 'https://cdn.shopify.com/s/files/1/0557/9508/9496/files/finscolored.webp?v=1697662297',
              altText: 'fins',
              width: 500,
            }}
            srcSetOptions={srcSetOptions2}
          />
        </div>
        <Collapsible content={collapsibleBlurbs} />
      </Stack>
    </section>
  );
}
const COLLECTIONS_QUERY = `#graphql
    query FeaturedCollections {
      collections(first: 5, query: "collection_type:smart") {
        nodes {
          id
        }
      }
    }
  `;

// gid://shopify/Collection/429493780502
const FEATURED_COLLECTIONS_QUERY = `#graphql
    query FeaturedCollection {
        node(id: "gid://shopify/Collection/429493780502") {
          ... on Collection {
          title
          handle
          description
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

const FEATURED_PRODUCT_QUERY = `#graphql
query FeaturedProduct {
  node(id: "gid://shopify/Product/7982902771734") {
    ... on Product {
      id
      title
      description
      handle
      productType
      images(first: 1) {
        edges {
          node {
            altText
            width
            height
            src
            id
          }
        }
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
            nodes {
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
                    id
                  }
                }
              }
              variants(first: 1) {
                nodes {
                  id
                  image {
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
`;
