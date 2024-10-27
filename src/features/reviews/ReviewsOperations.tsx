import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function ReviewsOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "all", label: "Все отзывы" },
          { value: "Одобрено", label: "Одобрено" },
          { value: "Ожидает", label: "Ожидает" },
          { value: "Отклонено", label: "Отклонено" },
        ]}
      />
      <SortBy
        options={[
          { value: "created_at-asc", label: "Дата: сначала старые" },
          { value: "created_at-desc", label: "Дата: сначала новые" },
          { value: "rating-asc", label: "Рейтинг: по возрастанию" },
          { value: "rating-desc", label: "Рейтинг: по убыванию" },
        ]}
        defaultValue={"created_at-desc"}
      />
    </TableOperations>
  );
}

export default ReviewsOperations;
