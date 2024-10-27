import styled from "styled-components";
import { InstructorFull } from "../../utils/types";

// Обертка для карточки инструктора
const InstructorCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

// Стили для фото инструктора
const InstructorImage = styled.img`
  width: 15rem;
  height: 15rem;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1.5rem;
`;

// Стили для имени инструктора
const InstructorName = styled.h2`
  font-size: 1.8rem;
  color: #2f7366;
  text-align: center;
  margin-bottom: 1rem;
`;
const InstructorBio = styled.p`
  font-size: 1.7rem;
  text-align: center;
`;
function InstructorDisplay({ instructor }: { instructor: InstructorFull }) {
  return (
    <InstructorCard>
      <InstructorImage
        src={instructor.profileImage}
        alt={`Фото инструктора ${instructor.name}`}
      />
      <InstructorName>{instructor.name}</InstructorName>
      <InstructorBio>{instructor?.bioText?.replace(/;/g, ", ")}</InstructorBio>
    </InstructorCard>
  );
}

export default InstructorDisplay;
