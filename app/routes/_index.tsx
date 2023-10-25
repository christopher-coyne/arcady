import {useLoaderData, Link} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import styles from '../styles/index.module.css';
import {Stack} from '~/components/Stack/Stack';
import {HydroLink} from '~/components/Link/Link';
import {Item} from '~/components/Collapsible/Item';
import {Collapsible} from '~/components/Collapsible/Collapsible';
import {Checkbox} from '~/components/Svgs/Checkbox';
import {Page} from '~/components/Page/Page';

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
import {Leaf} from '~/components/Svgs/Leaf';
import {Lightning} from '~/components/Svgs/Lightning';
import {Fire} from '~/components/Svgs/Fire';
import {Star} from '~/components/Svgs/Star';

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

  const nathanImageObj = {
    altText: 'xyz',
    id: 'nathan',
    url: 'https://cdn.shopify.com/s/files/1/0557/9508/9496/files/nathan.webp?v=1698195926',
  };

  const srcSetOptions2 = {
    intervals: 5,
    startingWidth: 320,
    incrementSize: 160,
    placeholderWidth: 32,
  };

  let {collections, featuredCollection, featuredProduct} = useLoaderData();
  console.log('collections ', collections);

  return (
    <Page>
      <ImageAndText
        srcSetOptions={srcSetOptions}
        image={imageObj}
        link="/collections/men"
        description={heroDescription}
        title="FREEDOM TO ESCAPE"
      />
      <div className={styles.nathanContainer}>
        <Image data={nathanImageObj} />
        <div>placeholder</div>
      </div>
      <h2>Collections</h2>
      <div>
        {collections.nodes.length && (
          <ProductGridTest collection={collections.nodes[0].products} />
        )}
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
          link={{title: 'Shop Fins', destination: '/collections'}}
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
      <Stack orient="h" gap={'1.5rem'}>
        <div className={styles.stackChild}>
          <Image
            data={{
              url: 'https://cdn.shopify.com/s/files/1/0557/9508/9496/files/finscolored.webp?v=1697662297',
              altText: 'fins',
            }}
            srcSetOptions={srcSetOptions2}
          />
        </div>
        <div className={styles.stackChild}>
          <Collapsible>
            <Item Icon={Leaf} title={collapsibleBlurbs.leaf.title}>
              {collapsibleBlurbs.leaf.description}
            </Item>
            <Item Icon={Lightning} title={collapsibleBlurbs.lightning.title}>
              {collapsibleBlurbs.lightning.description}
            </Item>
            <Item Icon={Fire} title={collapsibleBlurbs.fire.title}>
              {collapsibleBlurbs.fire.description}
            </Item>
            <Item Icon={Star} title={collapsibleBlurbs.star.title}>
              {collapsibleBlurbs.star.description}
            </Item>
            <Item Icon={Checkbox} title={collapsibleBlurbs.checkbox.title}>
              {collapsibleBlurbs.checkbox.description}
            </Item>
          </Collapsible>
        </div>
      </Stack>
    </Page>
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
