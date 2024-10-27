import styled from "styled-components";
import { useUser } from "../features/auth/useUser";
import Spinner from "./Spinner";
import { useNavigate } from "react-router-dom";
import { ReactElement, useEffect } from "react";
const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;
function ProtectedRoute({ children }: { children: ReactElement }) {
  const navigate = useNavigate();
  const { isAuthenticated, isPending } = useUser();
  useEffect(
    function () {
      if (!isAuthenticated && !isPending) navigate("/login");
    },
    [isAuthenticated, isPending, navigate]
  );
  if (isPending)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
