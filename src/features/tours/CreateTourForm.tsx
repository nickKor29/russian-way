import { startOfToday } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { ReactElement, useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import {
  LuCalendar,
  LuFileQuestion,
  LuHelpCircle,
  LuImage,
} from "react-icons/lu";
import styled from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import "../../styles/datePicker.css";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import DragAndDrop from "../../ui/DragAndDrop";
import Error from "../../ui/FormError";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import InstructorSelect from "../../ui/Select";
import SimpleSelect from "../../ui/SimpleSelect";
import Spinner from "../../ui/Spinner";
import {
  calculateEndDate,
  formatCurrency,
  formatDateToCustomISO,
} from "../../utils/helpers";
import { useOccupiedInstructors } from "../instructors/useOccupiedInstructors";
import { useSettings } from "../settings/useSettings";
import { useCreateTour } from "./useCreateTour";
import ButtonGroup from "../../ui/ButtonGroup";
import { ButtonSize, ButtonVariation, TourData } from "../../utils/types";
const StyledIcon = styled(
  ({ icon: Icon, ...props }: { icon: React.ComponentType<any> }) => (
    <Icon {...props} />
  )
)`
  font-size: 3rem;
  color: var(--color-brand-800);
`;
registerLocale("ru", ru);

const FormContainer = styled.div`
  max-width: 80%;
  margin: 0 auto;
  padding: 2.5rem;
  border-radius: var(--border-radius-md);
  background-color: var(--color-grey-50);
  box-shadow: var(--shadow-lg);

  @media (max-width: 768px) {
    max-width: 95%;
    padding: 1.5rem;
  }
`;

const FormSection = styled.div`
  margin: 3rem 0;
  padding: 2rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }

  @media (max-width: 768px) {
    padding: 0;
    margin-bottom: 2rem;
  }
`;

const DateCont = styled.div`
  display: flex;
  gap: 2rem;
  max-width: 40%;

  @media (max-width: 768px) {
    flex-direction: column;
    max-width: 100%;
    gap: 1rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 2.6rem;
  font-weight: 600;
  color: var(--color-brand-800);
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const FormLabel = styled.label`
  font-size: 1.8rem;
  color: var(--color-grey-700);
  margin-bottom: 0.8rem;
  display: block;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.8rem;
  border: 1px solid var(--color-brand-200);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  transition: border-color 0.3s;
  background-color: var(--color-grey-0);

  &:focus {
    border-color: var(--color-brand-500);
    box-shadow: 0 0 5px var(--color-brand-100);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1.6rem;
  }
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 1rem;
  font-size: 1.8rem;
  border: 1px solid var(--color-brand-200);
  border-radius: var(--border-radius-md);
  margin-bottom: 1.5rem;
  resize: vertical;
  min-height: 10rem;
  transition: border-color 0.3s;
  background-color: var(--color-grey-0);

  &:focus {
    border-color: var(--color-brand-500);
    box-shadow: 0 0 5px var(--color-brand-100);
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1.6rem;
  }
`;

const DropContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin: 3rem 0;
  padding: 2rem;
  background-color: var(--color-grey-100);
  border-radius: var(--border-radius-md);

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin: 2rem 0;
    padding: 1rem;
  }
`;

function CreateTour() {
  const {
    register,
    handleSubmit,
    control,
    formState,
    setError,
    clearErrors,
    getValues,
    reset,
  } = useForm<TourData>();
  const {
    settings: {
      maxParticipantsInTour,
      difficultyLevels,
      minTourDuration,
      maxTourDuration,
      minParticipantsToStart,
      minTourPrice,
    } = {},
    isGettingSettings,
  } = useSettings();
  const { createTour, isCreatingTour } = useCreateTour();
  const [startDate, setStartDate] = useState<string | Date | null>(null);
  const [endDate, setEndDate] = useState<string | Date | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [secondImage, setSecondImage] = useState<File | null>(null);
  const [thirdImage, setThirdImage] = useState<File | null>(null);
  const { isLoadingOccupiedInstructors, occupiedInstructors } =
    useOccupiedInstructors({
      startDate: typeof startDate === "string" ? startDate : "",
      endDate: typeof endDate === "string" ? endDate : "",
    });

  const [instructorId, setInstructorId] = useState<number | null>(null);
  const { errors } = formState;
  const moveBack = useMoveBack();
  console.log(startDate, endDate);
  console.log(occupiedInstructors);
  const onSubmit = (data: TourData) => {
    if (!mainImage || !secondImage || !thirdImage) {
      setError("images", {
        type: "manual",
        message: "Необходимо загрузить все три изображения",
      });
      return;
    }

    clearErrors("images");
    data.images = [mainImage, secondImage, thirdImage];
    console.log(data);
    createTour({
      tour: {
        ...data,
        startDate: typeof startDate === "string" ? startDate : "",
        endDate: typeof endDate === "string" ? endDate : "",
        available: true,
        instructorId: instructorId !== null ? instructorId : 0,
        currentParticipants: 0,
      },
    });
  };

  const handleMainImageDrop = (files: File[]) => {
    console.log(files[0]);
    setMainImage(files[0]);
    clearErrors("images");
  };

  const handleSecondImageDrop = (files: File[]) => {
    setSecondImage(files[0]);
    clearErrors("images");
  };

  const handleThirdImageDrop = (files: File[]) => {
    setThirdImage(files[0]);
    clearErrors("images");
  };
  function handleReset() {
    reset();
    setMainImage(null);
    setSecondImage(null);
    setThirdImage(null);
    setStartDate(null);
    setEndDate(null);
    setInstructorId(null);
    console.log(thirdImage);
  }
  if (isLoadingOccupiedInstructors || isGettingSettings) return <Spinner />;
  const options = difficultyLevels.map((level: string) => ({
    value: level,
    name: level,
  }));
  console.log(occupiedInstructors);
  return (
    <FormContainer>
      <Row type="horizontal">
        <Heading as="h1">Создать новый тур</Heading>
        <ButtonText onClick={moveBack}>&larr; Назад</ButtonText>
      </Row>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSection>
          <FormTitle>
            <StyledIcon icon={LuFileQuestion} />
            <span>Основная информация</span>
          </FormTitle>
          <FormLabel htmlFor="title">Название тура</FormLabel>
          {errors?.title?.message && <Error>{errors.title.message}</Error>}
          <FormInput
            type="text"
            id="title"
            disabled={isCreatingTour}
            {...register("title", {
              required: "Это поле необходимо заполнить",
            })}
          />
          <FormLabel htmlFor="location">Местоположение</FormLabel>
          {errors?.location?.message && (
            <Error>{errors.location.message}</Error>
          )}
          <FormInput
            type="text"
            id="location"
            disabled={isCreatingTour}
            {...register("location", {
              required: "Это поле необходимо заполнить",
            })}
          />
          <FormLabel htmlFor="category">Категория</FormLabel>
          {errors?.category?.message && (
            <Error>{errors.category.message}</Error>
          )}
          <FormInput
            type="text"
            id="category"
            disabled={isCreatingTour}
            {...register("category", {
              required: "Это поле необходимо заполнить",
            })}
          />
        </FormSection>

        <FormSection>
          <FormTitle>
            <StyledIcon icon={LuCalendar} /> <span>Даты и Цены</span>
          </FormTitle>
          <FormLabel>Даты тура</FormLabel>
          {errors?.startDate?.message && (
            <Error>{errors.startDate.message}</Error>
          )}
          {errors?.endDate?.message && <Error>{errors.endDate.message}</Error>}
          <DateCont>
            <Controller
              control={control}
              name="startDate"
              disabled={isCreatingTour}
              rules={{ required: "Дата начала обязательна для выбора" }}
              render={({ field }) => (
                <DatePicker
                  selected={startDate ? new Date(startDate) : null}
                  onChange={(date) => {
                    if (date) {
                      setStartDate(formatDateToCustomISO(date));
                      field.onChange(date);
                    } else {
                      setStartDate(null);
                    }
                  }}
                  dateFormat="dd.MM.yyyy"
                  locale="ru"
                  placeholderText="С"
                  minDate={startOfToday()}
                  customInput={<FormInput />}
                />
              )}
            />
            <Controller
              control={control}
              disabled={isCreatingTour}
              name="endDate"
              rules={{
                required: "Дата окончания обязательна для выбора",
                validate: (value) => {
                  if (!startDate) return "Дата начала обязательна для выбора";

                  if (!value) return "Дата окончания обязательна для выбора";

                  const startDateTime = new Date(startDate).getTime();
                  const endDateTime = new Date(value).getTime();

                  if (endDateTime <= startDateTime) {
                    return "Дата окончания должна быть позже даты начала";
                  }

                  const maxEndDate = calculateEndDate(
                    startDate,
                    maxTourDuration
                  ).getTime();
                  const minEndDate = calculateEndDate(
                    startDate,
                    minTourDuration
                  ).getTime();

                  if (endDateTime > maxEndDate) {
                    return `Дата окончания не должна превышать максимальную продолжительность тура (${maxTourDuration} дней)`;
                  }

                  if (endDateTime < minEndDate) {
                    return `Дата окончания не должна быть меньше минимальной продолжительности тура (${minTourDuration} дней)`;
                  }

                  return true;
                },
              }}
              render={({ field }) => (
                <DatePicker
                  selected={endDate ? new Date(endDate) : null}
                  onChange={(date) => {
                    if (date) setEndDate(formatDateToCustomISO(date));
                    field.onChange(date);
                  }}
                  dateFormat="dd.MM.yyyy"
                  locale="ru"
                  placeholderText="До"
                  customInput={<FormInput />}
                  maxDate={
                    startDate
                      ? calculateEndDate(startDate, maxTourDuration)
                      : undefined
                  } // Проверка на startDate
                  minDate={
                    startDate
                      ? calculateEndDate(startDate, minTourDuration)
                      : undefined
                  } // Проверка на startDate
                  disabled={!startDate}
                />
              )}
            />
          </DateCont>

          <FormLabel htmlFor="regularPrice">Цена</FormLabel>
          {errors?.regularPrice?.message && (
            <Error>{errors.regularPrice.message}</Error>
          )}
          <FormInput
            type="number"
            disabled={isCreatingTour}
            id="regularPrice"
            {...register("regularPrice", {
              required: "Необходимо заполнить это поле",
              min: {
                value: minTourPrice,
                message: ` Цена не может быть дешевле ${formatCurrency(
                  minTourPrice
                )}`,
              },
            })}
          />

          <FormLabel htmlFor="discount">Скидка</FormLabel>
          {errors?.discount?.message && (
            <Error>{errors.discount.message}</Error>
          )}
          <FormInput
            disabled={isCreatingTour}
            type="number"
            id="discount"
            {...register("discount", {
              validate: (value) =>
                +value <= getValues().regularPrice ||
                "Скидка не может быть больше цены",
            })}
          />
        </FormSection>

        <FormSection>
          <FormTitle>
            <StyledIcon icon={LuHelpCircle} />
            <span>Дополнительная информация</span>
          </FormTitle>
          <FormLabel htmlFor="difficultyLevel">Уровень сложности</FormLabel>
          {errors?.difficultyLevel?.message && (
            <Error>{errors.difficultyLevel.message}</Error>
          )}
          <SimpleSelect
            $isCreate={true}
            options={options}
            register={register}
            name="difficultyLevel"
          />

          <FormLabel htmlFor="maxParticipants">Максимум участников</FormLabel>
          {errors?.maxParticipants?.message && (
            <Error>{errors.maxParticipants.message}</Error>
          )}
          <FormInput
            disabled={isCreatingTour}
            type="number"
            id="maxParticipants"
            {...register("maxParticipants", {
              required:
                "Необходимо выбрать максимальное количество участников предстоящего тура",
              min: {
                value: minParticipantsToStart,
                message: `Должно быть не менее ${minParticipantsToStart} участников`,
              },
              max: {
                value: maxParticipantsInTour,
                message: `Должно быть не более ${maxParticipantsInTour} участников`,
              },
            })}
          />

          <FormLabel htmlFor="description">Описание</FormLabel>
          {errors?.description?.message && (
            <Error>{errors.description.message}</Error>
          )}
          <FormTextarea
            disabled={isCreatingTour}
            id="description"
            {...register("description", {
              required: "Необходимо дать описание предстоящему туру",
            })}
          />

          <FormLabel htmlFor="itinerary">Маршрут</FormLabel>
          {errors?.itinerary?.message && (
            <Error>{errors.itinerary.message}</Error>
          )}
          <FormTextarea
            disabled={isCreatingTour}
            placeholder="Отсановки разделять при помощи ;"
            id="itinerary"
            {...register("itinerary", {
              required: "Напишите маршрут этого тура",
            })}
          />
          <FormLabel>Инструктор</FormLabel>
          {errors?.instructorId?.message && (
            <Error>{errors.instructorId.message}</Error>
          )}
          <Controller
            disabled={isCreatingTour}
            control={control}
            name="instructorId"
            rules={{
              required: "Выбор инструктора обязателен",
            }}
            render={({ field }) => (
              <InstructorSelect
                value={field.value}
                onChange={(selectedValue) => {
                  setInstructorId(+selectedValue);
                  field.onChange(selectedValue);
                  console.log(occupiedInstructors);
                }}
                data={
                  occupiedInstructors?.map((instructor) => ({
                    ...instructor,
                    id: instructor.id.toString(),
                  })) || []
                }
              />
            )}
          />
        </FormSection>

        <FormSection>
          <FormTitle>
            <StyledIcon icon={LuImage} />
            <span>Изображения тура</span>
          </FormTitle>
          <DropContainer>
            <DragAndDrop
              dropTextBefore="Главная картинка"
              onDrop={handleMainImageDrop}
            />
            <DragAndDrop
              dropTextBefore="Вторая картинка"
              onDrop={handleSecondImageDrop}
            />
            <DragAndDrop
              dropTextBefore="Третья картинка"
              onDrop={handleThirdImageDrop}
            />
          </DropContainer>
          {errors.images && <Error>{errors.images.message}</Error>}
        </FormSection>

        <ButtonGroup>
          <Button
            disabled={isCreatingTour}
            size={ButtonSize.Large}
            type="submit"
          >
            Сохранить
          </Button>
          <Button
            disabled={isCreatingTour}
            size={ButtonSize.Large}
            variation={ButtonVariation.Danger}
            onClick={handleReset}
            type="reset"
          >
            Отменить
          </Button>
        </ButtonGroup>
      </form>
    </FormContainer>
  );
}

export default CreateTour;
