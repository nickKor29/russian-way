import styled from "styled-components";
import Heading from "../ui/Heading";
import ArchivedInstructorsDetails from "../features/archive/ArchivedInstructorsDetails";
import ButtonText from "../ui/ButtonText";
import { useNavigate } from "react-router-dom";
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5rem;
  @media (max-width: 480px) {
    margin-bottom: 2rem;
  }
`;
function ArchiveInstructors() {
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Архив</Heading>
        <ButtonText onClick={() => navigate(-1)}>&larr; Назад</ButtonText>
      </HeaderContainer>

      <ArchivedInstructorsDetails />
    </>
  );
}

export default ArchiveInstructors;
