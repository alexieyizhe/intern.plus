import { useMemo } from "react";

import { useSearchParams } from "src/shared/hooks/useSearchParams";
import { SearchType } from "src/shared/constants/search";

export const useSearchType = () => {
  const { searchType, setSearchType } = useSearchParams();

  const typeOption = useMemo(
    () => ({
      value: searchType,
      onChange: (newVal?: SearchType) => setSearchType(newVal),
    }),
    [searchType, setSearchType]
  );

  return typeOption;
};
