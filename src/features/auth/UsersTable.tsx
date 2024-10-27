import Heading from "../../ui/Heading";
import HeaderContainer from "../../ui/HeaderContainer";
import Table from "../../ui/TableExp";
import Spinner from "../../ui/Spinner";
import UserRow from "./UserRow";
import { useUsers } from "./useUsers";

function UsersTable() {
  const { users, isPending: isGettingUsers } = useUsers();
  if (isGettingUsers) return <Spinner />;
  console.log(users);
  return (
    <>
      <HeaderContainer>
        <Heading as="h2">Список пользователей</Heading>
      </HeaderContainer>

      <Table>
        <Table.Header>
          <Table.Th></Table.Th>
          <Table.Th>Аватар</Table.Th>
          <Table.Th>Имя</Table.Th>
          <Table.Th>Email</Table.Th>
          <Table.Th>Телефон</Table.Th>
          <Table.Th>Подтвержден</Table.Th>
          <Table.Th></Table.Th>
        </Table.Header>
        <Table.Body>
          {users.map((user, i) => (
            <UserRow key={user.id} user={user} index={i} />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default UsersTable;
