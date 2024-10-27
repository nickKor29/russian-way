import { isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { LuMail, LuPhone, LuSearch, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CannotDeleteModalContent from "../../ui/CannotDelete";
import CannotDeleteWithFutureTours from "../../ui/CannotDeleteWithFutureTours";
import ConfirmArchive from "../../ui/ConfirmArchive";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import { useDeleteSertificate } from "../sertificates/useDeleteSertificate";
import { useTours } from "../tours/useTours";
import { useDeleteInstructors } from "./useDeleteInstructors";
import { useEditInstructor } from "./useEditInstructor";
import { InstructorFull, TourData } from "../../utils/types";

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  background-color: var(--color-grey-0);
  padding: 1rem;
`;

const Img = styled.img`
  max-width: 100%;

  height: auto;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  border-radius: 0.4rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
`;

const Instructor = styled.div`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--color-grey-600);
`;

const Description = styled.div`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  line-height: 1.4;

  &::first-letter {
    text-transform: uppercase;
  }
  @media (max-width: 460px) {
    margin-bottom: 1rem;
  }
`;

const Contact = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  @media (max-width: 460px) {
    gap: 1.2rem;
    padding: 0 50rem;
    align-items: center;
  }
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
  @media (max-width: 460px) {
    font-size: 1.5rem;
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

const MenuWrapper = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  z-index: 10;
`;

function InstructorRowMobile({ instructor }: { instructor: InstructorFull }) {
  const { tours } = useTours({
    option: "instructorId",
    optionValue: instructor.id,
  });
  console.log(tours);
  const { deleteSertificate, isDeleting: isDeletingSertificate } =
    useDeleteSertificate();
  const { deleteInstructor, isDeleting: isDeletingInstructor } =
    useDeleteInstructors();
  const { editInstructor, isEditing } = useEditInstructor();
  const [modalType, setModalType] = useState<string>();
  const [upcomingTours, setUpcomingTours] = useState<TourData[]>();
  const navigate = useNavigate();
  const {
    id: instructorId,
    profileImage: image,
    name,
    bioText,
    contactInfo,
  } = instructor;

  function onConfirmDelete() {
    if (typeof instructorId === "number") {
      deleteSertificate(
        { option: "instructorId", value: instructorId },
        {
          onSuccess: () => deleteInstructor(instructorId),
        }
      );
    } else {
      // Обработка ошибки, если instructorId неопределен
      console.error("instructorId is undefined or not a number");
    }
  }

  function handleArchiveInstructor() {
    if (typeof instructor.id === "number") {
      editInstructor({
        instructor: {
          archived: true,
        },
        id: instructor.id,
      });
    }
  }

  function handleSee() {
    navigate(`/instructors/${instructorId}`);
  }

  useEffect(() => {
    const hasCurrentTours = tours?.some(
      (tour) =>
        isBefore(new Date(tour.startDate), new Date()) &&
        isAfter(new Date(tour.endDate), new Date())
    );

    const hasPastTours = tours?.some((tour) =>
      isBefore(new Date(tour.endDate), new Date())
    );

    const upcomingToursResult = tours?.filter((tour) =>
      isBefore(new Date(), new Date(tour.startDate))
    );

    setUpcomingTours(upcomingToursResult);

    if (hasCurrentTours) {
      setModalType("cannotDelete");
    } else if (hasPastTours) {
      setModalType("archive");
    } else if (upcomingToursResult?.length > 0) {
      setModalType("cannotDeleteWithFutureTours");
    } else {
      setModalType("delete");
    }

    console.log(upcomingToursResult, instructorId);
  }, [tours]);

  const description = bioText?.split?.(/[.-]/)?.at?.(1)?.trim() || "";
  const [email, phone] = contactInfo?.split(";") || ["", ""];

  return (
    <Card>
      <Modal>
        <Menus>
          <MenuWrapper>
            <Menus.Menu $isInTable={true}>
              <Menus.Toggle id={instructorId as number} />
              <Menus.List id={instructorId as number}>
                <Modal.Open opens={modalType as string}>
                  <Menus.Button icon={<LuTrash2 />}>Удалить</Menus.Button>
                </Modal.Open>
                <Menus.Button icon={<LuSearch />} onClick={handleSee}>
                  Просмотреть
                </Menus.Button>
              </Menus.List>
            </Menus.Menu>
          </MenuWrapper>
          <Img src={image} alt={`${name}'s profile picture`} />
          <Instructor>{name}</Instructor>
          <Description>{description}</Description>
          <Contact>
            <Email href={`mailto:${email}`}>
              <LuMail /> {email}
            </Email>
            <Phone href={`tel:${phone}`}>
              <LuPhone /> {phone}
            </Phone>
          </Contact>
        </Menus>
        <Modal.Window name="cannotDelete">
          <CannotDeleteModalContent onCloseModal={() => setModalType("")} />
        </Modal.Window>

        <Modal.Window name="cannotDeleteWithFutureTours">
          <CannotDeleteWithFutureTours
            futureTours={upcomingTours as TourData[]}
          />
        </Modal.Window>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={`иструктора ${name}`}
            onConfirm={onConfirmDelete}
            disabled={isDeletingInstructor || isDeletingSertificate}
          />
        </Modal.Window>
        <Modal.Window name="archive">
          <ConfirmArchive
            resourceName={`инструктора ${name}`}
            onConfirm={handleArchiveInstructor}
            disabled={isEditing}
          />
        </Modal.Window>
      </Modal>
    </Card>
  );
}

export default InstructorRowMobile;
