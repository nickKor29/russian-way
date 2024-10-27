import styled from "styled-components";

// Ваши стили
const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  margin-bottom: 3rem;
`;

const StyledTable = styled.table`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-200);
  margin: 0 auto;
  border-collapse: collapse;
  width: 100%;
  border-radius: 7px;
  font-size: 1.6rem;
`;

const commonStyle = `
  padding: 2rem;
`;

const StyleTh = styled.th`
  text-align: left;
  padding: 1.6rem 2.4rem;
  color: var(--color-grey-600);
  @media (max-width: 1100px) {
    display: none;
  }
`;

const StyledHeader = styled.tr`
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;
  width: 100%;

  &:not(:has(*)) {
    display: none;
  }
`;
const StyleTd = styled.td`
  ${commonStyle}

  @media (max-width: 1100px) {
    display: grid;
    grid-template-columns: 13ch auto;
    gap: 1rem;
    padding: 0.5rem 1rem;

    &:first-child {
      padding-top: 2rem;
    }
    &:last-child {
      padding-bottom: 2rem;
    }

    &::before {
      content: attr(data-cell) ": ";
      font-weight: 700;
      text-transform: capitalize;
    }
  }
`;

const StyledActionTd = styled(StyleTd)`
  &::before {
    content: "";
  }
`;

const StyledTr = styled.tr`
  position: relative;
  &:nth-of-type(2n) {
    background-color: var(--color-grey-100);
  }
`;

interface TableProps {
  children: React.ReactNode;
}

function Table({ children }: TableProps) {
  return (
    <ScrollContainer>
      <StyledTable>{children}</StyledTable>
    </ScrollContainer>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <thead>
      <StyledHeader>{children}</StyledHeader>
    </thead>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <StyledTr>{children}</StyledTr>;
}

function Th({ children }: { children: React.ReactNode }) {
  return <StyleTh>{children}</StyleTh>;
}

function Td({
  children,
  dataCell,
}: {
  children: React.ReactNode;
  dataCell?: string;
}) {
  return <StyleTd data-cell={dataCell}>{children}</StyleTd>;
}
function ActionTd({
  children,
  dataCell,
}: {
  children: React.ReactNode;
  dataCell?: string;
}) {
  return <StyledActionTd data-cell={dataCell}>{children}</StyledActionTd>;
}

function Body({ children }: { children: React.ReactNode }) {
  return <tbody>{children}</tbody>;
}

// Экспортируем компоненты как части таблицы
Table.Header = Header;
Table.Body = Body;
Table.Footer = Footer;
Table.Row = Row;
Table.Th = Th;
Table.Td = Td;
Table.ActionTd = ActionTd;

export default Table;
