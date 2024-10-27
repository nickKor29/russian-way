import styled from "styled-components";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonText from "../../ui/ButtonText";
import Row from "../../ui/Row";
import ButtonGroup from "../../ui/ButtonGroup";
import { useMoveBack } from "../../hooks/useMoveBack";
import ReviewBox from "./ReviewBox";
import { useReview } from "./useReview";
import Spinner from "../../ui/Spinner";
import Checkbox from "../../ui/Checkbox";
import Button from "../../ui/Button";
import { useState } from "react";
import { useChangeStatus } from "./useChangeStatus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteReview } from "./useDeleteReview";
import { useNavigate } from "react-router-dom";
import { ButtonVariation, Review } from "../../utils/types";

// interface Review {
//   id: number;
//   status: "Одобрено" | "Отклонено" | "Ожидает";
//   comment: string; // добавьте нужные поля
//   created_at: string; // или Date
//   rating: number;
//   tourId: number;
//   tours: {
//     endDate: string;
//     images: (string | File)[];
//     instructors: {
//       id: number;
//       name: string;
//       profileImage: string;
//     };
//     startDate: string;
//     title: string;
//   };
//   users: {
//     fullName: string;
//   };
// }

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  @media (max-width: 480px) {
    padding: 2.4rem 2rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  resize: none;
`;

const ButtonBack = styled(ButtonText)`
  margin-left: auto;
`;

const statusToTagName = {
  Одобрено: "green",
  Отклонено: "red",
  Ожидает: "yellow",
} as const;

function ReviewDetails() {
  const [confirmApprove, setConfirmApprove] = useState(false);
  const [rejectionReason, setRejectionReason] = useState<string | undefined>(); // Указываем тип

  const { changeStatus, isChanging } = useChangeStatus();
  const { deleteReview, isDeleting } = useDeleteReview();
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const { review, isGettingReview } = useReview() as {
    review: Review;
    isGettingReview: boolean;
  }; // Указываем тип для review

  console.log(rejectionReason);

  function hadnleChangeStatus() {
    if (confirmApprove && !rejectionReason) {
      changeStatus({ status: "Одобрено" });
    } else if (rejectionReason && !confirmApprove) {
      changeStatus({ status: "Отклонено", rejectionReason });
    }
  }

  function onConfirmDelete() {
    deleteReview(review.id, {
      onSuccess: () => navigate("/reviews"),
    });
  }

  if (isGettingReview || isChanging) return <Spinner />;

  return (
    <Modal>
      {window.innerWidth <= 400 && (
        <ButtonBack onClick={moveBack}>&larr; Назад</ButtonBack>
      )}
      <Row type="horizontal" $isMargin={true}>
        <HeadingGroup>
          <Heading as="h1">Отзыв #{review.id}</Heading>
          <Tag $color={statusToTagName[review.status]}>{review.status}</Tag>
        </HeadingGroup>
        {window.innerWidth > 400 && (
          <ButtonText onClick={moveBack}>&larr; Назад</ButtonText>
        )}
      </Row>
      <ReviewBox review={review} />
      {review.status === "Ожидает" && (
        <Box>
          <Checkbox
            checked={confirmApprove}
            onChange={() => setConfirmApprove((confirm) => !confirm)}
            id="confirm"
            disabled={confirmApprove || rejectionReason !== undefined}
          >
            Подтвердите, что отзыв удовлетворяет вашей политике компании.
          </Checkbox>

          <TextArea
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
            placeholder="Если вы хотите отклонить отзыв, оставьте здесь причину"
            disabled={confirmApprove}
          />
        </Box>
      )}
      <ButtonGroup>
        {review.status === "Ожидает" && confirmApprove && (
          <Button onClick={hadnleChangeStatus}>Одобрить</Button>
        )}
        {review.status === "Ожидает" && rejectionReason && (
          <Button onClick={hadnleChangeStatus}>Отклонить</Button>
        )}
        {review.status === "Отклонено" && (
          <Modal.Open opens="delete">
            <Button variation={ButtonVariation.Danger}>
              Удалить отзыв #{review.id}
            </Button>
          </Modal.Open>
        )}
        <Button
          variation={ButtonVariation.Secondary}
          onClick={() => navigate("/reviews")}
        >
          Назад
        </Button>
      </ButtonGroup>
      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName={`отзыв #${review.id}`}
          onConfirm={onConfirmDelete}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ReviewDetails;
