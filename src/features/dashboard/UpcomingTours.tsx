import styled from "styled-components";
import { differenceInDays, format } from "date-fns";
import { ru } from "date-fns/locale"; // Импортируем локаль
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import { TourData } from "../../utils/types";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { useDarkMode } from "../../context/DarkModeContext";
import { useTotalTours } from "../tours/useTotalTours";
import Spinner from "../../ui/Spinner";

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

const StyledUpcomingTours = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  grid-column: 1 / span 2;
  grid-row: 2 / 3;
  max-height: 400px;
  @media (max-width: 1300px) {
    grid-row: 2/3;
    grid-column: 1/-1;
  }

  @media (max-width: 400px) {
    padding: 1.2rem;
  }
`;

const ToursList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: auto;
  max-height: 300px;
  padding-right: 1rem;

  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const TourItem = styled.li<{ levelColor: string }>`
  background-color: ${({ levelColor }) => levelColor};
  border-radius: var(--border-radius-sm);
  padding: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease-in-out;
  @media (max-width: 500px) {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  &:hover {
    transform: translateY(-3px);
  }
`;

const TourDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const TourTitle = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 0.8rem;
  color: #404040;
`;

const TourDate = styled.p`
  font-size: 1.4rem;
  color: #505050;
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

const DaysUntilStart = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: #484848;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const DifficultyLevel = styled.p`
  font-size: 1.4rem;
  font-weight: 600;
  color: #585858;
  margin-top: 0.5rem;
`;

const IconWrapper = styled.span`
  color: ${({ theme }) => theme.iconColor};
`;

const NoToursMessage = styled.p`
  text-align: center;
  font-size: 1.8rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;

function UpcomingTours() {
  const { isDarkMode } = useDarkMode();
  const {
    tours,
    isPending: isLoadingTours,
    numDays,
  } = useTotalTours({ isDate: false });
  if (isLoadingTours) return <Spinner />;
  const today = new Date();
  console.log(tours);
  const upcomingTours = (tours as TourData[])
    .filter((tour) => new Date(tour.startDate) > today)
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    .slice(0, 3);

  return (
    <StyledUpcomingTours>
      <Row type="horizontal">
        <Heading as="h2">Ближайшие туры</Heading>
      </Row>

      {upcomingTours.length > 0 ? (
        <ToursList>
          {upcomingTours.map((tour) => {
            const daysUntilStart = differenceInDays(
              new Date(tour.startDate),
              today
            );
            const levelColor = getColorForLevel(
              tour.difficultyLevel as
                | "Легкий"
                | "Средний"
                | "Высокий"
                | "Экстремальный",
              isDarkMode
            );

            return (
              <TourItem key={tour.id} levelColor={levelColor}>
                <TourDetails>
                  <TourTitle>{tour.title}</TourTitle>
                  <TourDate>
                    <IconWrapper>
                      <FaCalendarAlt />
                    </IconWrapper>
                    {format(new Date(tour.startDate), "dd MMMM yyyy", {
                      locale: ru,
                    })}{" "}
                    {/* Изменено на русский формат */}
                  </TourDate>
                  <DifficultyLevel>
                    Уровень сложности: {tour.difficultyLevel}
                  </DifficultyLevel>
                </TourDetails>
                <DaysUntilStart>
                  <IconWrapper>
                    <FaClock />
                  </IconWrapper>
                  {daysUntilStart} {daysUntilStart === 1 ? "день" : "дней"} до
                  начала
                </DaysUntilStart>
              </TourItem>
            );
          })}
        </ToursList>
      ) : (
        <NoToursMessage>Нет ближайших туров</NoToursMessage>
      )}
    </StyledUpcomingTours>
  );
}

export default UpcomingTours;
