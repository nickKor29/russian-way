import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const TourCard = styled.div`
  color: var(--color-brand-900);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const TourImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

const TourTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.75rem;
  transition: all 0.3s;
  &:hover {
    color: var(--color-brand-700);
  }
  @media (max-width: 370px) {
    text-align: center;
    margin-bottom: 2rem;
  }
`;

const ParticipantListContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4rem;
  padding-bottom: 3rem;
`;

const StyledSwiper = styled(Swiper)`
  .swiper-wrapper {
    display: flex;
  }

  .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
  }

  .swiper-pagination {
    position: relative;
    margin-top: 3rem;
  }

  .swiper-pagination-bullet {
    background-color: var(--color-brand-600);
    width: 10px;
    height: 10px;
    margin: 0 4px;
  }
`;

const ParticipantList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Participant = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-700);
  transition: all 0.3s;
  &:hover {
    color: var(--color-brand-900);
    font-weight: 600;
  }
`;

// Стиль для завершённых туров
const CompletedTourText = styled.div`
  color: var(--color-grey-600);
  font-size: 1.6rem;
  margin-top: auto;

  span {
    font-weight: 600;
    color: var(--color-grey-600);
  }
`;

// Стиль для активных туров
const ActiveTourText = styled.div`
  color: var(--color-brand-900);
  font-size: 1.65rem;
  margin-top: auto;
  font-weight: 500;
  span {
    font-weight: 700;
  }
`;

const getColumnsCount = (length: number) => {
  if (length > 24) return 4;
  if (length > 12) return 3;
  return 2;
};
interface Participant {
  id: number;
  fullName: string;
}

const splitParticipants = (participants: Participant[], columns: number) => {
  console.log(participants, columns);
  const perColumn = Math.ceil(participants.length / columns);
  let result = [];
  for (let i = 0; i < columns; i++) {
    result.push(participants.slice(i * perColumn, (i + 1) * perColumn));
  }
  return result;
};
interface Participants {
  currentParticipants: number;
  id: number;
  images: string[];
  maxParticipants: number;
  participants: Participant[];
  startDate: string;
  title: string;
}
function ParticipantsItem({ participant }: { participant: Participants }) {
  const [isMobile, setIsMobile] = useState(false);
  const columns = getColumnsCount(participant.participants.length);
  const splitLists = splitParticipants(participant.participants, columns);

  const today = new Date();
  const startDate = new Date(participant.startDate);
  const isTourActive = today < startDate;
  const currentParticipants = participant.currentParticipants;
  const maxParticipants = participant.maxParticipants;
  console.log(participant);
  console.log(window.innerWidth);
  useEffect(function () {
    if (window.innerWidth <= 768) setIsMobile(true);
  }, []);
  return (
    <TourCard key={participant.title}>
      <div>
        <TourImage src={participant.images[0]} alt={participant.title} />
        <TourTitle>
          <Link to={`/tours/${participant.id}`}>{participant.title}</Link>
        </TourTitle>

        {participant.participants.length === 0 ? (
          <div>
            <ActiveTourText>
              Еще нет участников. Максимум: <span>{maxParticipants}</span>.
            </ActiveTourText>
          </div>
        ) : (
          <>
            {splitLists.length > 2 || isMobile ? (
              <StyledSwiper
                spaceBetween={10}
                slidesPerView={1}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                breakpoints={{
                  768: {
                    slidesPerView: 2,
                  },
                }}
              >
                {splitLists.map((list, index) => (
                  <SwiperSlide key={index}>
                    <ParticipantList>
                      {list.map((participant, idx) => (
                        <Participant key={participant.fullName}>
                          <Link to={`/participants/${participant.id}`}>
                            {idx + 1}. {participant.fullName}
                          </Link>
                        </Participant>
                      ))}
                    </ParticipantList>
                  </SwiperSlide>
                ))}
              </StyledSwiper>
            ) : (
              <ParticipantListContainer>
                {splitLists.map((list, index) => (
                  <ParticipantList key={index}>
                    {list.map((participant, idx) => (
                      <Participant key={participant.fullName}>
                        <Link to={`/participants/${participant.id}`}>
                          {idx + 1}. {participant.fullName}
                        </Link>
                      </Participant>
                    ))}
                  </ParticipantList>
                ))}
              </ParticipantListContainer>
            )}
          </>
        )}
      </div>
      {isTourActive ? (
        <ActiveTourText>
          Текущие участники: <span>{currentParticipants}</span> /{" "}
          <span>{maxParticipants}</span>
        </ActiveTourText>
      ) : (
        <CompletedTourText>
          Тур завершён. Всего было участников:{" "}
          <span>{currentParticipants}</span> / <span>{maxParticipants}</span>
        </CompletedTourText>
      )}
    </TourCard>
  );
}

export default ParticipantsItem;
