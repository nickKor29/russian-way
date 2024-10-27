import Heading from "../ui/Heading";
import HeaderContainer from "../ui/HeaderContainer";
import UpdateUserDataForm from "../features/auth/UpdateUserForm";
import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";
function Account() {
  return (
    <>
      <HeaderContainer>
        <Heading as="h1">Настройки аккаунта</Heading>
      </HeaderContainer>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
