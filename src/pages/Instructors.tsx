import InstructorsDetails from "../features/instructors/InstructorsDetails";
import HeaderContainer from "../ui/HeaderContainer";
import Heading from "../ui/Heading";

function Instructors() {
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Иструкторы</Heading>
      </HeaderContainer>

      <InstructorsDetails />
    </>
  );
}

export default Instructors;
