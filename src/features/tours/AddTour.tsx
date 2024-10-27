import styled, { css } from "styled-components";
import { LuPlus } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);
  border: 2px dashed var(--color-brand-500);
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-grey-100);
    border-color: var(--color-brand-700);
  }

  &:hover > svg {
    transform: scale(1.1);
  }
`;

// Иконка плюса
const PlusIcon = styled(LuPlus)`
  color: var(--color-brand-700);
  font-size: 5rem;
  transition: all 0.3s ease;
`;
const CardText = styled.div`
  margin-top: 10px;
  font-size: 1.8rem;
  color: var(--color-brand-800);
  font-weight: 500;
`;
function AddTour() {
  const navigate = useNavigate();
  return (
    <CardContainer onClick={() => navigate("new")}>
      <PlusIcon />
      <CardText>Добавить новый тур</CardText>
    </CardContainer>
  );
}

export default AddTour;
