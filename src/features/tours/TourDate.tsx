import styled from "styled-components";
import { checkDate } from "../../utils/helpers";

const StyledDate = styled.p`
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 5px;
`;

function TourDate({
  startDate,
  endDate,
}: {
  startDate: string;
  endDate: string;
}) {
  return <StyledDate>{checkDate(startDate, endDate)}</StyledDate>;
}

export default TourDate;
