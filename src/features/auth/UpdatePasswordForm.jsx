import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import { useUpdateUser } from "./useUpdateUser";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, getValues, reset } = useForm();
  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: reset });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Новый пароль (минимум 8 символов)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "Это поле обязательно для заполнения",
            minLength: {
              value: 8,
              message: "Пароль должен состоять минимум из 8 символов",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Подтвердите пароль"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Это поле обязательно для заполнения",
            validate: (value) =>
              getValues().password === value || "Пароли должны совпадать",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Отмена
        </Button>
        <Button disabled={isUpdating}>Обновить пароль</Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
