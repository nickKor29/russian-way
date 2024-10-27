import { useState } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUser } from "./useUser";
import DragAndDrop from "../../ui/DragAndDrop";
import { useUpdateUser } from "./useUpdateUser";

function UpdateUserDataForm() {
  const {
    user: {
      email = "",
      user_metadata: { fullName: currentFullName } = {},
    } = {},
  } = useUser(); // Безопасная деструктуризация

  const { updateUser, isUpdating } = useUpdateUser();

  const [fullName, setFullName] = useState(currentFullName);
  const [avatar, setAvatar] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  function handleDrop(file) {
    setAvatar(file[0]);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Адрес электронной почты">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Полное имя">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Изображение аватара">
        <DragAndDrop onDrop={handleDrop} avatar={avatar} />
      </FormRow>
      <FormRow>
        <Button
          onClick={handleCancel}
          disabled={isUpdating}
          type="reset"
          variation="secondary"
        >
          Отмена
        </Button>
        <Button disabled={isUpdating}>Обновить аккаунт</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
