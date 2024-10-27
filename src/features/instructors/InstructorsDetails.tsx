import { LuPlus } from "react-icons/lu";
import useWindowWidth from "../../hooks/useWidnowWitdh";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import InstructorsMobile from "./InstructorsMobile";
import InstructorsTable from "./InstructorsTable";
import { useInstructors } from "./useInstructors";
import AddInstructorForm from "./CreateInstructorForm";
import styled from "styled-components";
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  max-width: 140rem;
  margin: 0 auto 3rem;
  padding: 0 2rem;

  @media (max-width: 988px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 1rem;
    gap: 2rem;
    padding: 0;
  }

  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;
function InstructorsDetails() {
  const { isLoadingInstructors, instructors } = useInstructors({
    option: "archived",
    value: false,
  });
  const width = useWindowWidth();
  const isMobile = width <= 830;
  if (isLoadingInstructors) return <Spinner />;

  return (
    <>
      <Modal>
        <HeaderContainer>
          <h2>Список инструкторов</h2>
          <Modal.Open opens="create">
            <Button>
              <LuPlus />
              <span>Добавить инструктора</span>
            </Button>
          </Modal.Open>
          <Modal.Window name="create">
            <AddInstructorForm />
          </Modal.Window>
        </HeaderContainer>
      </Modal>
      {isMobile ? (
        <InstructorsMobile instructors={instructors} />
      ) : (
        <InstructorsTable instructors={instructors} />
      )}
    </>
  );
}

export default InstructorsDetails;
