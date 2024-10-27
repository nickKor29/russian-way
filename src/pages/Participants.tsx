import ParticipantsDetails from "../features/participants/ParticipantsDetails";
import HeaderContainer from "../ui/HeaderContainer";
import Heading from "../ui/Heading";

function Participants() {
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Все участники</Heading>
      </HeaderContainer>

      <ParticipantsDetails />
    </>
  );
}

export default Participants;
