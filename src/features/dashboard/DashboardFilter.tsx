import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField="last"
      options={[
        { value: "180", label: "Полгода" },
        { value: "365", label: "Год" },
        { value: "all", label: "Все время" },
      ]}
    />
  );
}

export default DashboardFilter;
