import styled, { css } from "styled-components";

const Select = styled.select<{ $isCreate?: boolean }>`
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-size: 1.6rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  color: var(--color-grey-700);
  box-shadow: var(--shadow-sm);
  transition: border-color 0.3s;
  ${(props) =>
    props.$isCreate &&
    css`
      padding: 2rem;
      font-size: 1.8rem;
      border: 1px solid var(--color-brand-200);
      border-radius: var(--border-radius-md);
    `}
  &:focus {
    outline: none;
    border-color: var(--color-brand-600);
    box-shadow: 0 0 0 3px var(--color-brand-100);
  }

  &:disabled {
    background-color: var(--color-grey-200);
    color: var(--color-grey-500);
    border-color: var(--color-grey-300);
  }
`;
interface Props {
  options: { value: number | string; name: string }[];
  register: any;
  name: string;
  $isCreate: boolean;
}
function SimpleSelect({ options, register, name, $isCreate }: Props) {
  return (
    <Select $isCreate={$isCreate} {...register(name)}>
      <option value="" disabled>
        Выберите уровень сложности
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </Select>
  );
}

export default SimpleSelect;
