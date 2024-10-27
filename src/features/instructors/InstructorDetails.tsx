import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  LuAward,
  LuBriefcase,
  LuCalendarCheck,
  LuCalendarDays,
  LuCalendarX,
  LuGithub,
  LuLinkedin,
  LuMail,
  LuMapPin,
  LuPencil,
  LuPhone,
  LuTrash2,
  LuTwitter,
} from "react-icons/lu";
import { CSSTransition } from "react-transition-group";
import styled from "styled-components";

import { useInstructor } from "./useInstructor";

import { useTours } from "../tours/useTours";
import "../../styles/animations.css";
import "../../styles/datePicker.css";
import Add from "../../ui/Add";
import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ConfirmDelete from "../../ui/ConfirmDelete";
import DragAndDrop from "../../ui/DragAndDrop";
import Empty from "../../ui/Empty";
import IconWrapper from "../../ui/IconWrapper";
import InlineTextarea from "../../ui/InlineTextarea";
import InlineInput from "../../ui/Input";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import { checkDate } from "../../utils/helpers";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useEditInstructor } from "./useEditInstructor";
import AddSertificateForm from "../sertificates/AddSertificateForm";
import { useDeleteSertificate } from "../sertificates/useDeleteSertificate";
import { useSertificates } from "../sertificates/useSertificates";
import { ButtonVariation } from "../../utils/types";
// Стили для страницы
const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

const Header = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4rem 2rem;
  background: linear-gradient(
    135deg,
    var(--color-brand-500),
    var(--color-brand-700)
  );
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }

  @media (max-width: 480px) {
    padding: 1rem 1rem;
  }
`;

const Img = styled.img`
  width: 20rem;
  height: 20rem;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  border: 0.5rem solid var(--color-grey-50);
  box-shadow: var(--shadow-md);
  margin-top: 2rem;

  @media (max-width: 768px) {
    width: 16rem;
    height: 16rem;
  }
`;

const Name = styled.h1`
  font-size: 3.6rem;
  font-weight: 700;
  color: var(--color-grey-0);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 3rem;
  }

  @media (max-width: 480px) {
    font-size: 2.4rem;
  }
`;

const Position = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  color: var(--color-grey-200);
  margin-bottom: 3rem;

  @media (max-width: 768px) {
    font-size: 1.8rem;
    margin-bottom: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin: 2rem 0;

  @media (max-width: 768px) {
    gap: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 1.6rem;
  color: var(--color-grey-100);
  text-decoration: none;
  transition: all 0.3s;
  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }

  &:hover {
    color: var(--color-grey-700);
  }
`;
const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  margin: 1rem 0 2rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-top: 0.8rem;
  }

  @media (max-width: 480px) {
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
`;

const SocialIcon = styled.a`
  color: var(--color-grey-100);
  transition: color 0.3s;

  &:hover {
    color: var(--color-orange-500);
  }

  svg {
    width: 2.4rem;
    height: 2.4rem;

    @media (max-width: 768px) {
      width: 2rem;
      height: 2rem;
    }

    @media (max-width: 480px) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }
`;

const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

const BioSection = styled.section`
  padding: 3rem;
  background-color: #fff;
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  font-size: 1.8rem;
  color: var(--color-grey-700);
  line-height: 1.8;
  background-color: var(--color-grey-0);

  @media (max-width: 768px) {
    padding: 2.5rem;
    font-size: 1.6rem;
  }

  @media (max-width: 480px) {
    padding: 2rem;
    font-size: 1.4rem;
  }
  @media (max-width: 400px) {
    text-align: center;
  }
`;

const Section = styled.section`
  padding: 3rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);

  @media (max-width: 768px) {
    padding: 2.5rem;
  }

  @media (max-width: 480px) {
    padding: 2rem;
  }
`;

const SectionTitle = styled.h3<{ $color?: string }>`
  font-size: 2.4rem;
  font-weight: 700;
  color: ${({ $color }) => $color || "var(--color-orange-900)"};
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
    margin-bottom: 1rem;
  }
