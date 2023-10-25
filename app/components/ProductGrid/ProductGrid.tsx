import styles from './styles.module.css';
import {Pagination} from '@shopify/hydrogen';
import ProductCard from '../ProductCard/ProductCard';
import {Dropdown} from '../Dropdown/Dropdown';
import {useState} from 'react';

const ProductGridInterior = ({nodes, sortBy}: any) => {
  console.log('NODES 2', nodes);
  let sortedNodes = nodes;
  if (sortBy) {
    if (sortBy === 'alpha') {
      sortedNodes = nodes.sort((a: any, b: any) =>
        a.title.localeCompare(b.title),
      );
    } else if (sortBy === 'lowhigh') {
      sortedNodes = nodes.sort(
        (a: any, b: any) =>
          a.variants.nodes[0].price.amount - b.variants.nodes[0].price.amount,
      );
    } else if (sortBy === 'highlow') {
      sortedNodes = nodes.sort(
        (a: any, b: any) =>
          b.variants.nodes[0].price.amount - a.variants.nodes[0].price.amount,
      );
    }
  }
  if (nodes?.length) {
    return (
      <div className={styles.productGrid}>
        {sortedNodes.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    );
  }
};

export default function ProductGrid({collection}: any) {
  // if no pagination - simply return grid
  const isPaginated = collection?.products?.pageInfo;
  const [selectedOption, setSelectedOption] = useState('');
  console.log('collection ', collection);
  if (!isPaginated) {
    const nodes = collection;
    console.log('NODES ', nodes);
    return (
      <div>
        <ProductGridInterior nodes={nodes?.nodes} />
      </div>
    );
  }

  const handleChange = (selectedOption: any) => {
    setSelectedOption(selectedOption.value);
  };
  const dropdownOptions = [
    {value: 'alpha', label: 'Alphabetically'},
    {value: 'lowhigh', label: 'Price: Low to High'},
    {value: 'highlow', label: 'Price: High to Low'},
  ];
  return (
    <Pagination connection={collection.products}>
      {({nodes, NextLink, PreviousLink, isLoading}) => (
        <section className={styles.productGridContainer}>
          <div className={styles.headerContainer}>
            <Dropdown options={dropdownOptions} handleChange={handleChange} />
            {collection?.products?.nodes.length && (
              <p>{nodes.length} Products</p>
            )}
          </div>
          <div>
            <PreviousLink className="link">
              {isLoading ? 'Loading...' : 'Load previous products'}
            </PreviousLink>
          </div>
          <ProductGridInterior nodes={nodes} sortBy={selectedOption} />
          <div>
            <NextLink>
              {isLoading ? 'Loading...' : 'Load more products'}
            </NextLink>
          </div>
        </section>
      )}
    </Pagination>
  );
}
