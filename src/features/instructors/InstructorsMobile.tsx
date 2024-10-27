import styled from "styled-components";
import InstructorRowMobile from "./InstructorRowMobile";
import("../../utils/types");
import { InstructorFull } from "../../utils/types";
const MobileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;
function InstructorsMobile({ instructors }: { instructors: InstructorFull[] }) {
  console.log(instructors);

  return (
    <MobileContainer>
      {instructors.map((instructor) => (
        <InstructorRowMobile instructor={instructor} key={instructor.id} />
      ))}
    </MobileContainer>
  );
}

export default InstructorsMobile;
