import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import ButtonGroup from "../../ui/ButtonGroup";

// Регулярное выражение для email: /\S+@\S+\.\S+/
// ^\+?\d{1,3}?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$

function SignupForm() {
  const { signup, isPending } = useSignup();

  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  function onSubmit({ fullName, email, password, phone }) {
    signup(
      {
        fullName,
        email,
        password,
        phone,
      },
      {
        onSettled: reset,
      }
    );
  }
  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow label="Полное имя" error={errors?.fullName?.message}>
          <Input
            type="text"
            id="fullName"
            {...register("fullName", {
              required: "Необходимо заполнить это поле",
            })}
            disabled={isPending}
          />
        </FormRow>

        <FormRow label="Электронная почта" error={errors?.email?.message}>
          <Input
            type="email"
            id="email"
            {...register("email", {
              required: "Необходимо заполнить это поле",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Укажите правильный email",
              },
            })}
            disabled={isPending}
          />
        </FormRow>
        <FormRow label="Телефон" error={errors?.phone?.message}>
          <InputMask
            mask="+7 (999) 999-99-99"
            {...register("phone", {
              required: "Необходимо заполнить номер телефона",
              pattern: {
                value:
                  /^\+?\d{1,3}?[-.\s]?(\(?\d{1,4}?\)?[-.\s]?)?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
                message: "Укажите правильный номер телефона",
              },
            })}
          >
            {(inputProps) => <Input type="tel" {...inputProps} />}
          </InputMask>
        </FormRow>

        <FormRow
          label="Пароль (минимум 8 символов)"
          error={errors?.password?.message}
        >
          <Input
            type="password"
            id="password"
            {...register("password", {
              required: "Необходимо заполнить это поле",
              minLength: {
                value: 8,
                message: "Пароль должен состоять не менее из 8 символов",
              },
            })}
            disabled={isPending}
          />
        </FormRow>

        <FormRow
          label="Повторите пароль"
          error={errors?.passwordConfirm?.message}
        >
          <Input
            type="password"
            id="passwordConfirm"
            {...register("passwordConfirm", {
              required: "Необходимо заполнить это поле",
              validate: (value) =>
                value === getValues().password || "Пароли не совпадают",
            })}
            disabled={isPending}
          />
        </FormRow>

        <ButtonGroup>
          <Button disabled={isPending}>Создать нового пользователя</Button>
          <Button variation="secondary" type="reset" disabled={isPending}>
            Отмена
          </Button>
        </ButtonGroup>
      </Form>
    </>
  );
}

export default SignupForm;
