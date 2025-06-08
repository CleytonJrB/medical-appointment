import { Stack, styled } from "@mui/material";

export const CommonMainContainer = styled(Stack)`
  flex: 1;

  align-items: baseline;
  justify-content: baseline;

  padding-top: 6.2rem;
  padding-left: 4rem;
  padding-right: 4.5rem;
  padding-bottom: 5.5rem;

  flex-direction: column;

  position: relative;

  min-height: 100vh;

  @media (max-width: 1000px) {
    padding-top: 4.2rem;
    padding-left: 0.8rem;
    padding-right: 1.5rem;
    padding-bottom: 4.5rem;
  }
`;
