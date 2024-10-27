import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

// Определяем интерфейс для опций фильтра
interface FilterOption {
  value: string;
  label: string;
}

// Пропсы компонента Filter
interface FilterProps {
  filterField: string;
  options: FilterOption[];
}

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  @media (max-width: 430px) {
    flex-direction: column;
  }
`;

const FilterButton = styled.button<{ $active: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.5rem;
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

function Filter({ filterField, options }: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter =
    searchParams.get(filterField) || options.at(0)?.value || "";

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    setSearchParams(searchParams);
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  }

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          $active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}

export default Filter;
