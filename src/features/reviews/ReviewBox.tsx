import { format } from "date-fns";
import { FaStar, FaStarHalfAlt } from "react-icons/fa"; // Иконки звезд
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineUser,
} from "react-icons/hi2";
import { LuCalendarDays, LuStar } from "react-icons/lu";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { formatDate } from "../../utils/helpers";
import { useAverageRating } from "./useAverageRating";
import Spinner from "../../ui/Spinner";
import { Review } from "../../utils/types";

const StyledReviewDataBox = styled.section`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-md);
  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }

  @media (max-width: 768px) {
    padding: 1.6rem;
    font-size: 1.6rem;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  gap: 2.4rem;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const TourCont = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 3rem;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 2rem;
  }

  @media (max-width: 600px) {
    gap: 1rem;
  }
`;

const TourInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.8fr;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-brand-50);
  padding: 2rem;
  border-radius: 8px;
  border: 1px solid var(--color-grey-300);

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const TourImage = styled.img`
  width: 160px;
  height: 120px;
  border-radius: 8px;
  object-fit: cover;
  border: 2px solid var(--color-grey-300);

  @media (max-width: 900px) {
    width: 100%;
  }
`;

const TourDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  width: 100%;

  p {
    font-size: 1.8rem;
    font-weight: 600;
    margin: 0;
    color: var(--color-brand-900);
  }

  @media (max-width: 768px) {
    p {
      font-size: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    p {
      font-size: 1.4rem;
    }
  }
`;

const TourIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.8rem;
  color: var(--color-brand-600);

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    font-size: 1.4rem;
    gap: 0.8rem;
  }
`;

const InstructorInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 1rem;
  padding: 1rem;
  border-left: 1px solid var(--color-grey-300);
  flex-shrink: 0;

  @media (max-width: 1100px) {
    border-left: none;
    border-top: 1px solid var(--color-grey-300);
    padding-top: 2rem;
  }
`;

const InstructorImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-grey-300);

  @media (max-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const ReviewText = styled.p`
  font-size: 2rem;
  color: var(--color-grey-800);

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ReviewAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-grey-600);

  p {
    font-size: 1.8rem;
    font-weight: 500;
  }

  & span {
    color: var(--color-grey-400);
  }

  @media (max-width: 768px) {
    p {
      font-size: 1.6rem;
    }
  }
`;

const Footer = styled.footer`
  font-size: 1.6rem;
  color: var(--color-grey-500);
  text-align: right;
  padding: 2rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1.6rem;
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.8rem;
  color: #f39c12;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const StyledLink = styled(Link)`
  color: var(--color-brand-900);
  border-bottom: 1px solid var(--color-brand-900);

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

function ReviewDataBox({ review }: { review: Review }) {
  const { averageRating, isGettingRating } = useAverageRating(review.tourId);

  let avRating = 0;
  let quantity = 0;

  if (typeof averageRating === "object") {
    avRating = averageRating.averageRating;
    quantity = averageRating.quantity;
  } else if (typeof averageRating === "string") {
    avRating = parseFloat(averageRating);
  }

  console.log(typeof averageRating, typeof quantity);
  const {
    comment,
    created_at,
    rating,
    status,
    rejectionReason,
    tourId,
    tours: {
      endDate,
      images,
      instructors: {
        id: instructorId,
        name: instructorName,
        profileImage: instructorProfileImage,
      },
      startDate,
      title: tourTitle,
    },
    users: { fullName: userFullName },
  } = review;
  console.log(rejectionReason);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const totalStars = 5;

  const stars = Array(totalStars)
    .fill(0)
    .map((_, index) => {
      if (index < fullStars) return <FaStar key={index} />;
      if (index === fullStars && hasHalfStar)
        return <FaStarHalfAlt key={index} />;
      return <LuStar key={index} />;
    });
  if (isGettingRating) return <Spinner />;
  return (
    <StyledReviewDataBox>
      <Header>
        <div>
          <HiOutlineChatBubbleBottomCenterText />
          <p>Отзыв от {userFullName}</p>
        </div>
        <p>{formatDate(created_at)}</p>
      </Header>

      <Content>
        <ReviewAuthor>
          <HiOutlineUser />
          <p>{userFullName}</p>
          <span>&bull;</span>
          <RatingContainer>
            {stars}
            <p>{rating} </p>
          </RatingContainer>
        </ReviewAuthor>

        <ReviewText>Комментарий: {comment.replace(/;/g, ", ")}</ReviewText>

        {status === "Отклонено" && (
          <ReviewText>
            Причина отклонения: {rejectionReason?.replace(/;/g, ", ")}
          </ReviewText>
        )}

        <TourInfo>
          <TourCont>
            <TourImage src={images[0] as string} alt={tourTitle} />
            <TourDetails>
              <p>
                <span>Тур: </span>
                <StyledLink to={`/tours/${tourId}`}>{tourTitle}</StyledLink>
              </p>
              <TourIcon>
                <LuCalendarDays />
                <p>
                  Даты: {format(startDate, "dd.MM.yyyy")} -{" "}
                  {format(endDate, "dd.MM.yyyy")}
                </p>
              </TourIcon>
              <p>
                Средний рейтинг тура {rating.toFixed(1)} (на основе {quantity}{" "}
                отзывов){" "}
              </p>
            </TourDetails>
          </TourCont>

          <InstructorInfo>
            <InstructorImage
              src={instructorProfileImage}
              alt={instructorName}
            />
            <p>
              <StyledLink to={`/instructors/${instructorId}`}>
                {instructorName}
              </StyledLink>
            </p>
          </InstructorInfo>
        </TourInfo>
      </Content>

      <Footer>
        <p>
          Отзыв был оставлен{" "}
          {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </Footer>
    </StyledReviewDataBox>
  );
}

export default ReviewDataBox;
