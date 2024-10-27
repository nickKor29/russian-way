import { ReactElement, isValidElement } from "react";
import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  font-size: 1.6rem;
  grid-template-columns: 24rem 1fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 880px) {
    grid-template-columns: 1fr;
    gap: 1.6rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

interface FormRowProps {
  label: string;
  error: string;
  children: ReactElement<{ id: string }>;
}

function FormRow({ label, error, children }: FormRowProps) {
  const childId = isValidElement(children) ? children.props.id : undefined;

  return (
    <StyledFormRow>
      {label && <Label htmlFor={childId}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
