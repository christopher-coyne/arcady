import {
  Link,
  useLocation,
  useSearchParams,
  useNavigation,
} from '@remix-run/react';

import styles from './ProductOptions.module.css';

export function ProductOptions({options, selectedVariant}: any) {
  const {pathname, search} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();

  console.log('navigation location ', navigation.state);

  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);

    if (!selectedVariant) {
      return defaultParams;
    }

    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }

    return defaultParams;
  })();

  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : paramsWithDefaults;

  return (
    <>
      {options.map((option: any) => {
        if (!option.values.length) {
          return;
        }

        // get the currently selected option value
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div key={option.name}>
            <h3>{option.name}</h3>

            <div>
              {option.values.map((value: any) => {
                const linkParams = new URLSearchParams(searchParams);
                const isSelected = currentOptionVal === value;
                linkParams.set(option.name, value);
                // return <div className={styles.productOption}>hello world </div>;
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${linkParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`${styles.productOption} ${
                      isSelected && styles.selected
                    }`}
                  >
                    {value}
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
