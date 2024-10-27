import React from "react";
import styled from "styled-components";
import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Heading from "../../ui/Heading";
import { TourData } from "../../utils/types";
import { useDarkMode } from "../../context/DarkModeContext";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5rem;

  @media (max-width: 1300px) {
    grid-row: 3/4;
    grid-column: 1/-1;
  }
  @media (max-width: 400px) {
    padding: 1.2rem;
  }
`;

function getColorForLevel(
  level: "Легкий" | "Средний" | "Высокий" | "Экстремальный",
  isDarkMode: boolean
) {
  const colors = isDarkMode
    ? {
        Легкий: "#fef9c3",
        Средний: "#a16207",
        Высокий: "#f97316",
        Экстремальный: "#b91c1c",
      }
    : {
        Легкий: "#ffeb3b",
        Средний: "#f59e0b",
        Высокий: "#f97316",
        Экстремальный: "#ef4444",
      };
  return colors[level] || "#cccccc";
}

function TourFullness({ tours }: { tours: TourData[] }) {
  const { isDarkMode } = useDarkMode();
  let difficultyData = [];

  const uniqueLevels = [...new Set(tours.map((tour) => tour.difficultyLevel))];

  difficultyData = uniqueLevels.map((level) => ({
    level: level,
    totalFillRate: 0,
    count: 0,
    value: 0,
    color: getColorForLevel(
      level as "Легкий" | "Средний" | "Высокий" | "Экстремальный",
      isDarkMode
    ),
  }));

  tours.forEach((tour) => {
    if (tour.currentParticipants > 0) {
      const levelData = difficultyData.find(
        (item) => item.level === tour.difficultyLevel
      );
      if (levelData) {
        const fillRate =
          (tour.currentParticipants / tour.maxParticipants) * 100;
        levelData.totalFillRate += fillRate;
        levelData.count += 1;
      }
    }
  });

  difficultyData.forEach((level) => {
    if (level.count > 0) {
      level.value = parseFloat((level.totalFillRate / level.count).toFixed(1));
    }
  });

  if (
    difficultyData.length === 0 ||
    difficultyData.every((d) => d.value === 0)
  ) {
    return <p>Нет данных для отображения</p>;
  }

  return (
    <ChartBox>
      <Heading as="h2">Заполненности по уровням сложности туров</Heading>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={difficultyData}
            nameKey="level"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="50%"
            cy="50%"
            paddingAngle={3}
            label
          >
            {difficultyData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}%`, `${name}`]} />
          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default TourFullness;
