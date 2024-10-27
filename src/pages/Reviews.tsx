import styled from "styled-components";
import ReviewDetails from "../features/reviews/ReviewsDetails";
import Heading from "../ui/Heading";
import HeaderContainer from "../ui/HeaderContainer";
import ReviewsOperations from "../features/reviews/ReviewsOperations";
const StyledHeading = styled(Heading)`
  margin-bottom: 3rem;
  @media (max-width: 480px) {
    margin-bottom: 1rem;
  }
`;
function Reviews() {
  return (
    <>
      <HeaderContainer>
        <StyledHeading as="h1">Отзывы</StyledHeading>
        <ReviewsOperations />
      </HeaderContainer>
      <ReviewDetails />
    </>
  );
}

export default Reviews;
