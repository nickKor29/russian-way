import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import Table from "../../ui/TableExp";
import { PAGE_SIZE_USUAL } from "../../utils/constants";
import ReviewRow from "./ReviewRow";
import { useGetReviews } from "./useGetReviews";

function ReviewsDetails() {
  const { reviews, count, isGettingReviews } = useGetReviews();
  if (isGettingReviews) return <Spinner />;

  return (
    <Menus>
      <Table>
        <Table.Header>
          <Table.Th>ID</Table.Th>
          <Table.Th>Дата</Table.Th>
          <Table.Th>Рейтинг</Table.Th>
          <Table.Th>Комментарий</Table.Th>
          <Table.Th>Статус</Table.Th>
          <Table.Th>&nbsp;</Table.Th>
        </Table.Header>
        <Table.Body>
          {reviews &&
            reviews.map((review) => (
              <ReviewRow key={review.id} review={review} />
            ))}
        </Table.Body>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <Table.Footer>
                <Pagination count={count ?? 0} pageSize={PAGE_SIZE_USUAL} />
              </Table.Footer>
            </td>
          </tr>
        </tfoot>
      </Table>
    </Menus>
  );
}

export default ReviewsDetails;
