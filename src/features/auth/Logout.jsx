import { LuLogOut } from "react-icons/lu";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";
import SpinnerMini from "../../ui/SpinnerMini";

function Logout() {
  const { logout, isPending } = useLogout();
  return (
    <ButtonIcon disabled={isPending} onClick={logout}>
      {!isPending ? <LuLogOut /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
