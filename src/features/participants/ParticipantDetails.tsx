import { useParams } from "react-router-dom";
import HeaderContainer from "../../ui/HeaderContainer";
import Heading from "../../ui/Heading";
import ParticipantItem from "./ParticipantItem";

function ParticipantDetails() {
  const { participantId } = useParams();
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Участник №{participantId}</Heading>
      </HeaderContainer>
      {participantId && <ParticipantItem id={participantId} />}
    </>
  );
}

export default ParticipantDetails;
