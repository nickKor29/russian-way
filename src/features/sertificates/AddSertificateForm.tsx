import DatePicker from "react-datepicker";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { LuAward } from "react-icons/lu";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCreateSertificate } from "./useCreateSertificate";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import IconWrapper from "../../ui/IconWrapper";
import InlineInput from "../../ui/Input";
import { formatDateToCustomISO } from "../../utils/helpers";
import { ButtonVariation, Sertificate } from "../../utils/types";

const Form = styled.form`
  // стили
`;

const FormGroup = styled.div`
  // стили
`;

const Label = styled.label`
  // стили
`;

const SertificateInput = styled(InlineInput)`
  // стили
`;

function AddSertificateForm({ onClose }: { onClose: () => void }) {
  const { instructorId } = useParams();
  const { createSertificate, isCreating } = useCreateSertificate();

  // Указываем тип данных формы явно через обобщения
  const { register, handleSubmit, control, reset } = useForm<Sertificate>();

  const onSubmit: SubmitHandler<Sertificate> = (data) => {
    console.log(instructorId);
    console.log(data);
    console.log({
      ...data,
      dateIssue: new Date(data.dateIssue).toISOString(),
      expirationDate: new Date(data.expirationDate).toISOString(),
      instructorId: Number(instructorId),
    });

    createSertificate({
      ...data,
      dateIssue: formatDateToCustomISO(data.dateIssue as Date),
      expirationDate: formatDateToCustomISO(data.expirationDate as Date),
      instructorId: Number(instructorId),
    });
    onClose();
    reset();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <IconWrapper>
        <LuAward />
      </IconWrapper>
      <FormGroup>
        <Label htmlFor="title">Название:</Label>
        <SertificateInput
          disabled={isCreating}
          id="title"
          type="text"
          {...register("title", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="organization">Выдано:</Label>
        <SertificateInput
          disabled={isCreating}
          id="organization"
          type="text"
          {...register("organization", { required: true })}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="dateIssue">Дата выдачи</Label>
        <Controller
          control={control}
          name="dateIssue"
          render={({ field }) => (
            <DatePicker
              dateFormat="dd.MM.yyyy"
              locale="ru"
              selected={
                typeof field.value === "string"
                  ? new Date(field.value)
                  : field.value
              }
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="expirationDate">Срок действия:</Label>

        <Controller
          control={control}
          name="expirationDate"
          render={({ field }) => (
            <DatePicker
              dateFormat="dd.MM.yyyy"
              locale="ru"
              selected={
                typeof field.value === "string"
                  ? new Date(field.value)
                  : field.value
              }
              onChange={(date) => field.onChange(date)}
            />
          )}
        />
      </FormGroup>
      <FormGroup>
        <Label htmlFor="description">Добавить описание:</Label>
        <SertificateInput
          disabled={isCreating}
          id="description"
          type="text"
          {...register("description")}
        />
      </FormGroup>
      <ButtonGroup>
        <Button type="submit">Добавить</Button>
        <Button
          variation={ButtonVariation.Danger}
          type="button"
          onClick={() => {
            reset();
            onClose();
          }}
        >
          Отменить
        </Button>
      </ButtonGroup>
    </Form>
  );
}

export default AddSertificateForm;
