import styled from "styled-components";
import Menus from "../../ui/Menus";
import Pagination from "../../ui/Pagination";
import Spinner from "../../ui/Spinner";
import AddTour from "./AddTour";
import TourCard from "./TourCard";
import { useTours } from "./useTours";

const Table = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 350px;
  gap: 3rem;
  margin-bottom: 2rem;
  @media (max-width: 980px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

function ToursTable() {
  const { isPending: isLoading, count, tours } = useTours({});
  console.log(tours);
  if (isLoading) return <Spinner />;

  return (
    <>
      <Table>
        <Menus>
          <AddTour />
          {tours.map((tour) => (
            <TourCard tour={tour} key={tour.id} />
          ))}
        </Menus>
      </Table>
      <Pagination count={count} pageSize={5} />
    </>
  );
}

export default ToursTable;
