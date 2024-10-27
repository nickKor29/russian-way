import { LuSearch, LuTrash2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useInTable } from "../../hooks/useInTable";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/TableExp";
import Tag from "../../ui/Tag";
import { formatDate } from "../../utils/helpers";
import { useDeleteReview } from "./useDeleteReview";
import { Review } from "../../utils/types";

const StarRating = styled.div`
  color: gold;
  font-size: 1.6rem;
`;

function ReviewRow({ review }: { review: Review }) {
  const isInTable = useInTable();
  const navigate = useNavigate();
  const { deleteReview, isDeleting } = useDeleteReview();

  const statusToTagName = {
    Одобрено: "green",
    Ожидает: "yellow",
    Отклонено: "red",
  };
  return (
    <Modal>
      <Table.Row>
        <Table.Td dataCell="ID">{review.id}</Table.Td>
        <Table.Td dataCell="Дата">{formatDate(review.created_at)}</Table.Td>
        <Table.Td dataCell="Рейтинг">
          <StarRating>{"★".repeat(review.rating)}</StarRating>
        </Table.Td>
        <Table.Td dataCell="Комментарий">
          {review.comment.replace(/;/g, ", ")}
        </Table.Td>
        <Table.Td dataCell="Статус">
          <Tag $color={statusToTagName[review.status]}>{review.status}</Tag>
        </Table.Td>
        <Table.ActionTd dataCell="Действия">
          <Menus.Menu $isInTable={isInTable}>
            <Menus.Toggle id={review.id} />
            <Menus.List id={review.id}>
              <Menus.Button
                icon={<LuSearch />}
                onClick={() => navigate(`/reviews/${review.id}`)}
              >
                Просмотреть
              </Menus.Button>
              <Modal.Open opens="delete">
                <Menus.Button icon={<LuTrash2 />}>Удалить</Menus.Button>
              </Modal.Open>
            </Menus.List>
          </Menus.Menu>
        </Table.ActionTd>
      </Table.Row>
      <Modal.Window name="delete">
        <ConfirmDelete
          resourceName={`отзыв #${review.id}`}
          onConfirm={() => deleteReview(review.id)}
          disabled={isDeleting}
        />
      </Modal.Window>
    </Modal>
  );
}

export default ReviewRow;
