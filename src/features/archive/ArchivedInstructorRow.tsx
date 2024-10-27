import { LuArchive, LuMail, LuPhone } from "react-icons/lu";
import styled from "styled-components";
import Table from "../../ui/Table";
import Button from "../../ui/Button";
import { useEditInstructor } from "../instructors/useEditInstructor";
import { capitalizeFirstLetter } from "../../utils/helpers";

const Row = styled(Table.Row)`
  display: flex;
  align-items: center;
  padding: 1.5rem 1rem;
  gap: 1rem;
  transition: background-color 0.3s, transform 0.3s;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: var(--color-grey-0);
`;

const Number = styled.div`
  color: var(--color-grey-400);
  font-weight: 500;
`;

const Img = styled.img`
  width: 14rem;
  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 0.4rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
`;

const Instructor = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-600);
  line-height: 1.2;
  flex: 1;
`;

const Description = styled.div`
  font-size: 1.6rem;
  color: var(--color-grey-700);
  line-height: 1.4;
  margin-top: 0.5rem;
  flex: 2;

  &::first-letter {
    text-transform: uppercase;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Email = styled.a`
  font-family: "Sono", sans-serif;
  font-weight: 600;
  color: var(--color-blue-600);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;

  &:hover,
  &:focus {
    color: var(--color-blue-800);
    text-decoration: underline;
  }
`;

const Phone = styled.a`
  font-family: "Sono", sans-serif;
  font-weight: 500;
  color: var(--color-green-700);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s;

  &:hover,
  &:focus {
    color: var(--color-green-900);
    text-decoration: underline;
  }
`;

function ArchivedInstructorRow({ instructor, index }) {
  const { editInstructor, isEditing } = useEditInstructor();

  function handleUnarchive() {
    editInstructor({
      instructor: { archived: false },
      id: instructor.id,
    });
  }
  const description = instructor.bioText.split(".").at(0).split("-").at(1);
  return (
    <Row>
      <Number>{index}</Number>
      <Img
        src={instructor.profileImage}
        alt={`${instructor.name}'s profile picture`}
      />
      <Instructor>{instructor.name}</Instructor>
      <Description>{capitalizeFirstLetter(description)}</Description>
      <Contact>
        <Email href={`mailto:${instructor.contactInfo.split(";")[0]}`}>
          <LuMail /> {instructor.contactInfo.split(";")[0]}
        </Email>
        <Phone href={`tel:${instructor.contactInfo.split(";")[1]}`}>
          <LuPhone /> {instructor.contactInfo.split(";")[1]}
        </Phone>
      </Contact>

      <Button onClick={handleUnarchive} disabled={isEditing}>
        <LuArchive />
        <span>Восстановить</span>
      </Button>
    </Row>
  );
}

export default ArchivedInstructorRow;
