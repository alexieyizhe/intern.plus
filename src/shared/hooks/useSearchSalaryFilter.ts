import { useSearchParams } from "src/shared/hooks/useSearchParams";

export const useSearchSalaryFilter = () => {
  const { salaryFilter, setSalaryFilter } = useSearchParams();

  return {
    value: salaryFilter || [],
    onChange: setSalaryFilter,
  };
};
