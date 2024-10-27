import styled from "styled-components";
import { ChangeEvent } from "react";

const StyledLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Checkbox = styled.input.attrs({ type: "checkbox" })`
  position: relative;
  opacity: 0;
  width: 0;
  height: 0;
  appearance: none;
`;

const CheckboxInner = styled.span`
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
  font-size: 1.6rem;
  padding: 0.8rem;
  padding-left: 7.4rem;

  &::before {
    display: block;
    content: "";
    width: 60px;
    height: 36px;
    position: absolute;
    left: 0;
    top: 0;
    border-radius: 18px;
    transition: all 0.3s;
    background-color: var(--color-grey-0);
  }
  ${Checkbox}:checked + &::before {
    background-color: green;
  }

  ${Checkbox}:checked + &::after {
    background-color: white;
    left: 27px;
  }

  ${Checkbox}:focus + &::before {
    outline: 1px solid gray;
    outline-offset: 1px;
  }

  &::after {
    display: block;
    content: "";
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 15px;
    background-color: green;
    left: 3px;
    top: 3px;
    transition: all 0.3s;
  }
`;

interface ToggleButtonProps {
  id: string;
  text: string;
  icon?: React.ReactNode;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function ToggleButton({
  id,
  text,
  icon,
  checked,
  onChange,
}: ToggleButtonProps) {
  return (
    <StyledLabel htmlFor={id}>
      <Checkbox checked={checked} onChange={onChange} id={id} />
      <CheckboxInner>
        {text} {icon}
      </CheckboxInner>
    </StyledLabel>
  );
}

export default ToggleButton;
