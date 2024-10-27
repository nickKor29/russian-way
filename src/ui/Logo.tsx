import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";
import { useShrink } from "../context/ToggleSidebarContext";

const StyledLogo = styled.img<{ $isShrink?: boolean }>`
  overflow: hidden;
  transition: all 0.3s;
  width: auto;
  height: ${(props) => (props.$isShrink ? "auto" : "s17rem")};
`;
function Logo() {
  const { isShrink } = useShrink();
  const { isDarkMode } = useDarkMode();
  const src = isDarkMode ? "/Logo-dark.png" : "/Logo-light.png";
  return <StyledLogo src={src} alt="Logo" $isShrink={isShrink} />;
}

export default Logo;
