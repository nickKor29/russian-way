import { LuBarChart, LuRussianRuble, LuStar, LuUsers } from "react-icons/lu";
import { formatCurrency } from "../../utils/helpers";
import { TourData } from "../../utils/types";
import Stat from "./Stat";
import styled from "styled-components";
const StatCont = styled.div`
  grid-column: 1/-1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, auto));

  gap: 2rem;
`;
function Stats({
  tours,
  averageRating,
  participants,
}: {
  tours: TourData[];
  averageRating: string;
  participants: { toursIds: number[] }[];
}) {
  const allCurrentParticipants = tours.reduce(
    (acc, cur) => acc + cur.currentParticipants,
    0
  );
  const allMaxParticipants = tours.reduce(
    (acc, cur) => acc + cur.maxParticipants,
    0
  );
  const averageToursLoad = (
    (allCurrentParticipants / allMaxParticipants) *
    100
  ).toFixed(1);
  console.log(allCurrentParticipants);
  console.log(allMaxParticipants);
  console.log(averageToursLoad);
  // 2.
  const totalSales = tours.reduce((acc, cur) => {
    return (
      acc +
      (cur.regularPrice - (cur.discount as number)) * cur.currentParticipants
    );
  }, 0);

  // 3.
  console.log(participants);
  const filteredParticipants = participants.filter(
    (participant) => participant.toursIds.length > 1
  ).length;
  console.log(filteredParticipants);

  const percentageRepeatParticipants = (
    (filteredParticipants / participants.length) *
    100
  ).toFixed(1);

  return (
    <StatCont>
      <Stat
        title="Средняя загрузка туров"
        color="orange"
        icon={<LuBarChart />}
        value={averageToursLoad + "%"}
      />
      <Stat
        title="Общая выручка"
        color="green-1"
        icon={<LuRussianRuble />}
        value={formatCurrency(totalSales)}
      />
      <Stat
        title="Процент повторных участники"
        color="blue"
        icon={<LuUsers />}
        value={percentageRepeatParticipants + "%"}
      />
      <Stat
        title="Средний рейтинг"
        color="gold"
        icon={<LuStar />}
        value={averageRating}
      />
    </StatCont>
  );
}

export default Stats;
