import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";
import { ButtonVariation, ConfirmProps } from "../utils/types";

const StyledConfirmArchive = styled.div`
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

function ConfirmArchive({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
}: ConfirmProps) {
  return (
    <StyledConfirmArchive>
      <Heading as="h3">Перенести в архив {resourceName}</Heading>
      <p>
        Вы уверены, что хотите перенести {resourceName} в архив? Этот инструктор
        больше не будет активен, но его данные останутся в системе.
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
            onCloseModal();
          }}
        >
          Перенести в архив
        </Button>
      </div>
    </StyledConfirmArchive>
  );
}

export default ConfirmArchive;
