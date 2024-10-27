import { useState, useEffect } from "react";
import Table from "../../ui/Table"; // Это ваша текущая таблица
import CardView from "../../ui/CardView"; // Карточки для мобильных устройств
import Spinner from "../../ui/Spinner"; // Спиннер для загрузки
import { useInstructors } from "../instructors/useInstructors"; // Хук для получения архивированных инструкторов
import { useEditInstructor } from "../instructors/useEditInstructor"; // Хук для редактирования инструкторов
import ArchivedInstructorRow from "./ArchivedInstructorRow"; // Компонент для строки таблицы

function ResponsiveTable() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1500);
  const { isLoadingInstructors, instructors } = useInstructors(
    "archived",
    true
  );
  const { editInstructor } = useEditInstructor(); // Хук для редактирования инструкторов

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1500);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleUnarchive = (instructorId) => {
    editInstructor({
      id: instructorId,
      instructor: { archived: false }, // Снимаем архивный статус
    });
  };

  if (isLoadingInstructors) return <Spinner />;

  return isMobile ? (
    <CardView data={instructors} onUnarchive={handleUnarchive} />
  ) : (
    <Table columns="0.2fr 1fr 1fr 1.5fr 1.3fr 0.2fr">
      <Table.Header>
        <div></div>
        <div>Инструктор</div>
        <div>Имя</div>
        <div>Описание</div>
        <div>Контакты</div>
        <div></div>
      </Table.Header>

      <Table.Body
        data={instructors}
        render={(instructor, i) => (
          <ArchivedInstructorRow
            instructor={instructor}
            key={instructor.id}
            index={i + 1}
          />
        )}
      />
    </Table>
  );
}

export default ResponsiveTable;
