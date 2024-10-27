import { LuPlus } from "react-icons/lu";
import styled from "styled-components";
import Button from "../../ui/Button";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Table from "../../ui/TableExp";
import AddInstructorForm from "./CreateInstructorForm";
import InstructorRow from "./InstructorRow";
import { InstructorFull } from "../../utils/types";

function InstructorsTable({ instructors }: { instructors: InstructorFull[] }) {
  return (
    <Menus>
      <Table>
        <Table.Header>
          <Table.Th>&nbsp;</Table.Th>
          <Table.Th>Инструктор</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Описание</Table.Th>
          <Table.Th>Контакты</Table.Th>
          <Table.Th>&nbsp;</Table.Th>
        </Table.Header>

        <Table.Body>
          {instructors.map((instructor, i) => (
            <InstructorRow
              instructor={instructor}
              key={instructor.id}
              index={i + 1}
            />
          ))}
        </Table.Body>
      </Table>
    </Menus>
  );
}

export default InstructorsTable;
