import styled from "styled-components";
import { useParticipant } from "./useParticipant";
import Spinner from "../../ui/Spinner";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

const Container = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-lg);
  @media (max-width: 1200px) {
    max-width: 95%;
  }
  @media (max-width: 1024px) {
    max-width: 90%;
  }
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;
const HeaderCont = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  margin-bottom: 2.5rem;
`;
const ButtonBack = styled(ButtonText)`
  justify-self: end;
  color: var(--color-brand-700);
  &:hover {
    color: var(--color-brand-900);
  }
`;
const Header = styled.h1`
  justify-self: end;
  font-size: 2.8rem;
  color: var(--color-brand-800);

  text-align: center;
  @media (max-width: 1024px) {
    font-size: 2.6rem;
  }
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const Section = styled.section`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: var(--shadow-md);
  &:last-child {
    margin-bottom: 0;
  }
  @media (max-width: 768px) {
    padding: 1.5rem;
  }
  @media (max-width: 480px) {
    padding: 1rem;
  }
`;

const SectionHeader = styled.h2`
  font-size: 2.2rem;
  color: var(--color-brand-700);
  margin-bottom: 1rem;
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
  @media (max-width: 480px) {
    font-size: 1.6rem;
  }
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 1.8rem;
  @media (max-width: 768px) {
    flex-direction: column;
    font-size: 1.4rem;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.span`
  color: var(--color-grey-600);
`;
const StyledLink = styled(Link)`
  border-bottom: 1px solid transparent;
  transition: all 0.3s;
  &:hover {
    border-bottom-color: var(--color-grey-600);
    color: var(--color-grey-600);
  }
`;
const Value = styled.p`
  color: var(--color-grey-900);
  a {
    border-bottom: 1px solid transparent;
    transition: all 0.3s;
    &:hover {
      border-bottom-color: var(--color-grey-600);
      color: var(--color-grey-600);
    }
  }
`;
interface Review {
  id: number;
  comment: string;
}
interface Tour {
  id: number;
  title: string;
  startDate: string;
  endDate: string;
}
function ParticipantItem({ id }: { id: string }) {
  const { participant, isLoading } = useParticipant(id);
  console.log(id);
  const moveBack = useMoveBack();
  if (isLoading) return <Spinner />;
  console.log(participant);
  const { email, fullName, phoneNumber, reviews, tours } = participant;

  return (
    <Container>
      <HeaderCont>
        <Header>{fullName}</Header>
        <ButtonBack onClick={moveBack}>&larr; Назад</ButtonBack>
      </HeaderCont>
      <Section>
        <SectionHeader>Контактные данные</SectionHeader>
        <InfoRow>
          <Label>Электронная почта:</Label>
          <Value>
            <a href={`mailto:${email}`}>{email}</a>
          </Value>
        </InfoRow>
        <InfoRow>
          <Label>Телефон:</Label>
          <Value>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
          </Value>
        </InfoRow>
      </Section>
      <Section>
        <SectionHeader>Отзывы</SectionHeader>
        {reviews.length > 0 ? (
          reviews.map((review: Review, index: number) => (
            <InfoRow key={index}>
              <Label>
                <StyledLink to={`/tours/${tours[index].id}`}>
                  {tours[index].title}:
                </StyledLink>
              </Label>
              <Value>
                <StyledLink to={`/reviews/${review.id}`}>
                  {review.comment.replace(/;/g, ",")}
                </StyledLink>
              </Value>
            </InfoRow>
          ))
        ) : (
          <InfoRow>
            <Label>Отзывы отсутствуют.</Label>
          </InfoRow>
        )}
      </Section>
      <Section>
        <SectionHeader>Принятые туры</SectionHeader>
        {tours.length > 0 ? (
          tours.map((tour: Tour, index: number) => (
            <InfoRow key={index}>
              <Label>
                <StyledLink to={`/tours/${tour.id}`}>{tour.title}:</StyledLink>
              </Label>
              <Value>
                {` ${format(tour.startDate, "d MMMM yyyy", {
                  locale: ru,
                })} - ${format(tour.endDate, "d MMMM yyyy", { locale: ru })}`}
              </Value>
            </InfoRow>
          ))
        ) : (
          <InfoRow>
            <Label>Участие в турах отсутствует.</Label>
          </InfoRow>
        )}
      </Section>
    </Container>
  );
}

export default ParticipantItem;
