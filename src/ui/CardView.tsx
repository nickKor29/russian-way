import styled from "styled-components";
import { LuPhone, LuMail } from "react-icons/lu";
import Button from "./Button";

const Card = styled.div`
  border: 1px solid var(--color-grey-300);
  border-radius: 8px;
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  background-color: var(--color-grey-100);
  font-size: 1.6rem;

  h3 {
    margin-top: 0;
    font-size: 2rem;
  }

  p {
    margin: 12px 0;
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    padding: 1.2rem;
  }
`;

const StyledText = styled.p`
  margin-bottom: 0.5rem;
`;

const ContactLink = styled.a`
  display: flex;
  align-items: center;
  font-size: 1.6rem;
  color: var(--color-primary);
  text-decoration: none;
  margin-bottom: 8px;

  svg {
    margin-right: 8px;
    font-size: 1.6rem;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const ContactCont = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: start;
    gap: 1rem;
  }
`;

interface Instructor {
  id: number;
  name: string;
  bioText: string;
  contactInfo: string;
}

interface CardViewProps {
  data: Instructor[];
  onUnarchive: (id: number) => void;
}

function CardView({ data, onUnarchive }: CardViewProps) {
  return data.map((instructor) => (
    <Card key={instructor.id}>
      <h3>{instructor.name}</h3>
      <p>
        <strong>Описание:</strong> {instructor.bioText}
      </p>
      <StyledText>
        <strong>Контакты:</strong>
      </StyledText>
      <ContactCont>
        {instructor.contactInfo.split(";").map((contact) => {
          const trimmedContact = contact.trim();
          const isEmail = trimmedContact.includes("@");
          return (
            <ContactLink
              key={trimmedContact}
              href={
                isEmail ? `mailto:${trimmedContact}` : `tel:${trimmedContact}`
              }
            >
              {isEmail ? <LuMail /> : <LuPhone />}
              {trimmedContact}
            </ContactLink>
          );
        })}
      </ContactCont>
      <Button onClick={() => onUnarchive(instructor.id)}>
        Вернуть из архива
      </Button>
    </Card>
  ));
}

export default CardView;
