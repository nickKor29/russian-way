import styled from "styled-components";
import ParticipantsItem from "./ParticipantsItem";
import { useParticipants } from "./useParticipants";
import Spinner from "../../ui/Spinner";

const TourContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(40rem, 1fr));
  gap: 1.5rem; // Уменьшенный отступ

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
    gap: 1rem;
  }
`;

function ParticipantsDetails() {
  const { participants, isLoading } = useParticipants();
  console.log(participants);
  if (isLoading) return <Spinner />;
  return (
    <TourContainer>
      {participants &&
        participants.map((participant) => (
          <ParticipantsItem key={participant.id} participant={participant} />
        ))}
    </TourContainer>
  );
}

export default ParticipantsDetails;
