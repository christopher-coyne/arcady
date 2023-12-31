import {
  Link,
  useLocation,
  useSearchParams,
  useNavigation,
} from '@remix-run/react';

export function ProductOptions({options}: any) {
  console.log('product options: ', options);
  const {pathname, search} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : currentSearchParams;

  return (
    <div className="grid gap-4 mb-6">
      {options.map((option: any) => {
        if (!option.values.length) {
          return;
        }

        // get the currently selected option value
        const currentOptionVal = searchParams.get(option.name);
        return (
          <div
            key={option.name}
            className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
          >
            <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
              {option.name}
            </h3>

            <div className="flex flex-wrap items-baseline gap-4">
              {option.values.map((value: any) => {
                const linkParams = new URLSearchParams(searchParams);
                const isSelected = currentOptionVal === value;
                linkParams.set(option.name, value);
                return (
                  <Link
                    key={value}
                    to={`${pathname}?${linkParams.toString()}`}
                    preventScrollReset
                    replace
                    className={`${
                      isSelected ? 'border-gray-500' : 'border-neutral-50'
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
    </div>
  );
}
