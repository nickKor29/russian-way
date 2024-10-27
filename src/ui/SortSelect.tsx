import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledSelect = styled.select<{ $type: string }>`
  font-size: 1.5rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  white-space: normal;
  @media (max-width: 400px) {
    width: 100%;
  }
`;
interface Props {
  options: { value: string; label: string }[];
  defaultValue: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  $type: string;
}
function SortSelect({
  options,
  onChange,
  value,
  defaultValue,
  ...props
}: Props) {
  const [searchParams] = useSearchParams();
  const currentSort = searchParams.get("sortBy") || defaultValue;

  return (
    <StyledSelect value={value || currentSort} onChange={onChange} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
}

export default SortSelect;
