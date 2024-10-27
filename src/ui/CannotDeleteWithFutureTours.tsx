import styled from "styled-components";
import Heading from "./Heading";
import Button from "./Button";
import { Link } from "react-router-dom";
import { ButtonVariation } from "../utils/types";

const StyledCannotDeleteWithFutureTours = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & ul {
    list-style: none;
    padding: 0;
    margin: 0 0 1.2rem 0;
  }

  & li {
    margin-bottom: 0.8rem;
  }

  & a {
    color: var(--color-brand-700);
    font-weight: 600;
    transition: all 0.2s;
    border-bottom: 1px solid transparent;

    &:hover,
    &:focus {
      color: var(--color-brand-900);
      border-bottom-color: inherit;
    }
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

interface Tour {
  id: number;
  title: string;
}

interface CannotDeleteWithFutureToursProps<T = Tour[]> {
  onCloseModal?: () => void;
  futureTours: T;
}
function CannotDeleteWithFutureTours({
  onCloseModal,
  futureTours,
}: CannotDeleteWithFutureToursProps) {
  return (
    <StyledCannotDeleteWithFutureTours>
      <Heading as="h3">Удаление невозможно</Heading>
      <p>
        Этот инструктор участвует в запланированных турах. Прежде чем удалить
        его, замените его в следующих турах:
      </p>
      <ul>
        {futureTours.map((tour) => (
          <li key={tour.id}>
            <Link to={`/tours/${tour.id}`}>{tour.title}</Link>
          </li>
        ))}
      </ul>
      <div>
        <Button variation={ButtonVariation.Danger} onClick={onCloseModal}>
          Отменить
        </Button>
      </div>
    </StyledCannotDeleteWithFutureTours>
  );
}

export default CannotDeleteWithFutureTours;
