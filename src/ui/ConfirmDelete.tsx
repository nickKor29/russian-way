import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { ButtonVariation, ConfirmProps } from "../utils/types";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmProps) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Удалить {resourceName}</Heading>
      <p>
        Вы уверены, что хотите навсегда удалить {resourceName}? Это действие
        нельзя отменить.
      </p>

      <div>
        <Button
          variation={ButtonVariation.Secondary}
          disabled={disabled}
          onClick={onCloseModal}
        >
          Отменить
        </Button>
        <Button
          variation={ButtonVariation.Danger}
          disabled={disabled}
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
        >
          Удалить
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
