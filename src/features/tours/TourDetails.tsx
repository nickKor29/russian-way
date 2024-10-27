import { ru } from "date-fns/locale/ru";
import { useEffect, useState } from "react";
import { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/animations.css";
import "../../styles/datePicker.css";
registerLocale("ru", ru);

import { isBefore, startOfToday } from "date-fns";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import {
  LuCalendar,
  LuCheckCircle,
  LuPencil,
  LuPercent,
  LuPin,
  LuRussianRuble,
  LuSave,
  LuStar,
  LuTag,
  LuUser2,
  LuUsers2,
  LuX,
  LuXCircle,
} from "react-icons/lu";
import { CSSTransition } from "react-transition-group";
import styled, { css } from "styled-components";
import { useMoveBack } from "../../hooks/useMoveBack";
import ButtonIcon from "../../ui/ButtonIcon";
import ButtonText from "../../ui/ButtonText";
import Error from "../../ui/FormError";
import Gallery from "../../ui/Gallery";
import Heading from "../../ui/Heading";
import InlineInput from "../../ui/Input";
import Row from "../../ui/Row";
import InstructorSelect from "../../ui/Select";
import SimpleSelect from "../../ui/SimpleSelect";
import Spinner from "../../ui/Spinner";
import ToggleButton from "../../ui/ToggleButton";
import {
  calculateEndDate,
  chechToday,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import InstructorCard from "../instructors/InstructorCard";
import { useOccupiedInstructors } from "../instructors/useOccupiedInstructors";
import { useSettings } from "../settings/useSettings";
import { useEditTour } from "./useEditTour";
import { useTour } from "./useTour";
import InlineTextarea from "../../ui/InlineTextarea";

const TourContainer = styled.div`
  max-width: 90%;
  margin: 0 auto;
  border-radius: var(--border-radius-sm);
  min-height: 90rem;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  @media (max-width: 430px) {
    padding: 0.5rem;
  }
`;

const TopSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 2rem;
  margin-top: 4rem;

  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

const TourName = styled.h2`
  display: flex;
  align-items: center;
  gap: 2rem;
  justify-content: space-between;
  font-size: 3rem;
  font-weight: 500;
  margin-bottom: 2rem;
  color: var(--color-brand-900);

  @media (max-width: 768px) {
    font-size: 2.5rem;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 430px) {
    font-size: 2rem;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    gap: 1.5rem;
  }

  @media (max-width: 430px) {
    gap: 1rem;
  }
`;

const InfoCard = styled.div<{ $isEditing: boolean }>`
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-200);
  border-radius: var(--border-radius-sm);
  padding: 1rem;
  flex: 1 1 calc(50% - 2rem);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;

  ${(props) =>
    props.$isEditing &&
    css`
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    `}

  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

const InfoTitle = styled.h3`
  font-size: 1.8rem;
  color: var(--color-brand-800);
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-self: center;

  @media (max-width: 430px) {
    font-size: 1.6rem;
  }
`;

const InfoDetail = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.7rem;
  color: var(--color-grey-700);
  min-height: 2.4rem;
  grid-column: 1/-1;

  @media (max-width: 430px) {
    font-size: 1.5rem;
  }
`;

const AvailabilitySection = styled.div<{ $available: boolean }>`
  margin: 2rem 0;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.7rem;
  color: ${(props) =>
    props.$available ? "var(--color-green-700)" : "var(--color-red-700)"};

  @media (max-width: 430px) {
    font-size: 1.5rem;
  }
`;

const DescriptionSection = styled.div`
  margin-bottom: 2rem;
`;
const DatesCont = styled.div`
  display: flex;
  gap: 1rem;
  @media (max-width: 390px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ButtonCont = styled.div`
  display: flex;
`;
const Description = styled.p`
  font-size: 1.7rem;
  color: var(--color-grey-800);
  margin-top: 0.5rem;

  @media (max-width: 430px) {
    font-size: 1.5rem;
  }
`;

// Основной компонент
function TourDetails() {
  const { isPending, tour } = useTour();
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
  const isDuplicate = tour?.title?.startsWith?.("Копия");
  console.log(isDuplicate);
  const { isLoadingOccupiedInstructors, occupiedInstructors } =
    useOccupiedInstructors({
      startDate: tour?.startDate,
      endDate: tour?.endDate,
    });
  const [isEditing, setIsEditing] = useState(false);
  const [instructorId, setInstructorId] = useState(tour?.instructorId);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [previousStartDate, setPreviousStartDate] = useState();
  const [previousEndDate, setPreviousEndDate] = useState();

  const [available, setAvailable] = useState();
  const [mainImage, setMainImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [thirdImage, setThirdImage] = useState(null);
  const [availableError, setAvailableError] = useState(false);

  const { isEditing: isEditing1, editTour } = useEditTour();
  const moveBack = useMoveBack();

  const { register, handleSubmit, reset, control, getValues, formState } =
    useForm({
      defaultValues: {
        difficultyLevel: tour?.difficultyLevel,
      },
    });

  const { errors } = formState;
  useEffect(() => {
    reset(tour);
    setStartDate(tour?.startDate);
    setEndDate(tour?.endDate);
    setAvailable(tour?.available);
    setIsEditing(false);
    setInstructorId(tour?.instructorId);
  }, [tour, reset]);

  if (
    isPending ||
    isEditing1 ||
    isLoadingOccupiedInstructors ||
    isGettingSettings
  )
    return <Spinner />;
  console.log(tour);
  console.log(startDate, endDate);
  console.log(previousStartDate, previousEndDate);
  const options = difficultyLevels.map((level: string) => ({
    value: level,
    name: level,
  }));

  function handleAvailabeChange() {
    function areIntervalsOverlapping(
      startDate1,
      endDate1,
      startDate2,
      endDate2
    ) {
      return startDate1 <= endDate2 && endDate1 >= startDate2;
    }
    const isOverlapping = areIntervalsOverlapping(
      tour.startDate,
      tour.endDate,
      startDate,
      endDate
    );
    console.log(isOverlapping);
    console.log(isBefore(startDate, startOfToday()));
    console.log(getValues().title.startsWith("Копия"));
    console.log(instructorId === tour.instructorId);
    console.log(instructorId);
    console.log(tour.instructorId);
    console.log(isOverlapping && instructorId === tour.instructorId);
    console.log(
      isBefore(startDate, startOfToday()) ||
        getValues().title.startsWith("Копия") ||
        (isOverlapping && instructorId === tour.instructorId)
    );
    if (
      isBefore(startDate, startOfToday()) ||
      getValues().title.startsWith("Копия") ||
      (isOverlapping && instructorId === tour.instructorId)
    ) {
      setAvailableError(true);
      setAvailable(false);
      return;
    }

    setAvailable((available) => !available);
    setAvailableError(false);
  }

  function handleMainImageDrop(files) {
    console.log(files);
    setMainImage(files[0]);
  }

  function handleSecondImageDrop(files) {
    setSecondImage(files[0]);
  }

  function handleThirdImageDrop(files) {
    setThirdImage(files[0]);
  }
  const dropHandlers = {
    onMainImageDrop: handleMainImageDrop,
    onSecondImageDrop: handleSecondImageDrop,
    onThirdImageDrop: handleThirdImageDrop,
  };
  const startEditing = () => setIsEditing(true);
  const cancelEditing = () => setIsEditing(false);
  const saveChanges = (data) => {
    data.difficultyLevel = getValues().difficultyLevel;
    delete data.instructors;
    if (mainImage) data.images[0] = mainImage;
    if (secondImage) data.images[1] = secondImage;
    if (thirdImage) data.images[2] = thirdImage;
    console.log(data);

    editTour({
      tour: {
        ...data,
        available,
        instructorId,
      },
      id: data.id,
    });
    setPreviousStartDate(startDate);
    setPreviousEndDate(endDate);
  };
  function onError(errors) {
    console.log(errors);
  }
  const minStartDate =
    tour?.startDate && new Date(tour.startDate) < chechToday()
      ? new Date(tour.startDate)
      : chechToday();
  return (
    <TourContainer>
      <Row type="horizontal">
        <Heading as="h1">Тур #{tour.id}</Heading>
        <ButtonText onClick={moveBack} property="margin-right" value="5rem">
          &larr; Назад
        </ButtonText>
      </Row>
      <TopSection>
        <Gallery images={tour.images} isEditing={isEditing} {...dropHandlers} />
        <div>
          <form onSubmit={handleSubmit(saveChanges, onError)}>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              <TourName>
                {isEditing ? (
                  <>
                    <InlineInput
                      type="text"
                      {...register("title", {
                        required: "Необходимо заполнить это поле",
                      })}
                      disabled={isEditing1}
                    />
                    {errors?.title?.message && (
                      <Error>{errors.title.message}</Error>
                    )}
                  </>
                ) : (
                  tour.title
                )}
                {isEditing ? (
                  <>
                    <ButtonCont>
                      <ButtonIcon title="Сохранить">
                        <LuSave />
                      </ButtonIcon>
                      <ButtonIcon onClick={cancelEditing} title="Отменить">
                        <LuX />
                      </ButtonIcon>
                    </ButtonCont>
                  </>
                ) : (
                  <ButtonIcon title="Изменить" onClick={startEditing}>
                    <LuPencil />
                  </ButtonIcon>
                )}
              </TourName>
            </CSSTransition>
            <AvailabilitySection
              $available={isEditing ? available : tour.available}
            >
              {isEditing ? (
                <>
                  <ToggleButton
                    id="available"
                    checked={available}
                    onChange={handleAvailabeChange}
                    text={available ? "Тур доступен" : "Тур недоступен"}
                    icon={
                      available ? (
                        <LuCheckCircle size={20} />
                      ) : (
                        <LuXCircle size={20} />
                      )
                    }
                  />
                  {availableError && (
                    <Error $isAvailable={true}>
                      {isDuplicate
                        ? "Необходимо изменить скопированный тур"
                        : "Тур не может быть доступен с такой датой"}
                    </Error>
                  )}
                </>
              ) : available ? (
                <>
                  <LuCheckCircle size={24} /> Тур доступен для бронирования
                </>
              ) : (
                <>
                  <LuXCircle size={24} /> Тур недоступен для бронирования
                </>
              )}
            </AvailabilitySection>

            <InfoSection>
              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard>
                  <InfoTitle>
                    <LuCalendar /> <span>Даты</span>
                  </InfoTitle>
                  <InfoDetail>
                    {isEditing ? (
                      <>
                        <DatesCont>
                          <span>С</span>
                          <Controller
                            control={control}
                            name="startDate"
                            rules={{
                              required: "Дата начала обязательна для выбора",
                            }}
                            render={({ field }) => (
                              <DatePicker
                                selected={startDate}
                                onChange={(date) => {
                                  setStartDate(date);
                                  field.onChange(date);
                                }}
                                dateFormat="dd.MM.yyyy"
                                locale="ru"
                                minDate={minStartDate}
                                maxDate={endDate} //
                                disabled={isEditing1}
                              />
                            )}
                          />
                          <span>до</span>
                          <Controller
                            control={control}
                            name="endDate"
                            rules={{
                              required: "Дата окончания обязательна для выбора",
                              validate: (value) => {
                                if (!startDate)
                                  return "Дата начала обязательна для выбора";
                                if (!value)
                                  return "Дата окончания обязательна для выбора";

                                const startDateTime = new Date(
                                  startDate
                                ).setHours(0, 0, 0, 0);
                                const endDateTime = new Date(value).setHours(
                                  0,
                                  0,
                                  0,
                                  0
                                );

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
                                selected={endDate}
                                onChange={(date) => {
                                  setEndDate(date);
                                  field.onChange(date);
                                }}
                                dateFormat="dd.MM.yyyy"
                                locale="ru"
                                maxDate={calculateEndDate(
                                  startDate,
                                  maxTourDuration
                                )}
                                minDate={calculateEndDate(
                                  startDate,
                                  minTourDuration
                                )}
                                disabled={isEditing1}
                              />
                            )}
                          />
                        </DatesCont>
                      </>
                    ) : (
                      `${formatDate(tour.startDate)} - ${formatDate(
                        tour.endDate
                      )}`
                    )}
                  </InfoDetail>
                  {errors?.startDate?.message && (
                    <Error>{errors.startDate.message}</Error>
                  )}
                  {errors?.endDate?.message && (
                    <Error>{errors.endDate.message}</Error>
                  )}
                </InfoCard>
              </CSSTransition>
              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard>
                  <InfoTitle>
                    <LuPin /> <span>Местоположение</span>
                  </InfoTitle>
                  <CSSTransition
                    in={isEditing}
                    timeout={300}
                    classNames="inline-edit"
                  >
                    <InfoDetail>
                      {isEditing ? (
                        <>
                          <InlineInput
                            type="text"
                            {...register("location", {
                              required: "Необходимо заполнить это поле",
                            })}
                            disabled={isEditing1}
                          />
                          {errors?.location?.message && (
                            <Error>{errors.location.message}</Error>
                          )}
                        </>
                      ) : (
                        tour.location
                      )}
                    </InfoDetail>
                  </CSSTransition>
                </InfoCard>
              </CSSTransition>

              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard $isEditing={isEditing}>
                  <InfoTitle>
                    <LuRussianRuble /> <span>Цена</span>
                  </InfoTitle>
                  {isEditing && (
                    <InfoTitle>
                      <LuPercent /> <span>Скидка</span>
                    </InfoTitle>
                  )}
                  <InfoDetail>
                    {isEditing ? (
                      <>
                        <InlineInput
                          type="number"
                          {...register("regularPrice", {
                            required: "Необходимо заполнить это поле",
                            min: {
                              value: minTourPrice,
                              message: ` Цена не может быть дешевле ${formatCurrency(
                                minTourPrice
                              )}`,
                            },
                          })}
                          disabled={isEditing1}
                        />
                        {errors?.regularPrice?.message && (
                          <Error>{errors.regularPrice.message}</Error>
                        )}
                        <InlineInput
                          type="number"
                          {...register("discount", {
                            validate: (value) =>
                              +value <= getValues().regularPrice ||
                              "Скидка не может быть больше цены",
                          })}
                          disabled={isEditing1}
                        />
                        {errors?.discount?.message && (
                          <Error>{errors.discount.message}</Error>
                        )}
                      </>
                    ) : (
                      `${formatCurrency(tour.regularPrice)}${
                        tour.discount
                          ? ` (${formatCurrency(tour.discount)} скидка)`
                          : ""
                      }`
                    )}
                  </InfoDetail>
                </InfoCard>
              </CSSTransition>
              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard>
                  <InfoTitle>
                    <LuStar /> <span>Уровень сложности</span>
                  </InfoTitle>
                  <InfoDetail>
                    {isEditing ? (
                      <>
                        <SimpleSelect
                          options={options}
                          register={register}
                          name="difficultyLevel"
                          defaultValue={tour.difficultyLevel}
                        />

                        {errors?.difficultyLevel?.message && (
                          <Error>{errors.difficultyLevel.message}</Error>
                        )}
                      </>
                    ) : (
                      tour.difficultyLevel
                    )}
                  </InfoDetail>
                </InfoCard>
              </CSSTransition>
              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard>
                  <InfoTitle>
                    <LuUsers2 />
                    <span>
                      {isEditing ? "Максимум участников" : "Участники"}
                    </span>
                  </InfoTitle>
                  <InfoDetail>
                    {isEditing ? (
                      <>
                        <InlineInput
                          type="number"
                          {...register("maxParticipants", {
                            required: "Необходимо заполнить это поле",
                            min: {
                              value: minParticipantsToStart,
                              message: `Участников должно быть не менее ${minParticipantsToStart} человек`,
                            },
                            max: {
                              value: maxParticipantsInTour,
                              message: `Участников не может быть больше ${maxParticipantsInTour} человек`,
                            },
                          })}
                          disabled={isEditing1}
                        />
                        {errors?.maxParticipants?.message && (
                          <Error>{errors.maxParticipants.message}</Error>
                        )}
                      </>
                    ) : (
                      `${tour.currentParticipants} из ${tour.maxParticipants} мест занято`
                    )}
                  </InfoDetail>
                </InfoCard>
              </CSSTransition>
              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard>
                  <InfoTitle>
                    <LuTag /> <span>Категория</span>
                  </InfoTitle>
                  <InfoDetail>
                    {isEditing ? (
                      <>
                        <InlineInput
                          type="text"
                          {...register("category", {
                            required: "Необходимо заполнить это поле",
                          })}
                          disabled={isEditing1}
                        />
                        {errors?.category?.message && (
                          <Error>{errors.category.message}</Error>
                        )}
                      </>
                    ) : (
                      tour.category
                    )}
                  </InfoDetail>
                </InfoCard>
              </CSSTransition>
              <CSSTransition
                in={isEditing}
                timeout={300}
                classNames="inline-edit"
              >
                <InfoCard>
                  <InfoTitle>
                    <LuUser2 /> <span>Инструктор</span>
                  </InfoTitle>
                  {isEditing ? (
                    <InstructorSelect
                      data={occupiedInstructors}
                      value={instructorId}
                      onChange={setInstructorId}
                      defaultValue={{
                        value: tour.instructorId,
                        label: tour.instructors.name,
                        imageUrl: tour.instructors.profileImage,
                      }}
                    />
                  ) : (
                    <InstructorCard instructor={tour.instructors} />
                  )}
                </InfoCard>
              </CSSTransition>
            </InfoSection>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              <DescriptionSection>
                <Heading as="h3">Описание</Heading>
                <Description>
                  {isEditing ? (
                    <>
                      <InlineTextarea
                        {...register("description", {
                          required: "Необходимо заполнить это поле",
                          min: {
                            value: "100",
                            message:
                              "Описание должно быть на минимум 100 символов",
                          },
                          max: {
                            value: 1200,
                            message:
                              "Описание должно быть на максимум 1200 символов",
                          },
                        })}
                        disabled={isEditing1}
                      />
                      {errors?.description?.message && (
                        <Error>{errors.description.message}</Error>
                      )}
                    </>
                  ) : (
                    tour.description.replaceAll(";", ", ")
                  )}
                </Description>
              </DescriptionSection>
            </CSSTransition>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              <DescriptionSection>
                <Heading as="h3">Маршрут</Heading>
                <Description>
                  {isEditing ? (
                    <>
                      <InlineInput
                        {...register("itinerary", {
                          required: "Необходимо заполнить это поле",
                        })}
                        disabled={isEditing1}
                      />
                      {errors?.itinerary?.message && (
                        <Error>{errors.itinerary.message}</Error>
                      )}
                    </>
                  ) : (
                    tour.itinerary.replaceAll(";", " → ")
                  )}
                </Description>
              </DescriptionSection>
            </CSSTransition>
          </form>
        </div>
      </TopSection>
    </TourContainer>
  );
}

export default TourDetails;
