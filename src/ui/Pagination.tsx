import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  border-radius: var(--border-radius-tiny);
  background-color: var(--color-grey-100);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
  }
`;

const P = styled.p`
  font-size: 1.5rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }

  @media (max-width: 768px) {
    /* font-size: 1.2rem; */
    margin-left: 0;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 1.3rem;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;

  @media (max-width: 768px) {
    gap: 0.4rem;
  }
`;

const PaginationButton = styled.button<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;

    & svg {
      height: 1.6rem;
      width: 1.6rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 0;
    padding: 0.6rem;

    & svg {
      height: 2.4rem;
      width: 2.4rem;
    }

    span {
      display: none;
    }
  }
`;

function Pagination({ count, pageSize }: { count: number; pageSize: number }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / pageSize);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", String(next));
    setSearchParams(searchParams);
    if (window.innerWidth <= 1100) {
      const pagination = document.getElementById("pagination");
      if (pagination) pagination.scrollIntoView({ behavior: "smooth" });
    }
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", String(prev));
    setSearchParams(searchParams);
    if (window.innerWidth <= 1100) {
      const pagination = document.getElementById("pagination");
      if (pagination) pagination.scrollIntoView({ behavior: "smooth" });
    }
  }

  if (pageCount <= 1) return null;

  return (
    <StyledPagination>
      <P>
        Показано с <span>{(currentPage - 1) * pageSize + 1} </span>по
        <span>
          {" "}
          {currentPage === pageCount ? count : currentPage * pageSize}{" "}
        </span>
        из <span>{count}</span> результатов
      </P>

      <Buttons>
        <PaginationButton onClick={prevPage} disabled={currentPage === 1}>
          <LuChevronLeft /> <span>Предыдущая</span>
        </PaginationButton>

        <PaginationButton
          onClick={nextPage}
          disabled={currentPage === pageCount}
        >
          <span>Следующая</span>
          <LuChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
