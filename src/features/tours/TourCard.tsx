import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import TourDate from "./TourDate";
import Menus from "../../ui/Menus";
import { LuTrash2, LuCopy } from "react-icons/lu";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteTour } from "./useDeleteTour";
import { useCreateTour } from "./useCreateTour";
import { TourData } from "../../utils/types";

const TourCard = styled.div`
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  height: 350px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 300ms;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const TourImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TourContent = styled.div`
  position: absolute;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  width: 100%;
  padding: 40px 20px 20px 20px;
  bottom: 0;
  z-index: 10;
`;

const TourTitle = styled.p`
  font-size: 2.2rem;
  color: #fff;
`;

function ToursCard({ tour }: { tour: TourData }) {
  const { deleteTour, isDeleting } = useDeleteTour();
  const { createTour, isCreatingTour } = useCreateTour();

  const {
    title,
    id: tourId,
    images: [mainImage],
    startDate,
    endDate,
    description,
    itinerary,
    regularPrice,
    discount,
    maxParticipants,
    currentParticipants,
    location,
    difficultyLevel,
    category,
    instructorId,
    images,
  } = tour;
  function handleDuplicate() {
    createTour({
      tour: {
        startDate,
        endDate,
        description,
        itinerary,
        regularPrice,
        discount,
        maxParticipants,
        currentParticipants: 0,
        location,
        difficultyLevel,
        category,
        instructorId,
        images,
        available: false,
        title: `Копия тура ${title}`,
      },
    });
  }
  return (
    <TourCard>
      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={tourId as number} />
          <Menus.List id={tourId as number}>
            <Menus.Button icon={<LuCopy />} onClick={handleDuplicate}>
              Дублировать
            </Menus.Button>
            <Modal.Open opens="delete">
              <Menus.Button icon={<LuTrash2 />}>Удалить</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>
        <Modal.Window name="delete">
          <ConfirmDelete
            resourceName={`тур #${tourId}`}
            disabled={isDeleting}
            onConfirm={() => deleteTour(tourId as number)}
          />
        </Modal.Window>
      </Modal>
      <Link to={`/tours/${tourId}`}>
        <TourImage
          src={mainImage as string}
          alt={`Главное фото тура ${title}`}
        />
        <TourContent>
          <TourDate startDate={startDate} endDate={endDate} />
          <TourTitle>{title}</TourTitle>
        </TourContent>
      </Link>
    </TourCard>
  );
}

export default ToursCard;
