import { useState } from "react";
import styled from "styled-components";
import Button from "../../ui/Button";
import SpinnerMini from "../../ui/SpinnerMini";
import { useLogin } from "./useLogin";

const StyledForm = styled.form`
  color: #fff;
  display: flex;
  flex-direction: column;
  background: transparent;
  gap: 4rem;
  padding: 3rem 4rem;
  width: 100%;

  /* Адаптивность */
  @media (max-width: 768px) {
    padding: 2rem;
    gap: 3rem;
  }

  @media (max-width: 480px) {
    padding: 1rem;
    gap: 2rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
`;

const InputBox = styled.div`
  width: 100%;
  height: 5rem;
  font-size: 1.6rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  /* Адаптивность */
  @media (max-width: 768px) {
    margin-bottom: 1.5rem;
    gap: 1rem;
  }

  @media (max-width: 480px) {
    height: auto;
    gap: 0.8rem;
    margin-bottom: 1rem;
  }
`;

const Label = styled.label`
  font-size: 1.4rem;

  /* Адаптивность */
  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  color: white !important;
  border: 1px solid transparent;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 40px;
  padding: 2rem 4.5rem 2rem 2rem;
  outline: none;
  transition: 0.3s;

  &:focus {
    outline: 2px solid rgba(255, 255, 255, 0.4);
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }
  &:disabled {
    background: rgba(255, 255, 255, 0.3);
  }
  /* Адаптивность */
  @media (max-width: 768px) {
    padding: 1.5rem 3.5rem 1.5rem 1.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 2.5rem 1rem 1rem;
  }
`;

const LoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4rem;
  padding: 1.5rem 3rem;

  /* Адаптивность */
  @media (max-width: 768px) {
    padding: 1.2rem 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 2rem;
  }
`;

const LoginLayout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem; /* Добавим отступы по бокам */

  /* Ограничим максимальную ширину */
  @media (max-width: 768px) {
    padding: 0 3rem;
  }

  @media (max-width: 480px) {
    padding: 0 2rem;
  }
`;

function LoginForm() {
  const [email, setEmail] = useState("nick@example.com");
  const [password, setPassword] = useState("password123");
  const { login, isPending } = useLogin();
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  }
  return (
    <LoginLayout>
      <StyledForm onSubmit={handleSubmit}>
        <InputBox>
          <Label>Почта</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            placeholder="Почта"
            disabled={isPending}
          />
        </InputBox>
        <InputBox>
          <Label>Пароль</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            required
            placeholder="Пароль"
            disabled={isPending}
          />
        </InputBox>
        <LoginButton>{!isPending ? "Войти" : <SpinnerMini />}</LoginButton>
      </StyledForm>
    </LoginLayout>
  );
}

export default LoginForm;
