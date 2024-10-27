import { isAfter, isBefore } from "date-fns";
import { useEffect, useState } from "react";
import { LuCopy, LuMail, LuPhone, LuSearch, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useInTable } from "../../hooks/useInTable";
import CannotDeleteModalContent from "../../ui/CannotDelete";
import CannotDeleteWithFutureTours from "../../ui/CannotDeleteWithFutureTours";
import ConfirmArchive from "../../ui/ConfirmArchive";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/TableExp";
import { useDeleteSertificate } from "../sertificates/useDeleteSertificate";
import { useTours } from "../tours/useTours";
import { useDeleteInstructors } from "./useDeleteInstructors";
import { useEditInstructor } from "./useEditInstructor";
import { InstructorFull, TourData } from "../../utils/types";

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

function InstructorRow({
  instructor,
  index,
}: {
  instructor: InstructorFull;
  index: number;
}) {
  const { tours } = useTours({
    option: "instructorId",
    optionValue: instructor.id,
  });
  const { deleteSertificate, isDeleting: isDeletingSertificate } =
    useDeleteSertificate();
  const { deleteInstructor, isDeleting: isDeletingInstructor } =
    useDeleteInstructors();
  const { editInstructor, isEditing } = useEditInstructor();
  const [modalType, setModalType] = useState<string>();
  const [upcomingTours, setUpcomingTours] = useState<TourData[]>();
  const navigate = useNavigate();
  const isInTable = useInTable();
  const {
    id: instructorId,
    profileImage,
    name,
    bioText,
    contactInfo,
  } = instructor;

  const description = bioText?.split(/[.-]/).at(1)?.trim() || "";
  const [email, phone] = contactInfo?.split(";") || ["", ""];

  function handleSee() {
    navigate(`/instructors/${instructorId}`);
  }
  function onConfirmDelete() {
    if (typeof instructorId === "number")
      deleteSertificate(
        { option: "instructorId", value: instructorId },
        {
          onSuccess: () => deleteInstructor(instructorId),
        }
      );
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
      // Если есть текущие туры, показываем модальное окно с невозможностью удаления
      setModalType("cannotDelete");
    } else if (hasPastTours) {
      // Если есть прошедшие туры, показываем модальное окно для архивирования
      setModalType("archive");
    } else if (upcomingToursResult?.length > 0) {
      // Если есть будущие туры, показываем модальное окно с будущими турами
      setModalType("cannotDeleteWithFutureTours");
    } else {
      // В противном случае, можем удалить
      setModalType("delete");
    }

    console.log(upcomingToursResult, instructorId); // Здесь будет правильный результат
  }, [tours]);
  return (
    // <Row>
    <Modal>
      <Table.Row>
        <Table.Td dataCell="Индекс">
          <Number>{index}</Number>
        </Table.Td>
        <Table.Td dataCell="Фото">
          <Img src={profileImage} alt={`${name}'s profile picture`} />
        </Table.Td>
        <Table.Td dataCell="Имя">
          <Instructor>{name}</Instructor>
        </Table.Td>
        <Table.Td dataCell="Описание">
          <Description>{description}</Description>
        </Table.Td>
        <Table.Td dataCell="Контакты">
          <Contact>
            <Email href={`mailto:${email}`}>
              <LuMail /> {email}
            </Email>
            <Phone href={`tel:${phone}`}>
              <LuPhone /> {phone}
            </Phone>
          </Contact>
        </Table.Td>
        <Table.ActionTd dataCell="Действия">
          <Menus.Menu $isInTable={isInTable}>
            <Menus.Toggle id={instructorId as number} />
            <Menus.List id={instructorId as number}>
              <Menus.Button icon={<LuCopy />}>Дублировать</Menus.Button>
              <Modal.Open opens={modalType as string}>
                <Menus.Button icon={<LuTrash2 />}>Удалить</Menus.Button>
              </Modal.Open>
              <Menus.Button icon={<LuSearch />} onClick={handleSee}>
                Просмотреть
              </Menus.Button>
            </Menus.List>
          </Menus.Menu>
        </Table.ActionTd>

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
      </Table.Row>
    </Modal>
  );
}

export default InstructorRow;
