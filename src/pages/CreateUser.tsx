import SignupForm from "../features/auth/SignUp";
import UsersTable from "../features/auth/UsersTable";
import HeaderContainer from "../ui/HeaderContainer";
import Heading from "../ui/Heading";

function CreateUser() {
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Создать нового пользователь</Heading>
      </HeaderContainer>
      <UsersTable />
      <SignupForm />
    </>
  );
}

export default CreateUser;
