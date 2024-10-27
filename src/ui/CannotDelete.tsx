import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { ButtonVariation } from "../utils/types";

const StyledCannotDelete = styled.div`
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
function CannotDeleteModalContent({
  onCloseModal,
}: {
  onCloseModal: () => void;
}) {
  return (
    <StyledCannotDelete>
      <Heading as="h3">Удаление невозможно</Heading>
      <p>Этот инструктор участвует в текущих турах, его нельзя удалить.</p>
      <div>
        <Button variation={ButtonVariation.Secondary} onClick={onCloseModal}>
          Отменить
        </Button>
      </div>
    </StyledCannotDelete>
  );
}

export default CannotDeleteModalContent;
