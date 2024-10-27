import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { TourData } from "../../utils/types";
import { useRepeatParticipants } from "../participants/useRepeatParticipants";
import { useAverageRating } from "../reviews/useAverageRating";
import { useTotalTours } from "../tours/useTotalTours";
import ParticipantsChart from "./ParticipantsChart";
import Stats from "./Stats";
import TourFullness from "./ToursFullness";
import UpcomingTours from "./UpcomingTours";
const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 40rem auto 34rem;
  gap: 2.4rem;
  @media (max-width: 1300px) {
    grid-template-rows: auto 34rem auto auto 34rem;
  }
`;
function DashboardLayout() {
  const { isLoading, participants } = useRepeatParticipants();
  const {
    tours,
    isPending: isLoadingTours,
    numDays,
  } = useTotalTours({ isDate: true });
  console.log(tours);
  const { averageRating, isGettingRating } = useAverageRating();
  console.log(participants);

  if (isLoading || isLoadingTours || isGettingRating) return <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats
        tours={tours as TourData[]}
        averageRating={averageRating as string}
        participants={participants as { toursIds: number[] }[]}
      />
      <TourFullness tours={tours as TourData[]} />
      <UpcomingTours />
      <ParticipantsChart tours={tours || []} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
