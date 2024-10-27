import { useSearchParams } from "react-router-dom";
import SortSelect from "./SortSelect";
import { ChangeEvent } from "react";
interface Props {
  options: { value: string; label: string }[];
  defaultValue: string;
}
function SortBy({ options, defaultValue }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortBy") || "";
  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }
  return (
    <SortSelect
      $type="white"
      options={options}
      defaultValue={defaultValue}
      onChange={handleChange}
      value={sortBy}
    ></SortSelect>
  );
}

export default SortBy;