`;

const Card = styled.div<{ $bgColor?: string }>`
  display: flex;
  align-items: flex-start;
  position: relative;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${({ $bgColor }) => $bgColor || "var(--color-orange-50)"};
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  @media (max-width: 480px) {
    gap: 1rem;
    padding: 1rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
`;
const DeleteBtn = styled.button`
  position: absolute;
  background: none;
  border: none;
  font-size: 2.4rem;
  top: 23px;
  right: 10px;
  color: var(--color-red-700);
`;
const CardTitle = styled.h4<{ $color?: string }>`
  font-size: 2.2rem;
  font-weight: 600;
  color: ${({ $color }) => $color || "var(--color-orange-700)"};

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const CardDetail = styled.p<{ $color?: string }>`
  font-size: 1.6rem;
  color: ${({ $color }) => $color || "var(--color-orange-600)"};
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 2rem;
    height: 2rem;

    @media (max-width: 768px) {
      width: 1.8rem;
      height: 1.8rem;
    }

    @media (max-width: 480px) {
      width: 1.6rem;
      height: 1.6rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
  }
`;
const EditBox = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  max-width: 21rem;
  span {
    font-size: 3rem;
  }
  margin-bottom: 2rem;
`;
const EditInput = styled(InlineInput)`
  color: #000;
  background-color: #fff;
  &::placeholder {
    color: var(--color-red-700);
  }
  &:focus {
    outline-color: var(--color-orange-500);
  }
`;
const BackButton = styled(ButtonText)`
  position: absolute;
  top: 15px;
  right: 10px;
  @media (max-width: 480px) {
    position: static;
    margin-left: auto;
    margin-bottom: 1.5rem;
  }
`;
type FormValues = {
  bioText: string;
  email?: string;
  phone?: string;
  name: string;
  archived: boolean;
  contactInfo: string;
  profileImage: string | File;
};
function InstructorDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState<File | undefined>(undefined);
  const {
    instructor: { id, name, contactInfo, bioText, profileImage } = {},
    isLoadingInstructor,
  } = useInstructor();
  const { editInstructor, isEditing: isEditingInstructor } =
    useEditInstructor();
  const { sertificates, isGettingSertificates } = useSertificates();
  const { tours, isPending: isGettingTours } = useTours({
    option: "instructorId",
    optionValue: id,
  });
  // const
  const { deleteSertificate, isDeleting } = useDeleteSertificate();
  const [addSertificate, setAddSertificate] = useState(false);
  const { register, handleSubmit, reset, formState } = useForm<FormValues>();
  const moveBack = useMoveBack();
  const { errors } = formState;
  useEffect(() => {
    console.log(name, contactInfo);
    reset({
      name,
      email: contactInfo?.split(";")[0],
      phone: contactInfo?.split(";")[1],
      bioText,
    });
  }, [name, contactInfo, bioText, reset]);
  if (isLoadingInstructor || isGettingSertificates || isGettingTours)
    return <Spinner />;
  console.log(sertificates);
  function onSubmit(data: {
    bioText: string;
    email?: string;
    phone?: string;
    name: string;
    archived: boolean;
    contactInfo: string;
    profileImage: string | File;
  }) {
    console.log(data);
    data.contactInfo = `${data.email};${data.phone}`;
    delete data.email;
    delete data.phone;
    console.log("CALL");
    if (image) data.profileImage = image;
    editInstructor(
      { instructor: { ...data }, id },
      {
        onSuccess: () => setIsEditing(false),
      }
    );
    console.log({ ...data, image });
  }

  const [email, phone] = contactInfo.split(";");
  function handleDropImage(files: FileList | File[]) {
    let fileArray: File[];

    if (files instanceof FileList) {
      fileArray = Array.from(files);
    } else {
      fileArray = files;
    }

    console.log(fileArray);
    setImage(fileArray[0]);
  }
  return (
    <Modal>
      <PageContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Header>
            <BackButton type="button" $color="white" onClick={() => moveBack()}>
              &larr; Назад
            </BackButton>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              {isEditing ? (
                <>
                  <EditBox>
                    <EditInput
                      type="text"
                      id="name"
                      disabled={isEditingInstructor}
                      placeholder={errors?.name?.message}
                      {...register("name", {
                        required: "Заполните поле",
                      })}
                    />
                  </EditBox>
                </>
              ) : (
                <Name>{name}</Name>
              )}
            </CSSTransition>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              <Position>Профессиональный инструктор</Position>
            </CSSTransition>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              {isEditing ? (
                <DragAndDrop rounded={true} onDrop={handleDropImage} />
              ) : (
                <Img src={profileImage} alt={`${name} - фото профиля`} />
              )}
            </CSSTransition>
            <CSSTransition
              in={isEditing}
              timeout={300}
              classNames="inline-edit"
            >
              <ContactInfo>
                {isEditing ? (
                  <EditInput
                    disabled={isEditingInstructor}
                    placeholder={errors?.email?.message}
                    {...register("email")}
                  />
                ) : (
                  <ContactItem href={`mailto:${email}`}>
                    <LuMail /> {email}
                  </ContactItem>
                )}
                {isEditing ? (
                  <EditInput
                    disabled={isEditingInstructor}
                    placeholder={errors?.phone?.message}
                    {...register("phone")}
                  />
                ) : (
                  <ContactItem href={`tel:${phone}`}>
                    <LuPhone /> {phone}
                  </ContactItem>
                )}
              </ContactInfo>
            </CSSTransition>
            <SocialLinks>
              <SocialIcon
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuLinkedin />
              </SocialIcon>
              <SocialIcon
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuTwitter />
              </SocialIcon>
              <SocialIcon
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <LuGithub />
              </SocialIcon>
            </SocialLinks>
            {!isEditing && (
              <Button
                variation={ButtonVariation.Secondary}
                onClick={() => setIsEditing(true)}
              >
                <LuPencil /> Редактировать
              </Button>
            )}
          </Header>

          <CSSTransition in={isEditing} timeout={300} classNames="inline-edit">
            <BioSection>
              <SectionTitle $color="var(--color-grey-600)">
                Биография
              </SectionTitle>
              {isEditing ? (
                <>
                  <InlineTextarea
                    disabled={isEditingInstructor}
                    {...register("bioText")}
                  />
                  <ButtonGroup>
                    <Button>Сохранить</Button>
                    <Button
                      variation={ButtonVariation.Danger}
                      onClick={() => setIsEditing(false)}
                    >
                      Отменить
                    </Button>
                  </ButtonGroup>
                </>
              ) : (
                <p>{bioText.replaceAll(";", ", ")}</p>
              )}
            </BioSection>
          </CSSTransition>
        </form>
        <MainContent>
          <Section>
            <SectionTitle>Сертификаты и Курсы</SectionTitle>
            {sertificates &&
              sertificates.map((cert) => (
                <Card key={cert.id}>
                  <IconWrapper>
                    <LuAward />
                  </IconWrapper>
                  <CardContent>
                    <CardTitle>{cert.title}</CardTitle>
                    <Modal.Open opens={cert.id}>
                      <DeleteBtn>
                        <LuTrash2 />
                      </DeleteBtn>
                    </Modal.Open>
                    <Modal.Window name={cert.id}>
                      <ConfirmDelete
                        resourceName={cert.title}
                        onConfirm={() => {
                          console.log(cert.id);
                          deleteSertificate({ option: "id", value: cert.id });
                        }}
                        disabled={isDeleting}
                      />
                    </Modal.Window>
                    <CardDetail>
                      <LuBriefcase /> Выдано: {cert.organization}
                    </CardDetail>
                    <CardDetail>
                      <LuCalendarCheck /> Дата выдачи:{" "}
                      {new Date(cert.dateIssue).toLocaleDateString()}
                    </CardDetail>
                    <CardDetail>
                      <LuCalendarX /> Срок действия:{" "}
                      {new Date(cert.expirationDate).toLocaleDateString()}
                    </CardDetail>
                    <CardDetail>
                      {cert.description.replaceAll(";", ", ")}
                    </CardDetail>
                  </CardContent>
                </Card>
              ))}
            {!isEditing && (
              <CSSTransition
                in={addSertificate}
                timeout={300}
                classNames="inline-edit"
              >
                {addSertificate ? (
                  <AddSertificateForm
                    onClose={() => setAddSertificate(false)}
                  />
                ) : (
                  <Add
                    title="Добавить сертификат"
                    onClick={() => setAddSertificate(!addSertificate)}
                    color="orange"
                  />
                )}
              </CSSTransition>
            )}
          </Section>
          <Section>
            <SectionTitle $color="var(--color-brand-900)">Туры</SectionTitle>
            {tours.length ? (
              tours.map((tour) => (
                <Card key={tour.id} $bgColor="var(--color-brand-50)">
                  <IconWrapper bgColor="var(--color-brand-600)">
                    <LuMapPin />
                  </IconWrapper>
                  <CardContent>
                    <CardTitle $color="var(--color-brand-900)">
                      {tour.title}
                    </CardTitle>
                    <CardDetail $color="var(--color-brand-600)">
                      <LuCalendarDays /> Дата:{" "}
                      {checkDate(tour.startDate, tour.endDate)}
                    </CardDetail>
                    <CardDetail $color="var(--color-brand-600)">
                      <LuBriefcase /> Место: {tour.location}
                    </CardDetail>
                    <CardDetail $color="var(--color-brand-600)">
                      {tour.description.replaceAll(";", ", ")}
                    </CardDetail>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Empty>У данного инструктора еще не было туров</Empty>
            )}
          </Section>
        </MainContent>
      </PageContainer>
    </Modal>
  );
}

export default InstructorDetailPage;
