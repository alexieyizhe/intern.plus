import { useSearchParams } from "src/shared/hooks/useSearchParams";

export const useSearchSalaryFilter = () => {
  const { searchSalaryFilter, setSearchSalaryFilter } = useSearchParams();

  return {
    value: searchSalaryFilter || [],
    onChange: setSearchSalaryFilter,
  };
};
