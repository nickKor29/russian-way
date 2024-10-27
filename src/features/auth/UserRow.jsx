import styled from "styled-components";
import Table from "../../ui/TableExp";
const Img = styled.img`
  max-width: 20rem;
  height: auto;
  object-fit: cover;
  border-radius: var(--border-radius-tiny);
`;
function UserRow({ user, index }) {
  const { avatar, fullName } = user.user_metadata;

  return (
    <Table.Row>
      <Table.Td dataCell="Индекс">{index + 1}</Table.Td>
      <Table.Td dataCell="Аватар">
        {avatar ? <Img src={avatar} alt={`Автар ${fullName}`} /> : "—"}
      </Table.Td>
      <Table.Td dataCell="Имя">{fullName}</Table.Td>
      <Table.Td dataCell="Email">{user.email}</Table.Td>
      <Table.Td dataCell="Телефон">{user.phone ? user.phone : "—"}</Table.Td>
      <Table.Td dataCell="Подтвержден">
        {user.confirmed_at ? "Подтвержден" : "Неподтвержден"}
      </Table.Td>
      <Table.Td dataCell="Действия">Удалить</Table.Td>
    </Table.Row>
  );
}

export default UserRow;
