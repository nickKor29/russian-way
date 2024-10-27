import ToursOperations from "../features/tours/ToursOperations";
import ToursTable from "../features/tours/ToursTable";
import HeaderContainer from "../ui/HeaderContainer";
import Heading from "../ui/Heading";

function Tours() {
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Все туры</Heading>
        <ToursOperations />
      </HeaderContainer>

      <ToursTable />
    </>
  );
}

export default Tours;
