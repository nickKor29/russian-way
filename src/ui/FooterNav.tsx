import styled from "styled-components";
import Logout from "../features/auth/Logout";
import { useUser } from "../features/auth/useUser";
import { useShrink } from "../context/ToggleSidebarContext";

const FooterSection = styled.div<{ $isShrink: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(props) => (props.$isShrink ? "1rem" : "1.5rem")};
  padding: 2rem 1rem;
  border-top: 1px solid var(--color-grey-100);
  justify-content: ${(props) => (props.$isShrink ? "center" : "flex-start")};
`;

const Avatar = styled.div`
  padding: 0.5rem;
  background-color: var(--color-brand-500);
  border-radius: var(--border-radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--color-grey-50);
`;

const Cont = styled.div<{ $isShrink: boolean }>`
  display: ${(props) => (props.$isShrink ? "none" : "flex")};
  flex-direction: column;
  gap: 0.2rem;
`;

const Name = styled.span`
  font-size: 1.8rem;
  color: var(--color-grey-800);
`;

const Email = styled.span`
  font-size: 1.3rem;
  color: var(--color-grey-600);
`;

function FooterNav() {
  const { isShrink } = useShrink();
  const { user } = useUser();
  if (!user) return;
  const { fullName } = user.user_metadata;
  const signiture = fullName
    ?.split(" ")
    ?.map((word: string) => word[0])
    ?.join("");

  return (
    <FooterSection $isShrink={isShrink}>
      <Avatar>{signiture || "U"}</Avatar>
      <Cont $isShrink={isShrink}>
        <Name>{fullName}</Name>
        <Email>{user.email}</Email>
      </Cont>
      {!isShrink && <Logout />}
    </FooterSection>
  );
}

export default FooterNav;
