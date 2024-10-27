import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function ToursOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="available"
        options={[
          { value: "all", label: "Все туры" },
          { value: "true", label: "Доступные туры" },
          { value: "false", label: "Недоступные туры" },
        ]}
      />
      <SortBy
        options={[
          { value: "regularPrice-asc", label: "Цена: по возрастанию" },
          { value: "regularPrice-desc", label: "Цена: по убыванию" },
          { value: "startDate-asc", label: "Дата: сначала старые" },
          { value: "startDate-desc", label: "Дата: сначала новые" },
          {
            value: "maxParticipants-asc",
            label: "Максимум участников: по возрастанию",
          },
          {
            value: "maxParticipants-desc",
            label: "Максимум участников: по убыванию",
          },
        ]}
        defaultValue={"startDate-desc"}
      />
    </TableOperations>
  );
}

export default ToursOperations;
