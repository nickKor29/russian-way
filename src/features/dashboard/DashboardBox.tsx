import styled from "styled-components";

const DashboardBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  @media (max-width: 400px) {
    padding: 1.2rem;
  }
`;

export default DashboardBox;
