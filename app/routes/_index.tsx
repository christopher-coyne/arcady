import {useLoaderData, Link} from '@remix-run/react';

import type {
  Product,
  Collection,
} from '@shopify/hydrogen-react/storefront-api-types';
import {LoaderArgs} from '@shopify/remix-oxygen';

export function meta() {
  return [{title: 'Hydrogen'}, {description: 'Our Custom Store'}];
}

export async function loader({context}: LoaderArgs) {
  const collections = await context.storefront.query(COLLECTIONS_QUERY);
  return {collections};
}

export default function Index() {
  const {collections} = useLoaderData();
  return (
    <section className="w-full gap-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 sm:grid-cols-3">
        {collections.nodes.map((collection: Collection) => {
          return (
            <Link to={`/collections/${collection.handle}`} key={collection.id}>
              {collection.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 3, query: "collection_type:smart") {
      nodes {
        id
        title
        handle
      }
    }
  }
`;
