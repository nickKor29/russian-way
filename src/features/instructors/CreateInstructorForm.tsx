import { useState } from "react";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DragAndDrop from "../../ui/DragAndDrop";
import InlineTextarea from "../../ui/InlineTextarea";
import { formatDateToCustomISO } from "../../utils/helpers";
import { useCreateInstructor } from "./useCreateInstructor";
import { useCreateSertificate } from "../sertificates/useCreateSertificate";
import { Sertificate } from "../../utils/types";

const FormContainer = styled.div`
  margin: 2rem auto;
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);
  max-height: 80vh;
  overflow-y: auto;
`;

const FormTitle = styled.h1`
  font-size: 2.4rem;
  color: var(--color-brand-700);
  margin-bottom: 30px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding-right: 15px; /* Отступ для прокрутки */
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1.4rem;
  color: var(--color-grey-700);
  font-weight: 500;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
  }
`;

const Select = styled.select`
  padding: 12px;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
  }
`;

const Textarea = styled.textarea`
  padding: 12px;
  font-size: 1.4rem;
  border: 1px solid var(--color-grey-300);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  color: var(--color-grey-800);
  resize: none;

  &:focus {
    border-color: var(--color-brand-600);
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 25px;
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--color-grey-0);
  border: none;
  border-radius: var(--border-radius-md);
  cursor: pointer;
  transition: background-color 0.3s;

  &.save {
    background-color: var(--color-brand-600);

    &:hover {
      background-color: var(--color-brand-700);
    }
  }

  &.cancel {
    background-color: var(--color-grey-500);

    &:hover {
      background-color: var(--color-grey-600);
    }
  }
`;

interface SubmitData {
  bioText: string;

  email: string;
  expirationDate_1: Date;

  name: string;

  phone: string;

  [key: `title_${number}`]: string;
  [key: `description_${number}`]: string;
  [key: `dateIssue_${number}`]: Date;
  [key: `expirationDate_${number}`]: Date;
  [key: `organization_${number}`]: string;
}

function AddInstructorForm() {
  const [numForms, setNumForms] = useState(1);
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined);
  const { createInstructor, isCreating } = useCreateInstructor();
  const { createSertificate, isCreating: isCreatingSertificate } =
    useCreateSertificate();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, control } = useForm<SubmitData>();

  const handleFormChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setNumForms(parseInt(event.target.value, 10));
  };

  const onSubmit = (data: SubmitData) => {
    const filteredObj = Object.fromEntries(
      Object.entries(data).filter(([key]) => key.includes("_"))
    );
    const groupedObjects = Object.entries(filteredObj).reduce(
      (acc: Record<string, Record<string, any>>, [key, value]) => {
        const suffix = key.split("_").pop();
        const newKey = key.slice(0, -2);

        if (suffix) {
          if (!acc[suffix]) {
            acc[suffix] = {};
          }
          acc[suffix][newKey] = value;
        }

        return acc;
      },
      {} as Record<string, Record<string, any>>
    );

    const result = Object.values(groupedObjects);
    createInstructor(
      {
        instructor: {
          name: data.name,
          bioText: data.bioText,
          contactInfo: `${data.email};${data.phone}`,
          profileImage,
        },
      },
      {
        onSuccess: (data) => {
          const sertificates: Sertificate[] = result.map((sert) => ({
            dateIssue: formatDateToCustomISO(sert.dateIssue),
            expirationDate: formatDateToCustomISO(sert.expirationDate),
            instructorId: data[0].id,
            description: sert.description || "",
            organization: sert.organization || "",
            title: sert.title || "",
          }));
          createSertificate(sertificates, {
            onSuccess: () => navigate(`/instructors/${data[0].id}`),
          });
        },
      }
    );
  };

  const handleDropImage = (files: File[]) => {
    setProfileImage(files[0]);
  };

  return (
    <FormContainer>
      <FormTitle>Добавить инструктора</FormTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="name">Имя инструктора</Label>
          <Input
            type="text"
            id="name"
            disabled={isCreating || isCreatingSertificate}
            {...register("name", {
              required: "Необходимо заполнить поле",
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label>Фото инструктора</Label>
          <DragAndDrop onDrop={handleDropImage} isRequired={true} />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="bioText">Описание</Label>
          <InlineTextarea
            id="bioText"
            rows={4}
            disabled={isCreating || isCreatingSertificate}
            {...register("bioText", {
              required: "Необходимо заполнить поле",
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Электронная почта</Label>
          <Input
            type="text"
            id="email"
            disabled={isCreating || isCreatingSertificate}
            {...register("email", {
              required: "Необходимо заполнить поле",
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">Номер телефона</Label>
          <Input
            type="text"
            id="phone"
            disabled={isCreating || isCreatingSertificate}
            {...register("phone", {
              required: "Необходимо заполнить поле",
            })}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="formCount">
            Количество форм для создания сертификатов
          </Label>
          <Select
            id="formCount"
            onChange={handleFormChange}
            value={numForms}
            disabled={isCreating || isCreatingSertificate}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Select>
        </FormGroup>

        {[...Array(numForms)].map((_, index) => (
          <div key={index}>
            <FormGroup>
              <Label htmlFor={`title_${index + 1}`}>
                Название сертификата {index + 1}
              </Label>
              <Input
                type="text"
                id={`title_${index + 1}`}
                disabled={isCreating || isCreatingSertificate}
                {...register(`title_${index + 1}`, {
                  required: "Необходимо заполнить поле",
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`description_${index + 1}`}>
                Описание сертификата {index + 1}
              </Label>
              <Textarea
                id={`description_${index + 1}`}
                rows={4}
                disabled={isCreating || isCreatingSertificate}
                {...register(`description_${index + 1}`, {
                  required: "Необходимо заполнить поле",
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`dateIssue_${index + 1}`}>
                Дата выдачи сертификата {index + 1}
              </Label>
              <Controller
                control={control}
                name={`dateIssue_${index + 1}`}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    placeholderText="Выберите дату"
                    disabled={isCreating || isCreatingSertificate}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`expirationDate_${index + 1}`}>
                Дата окончания сертификата {index + 1}
              </Label>
              <Controller
                control={control}
                name={`expirationDate_${index + 1}`}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    selected={field.value}
                    onChange={(date) => field.onChange(date)}
                    dateFormat="dd/MM/yyyy"
                    isClearable
                    placeholderText="Выберите дату"
                    disabled={isCreating || isCreatingSertificate}
                  />
                )}
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor={`organization_${index + 1}`}>
                Организация {index + 1}
              </Label>
              <Input
                type="text"
                id={`organization_${index + 1}`}
                disabled={isCreating || isCreatingSertificate}
                {...register(`organization_${index + 1}`, {
                  required: "Необходимо заполнить поле",
                })}
              />
            </FormGroup>
          </div>
        ))}

        <ButtonContainer>
          <Button
            type="submit"
            className="save"
            disabled={isCreating || isCreatingSertificate}
          >
            Сохранить
          </Button>
          <Button
            type="button"
            className="cancel"
            onClick={() => navigate(-1)}
            disabled={isCreating || isCreatingSertificate}
          >
            Отмена
          </Button>
        </ButtonContainer>
      </Form>
    </FormContainer>
  );
}

export default AddInstructorForm;
