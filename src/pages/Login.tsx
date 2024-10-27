import styled from "styled-components";
import Heading from "../ui/Heading";
import LoginForm from "../features/auth/LoginForm";

const LoginLayout = styled.main`
  position: relative;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 45rem;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-image: url("/bg.jpg");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: var(--color-grey-50);

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: 1;
  }

  & > * {
    position: relative;
    z-index: 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 32rem;
    gap: 2.4rem;
  }

  @media (max-width: 576px) {
    grid-template-columns: 28rem;
    gap: 2rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 100%;
    padding: 0 1.6rem;
  }
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h4">Войти в аккаунт</Heading>
      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
