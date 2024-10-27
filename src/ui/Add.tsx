import { LuPlus } from "react-icons/lu";
import styled from "styled-components";

interface AddProps {
  title: string;
  onClick: () => void;
  color?: string;
}

const CardContainer = styled.div<{ $color?: string }>`
  // Указываем тип для $color
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 200px;

  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-lg);
  border: 2px dashed
    ${({ $color }) =>
      $color ? `var(--color-${$color}-500)` : "var(--color-brand-500)"};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--color-grey-100);
    border-color: ${({ $color }) =>
      $color ? `var(--color-${$color}-700)` : "var(--color-brand-700)"};
  }

  &:hover > svg {
    transform: scale(1.1);
  }
`;

// Иконка плюса
const PlusIcon = styled(LuPlus)<{ $color?: string }>`
  // Указываем тип для $color
  color: ${({ $color }) =>
    $color ? `var(--color-${$color}-700)` : "var(--color-brand-700)"};
  font-size: 5rem;
  transition: all 0.3s ease;
`;

const CardText = styled.div<{ $color?: string }>`
  // Указываем тип для $color
  margin-top: 10px;
  font-size: 1.8rem;
  color: ${({ $color }) =>
    $color ? `var(--color-${$color}-800)` : "var(--color-brand-800)"};
  font-weight: 500;
`;

function Add({ title, onClick, color }: AddProps) {
  // Добавляем типизацию пропсов
  return (
    <CardContainer $color={color} onClick={onClick}>
      <PlusIcon $color={color} />
      <CardText $color={color}>{title}</CardText>
    </CardContainer>
  );
}

export default Add;
