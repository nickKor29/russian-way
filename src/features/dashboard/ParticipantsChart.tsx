import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";
import { TourData } from "../../utils/types";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { ru } from "date-fns/locale";

const StyledParticipantsChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function getEarliestDate(dates: string[]) {
  if (dates.length === 0) return null;
  return dates.reduce((earliest, current) => {
    const currentDate = new Date(current);
    return currentDate < earliest ? currentDate : earliest;
  }, new Date(dates[0]));
}

function filterToursByDate(tours: TourData[], numDays: number | string) {
  const today = new Date();
  const earliestDate = getEarliestDate(tours.map((tour) => tour.startDate));
  if (numDays === "all" && earliestDate) {
    return tours.filter((tour) => {
      const tourDate = new Date(tour.startDate);
      return tourDate >= earliestDate && tourDate <= today;
    });
  }
  const startDate = subDays(today, numDays as number);
  return tours.filter((tour) => {
    const tourDate = new Date(tour.startDate);
    return tourDate >= startDate && tourDate <= today;
  });
}

function ParticipantsChart({
  tours,
  numDays,
}: {
  tours: TourData[];
  numDays: string | number;
}) {
  const { isDarkMode } = useDarkMode();
  const filteredTours = filterToursByDate(tours, numDays);
  const earliestDate = getEarliestDate(tours.map((tour) => tour.startDate));
  const startInterval = earliestDate ?? subDays(new Date(), 365);
  const allDates = eachDayOfInterval({
    start: startInterval,
    end: new Date(),
  });

  const data = allDates
    .map((date) => {
      const tour = filteredTours.find(
        (t) =>
          new Date(t.startDate).toISOString().split("T")[0] ===
          date.toISOString().split("T")[0]
      );
      return {
        label: format(date, "dd MMMM", { locale: ru }),
        currentParticipants: tour ? tour.currentParticipants : 0,
        maxParticipants: tour ? tour.maxParticipants : 0,
      };
    })
    .filter(
      (entry) => entry.currentParticipants > 0 || entry.maxParticipants > 0
    );

  const colors = isDarkMode
    ? {
        currentParticipants: { stroke: "#69bfaf", fill: "#5aa89a" },
        maxParticipants: { stroke: "#165359", fill: "#144b50" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        currentParticipants: { stroke: "#69bfaf", fill: "#c3edea" },
        maxParticipants: { stroke: "#165359", fill: "#e0ebeb" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledParticipantsChart>
      <Heading as="h2">Количество участников по турам</Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <CartesianGrid strokeDasharray={4} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            dataKey="currentParticipants"
            type="monotone"
            fill={colors.currentParticipants.fill}
            stroke={colors.currentParticipants.stroke}
            strokeWidth={2}
            name="Текущие участники"
          />
          <Area
            dataKey="maxParticipants"
            type="monotone"
            fill={colors.maxParticipants.fill}
            stroke={colors.maxParticipants.stroke}
            strokeWidth={2}
            name="Максимум участников"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledParticipantsChart>
  );
}

export default ParticipantsChart;
