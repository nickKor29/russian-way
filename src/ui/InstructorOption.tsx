import styled from "styled-components";

const StyledOption = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

const Img = styled.img`
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
`;

const Name = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
`;

interface Instructor {
  id: number;
  profileImage: string;
  name: string;
}

interface Props {
  instructor: Instructor;
}

function InstructorOption({ instructor }: Props) {
  return (
    <StyledOption key={instructor.id}>
      <Img
        src={instructor.profileImage}
        alt={`Фото инструктора ${instructor.name}`}
      />
      <Name>{instructor.name}</Name>
    </StyledOption>
  );
}

export default InstructorOption;
