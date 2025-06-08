import { Stack, styled } from "@mui/material";

export const HeaderContainer = styled(Stack)`
  display: flex;

  flex-direction: row;

  width: 100%;

  align-items: center;
  justify-content: space-between;

  padding: 1rem 2rem;

  position: relative;

  z-index: 10;

  .logo {
    width: 3rem;
    height: 3rem;
    object-fit: contain;
  }
`;
