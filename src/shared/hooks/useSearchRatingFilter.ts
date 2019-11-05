import { useSearchParams } from "src/shared/hooks/useSearchParams";

export const useSearchRatingFilter = () => {
  const { searchRatingFilter, setSearchRatingFilter } = useSearchParams();

  return {
    value: searchRatingFilter || [],
    onChange: setSearchRatingFilter,
  };
};
