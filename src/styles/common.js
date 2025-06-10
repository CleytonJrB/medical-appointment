import { Box, Stack, styled } from "@mui/material";

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
    padding-top: 1.5rem;
    padding-left: 0.8rem;
    padding-right: 0.8rem;
    padding-bottom: 5rem;
  }
`;

export const AuthMainContainer = styled(Stack)`
  flex: 1;

  align-items: center;
  justify-content: center;

  flex-direction: column;

  position: relative;

  min-height: 100vh;
`;

export const AuthLabel = styled(Box)`
  display: flex;

  flex-direction: column;

  justify-content: center;

  position: relative;

  min-height: 90vh;

  gap: 2rem;

  min-width: 45%;

  transition: all cubic-bezier(0.075, 0.82, 0.165, 1) 1s;

  .reserved {
    position: absolute;
    bottom: 0rem;
    align-self: center;
  }

  @media (max-width: 800px) {
    min-width: 90%;
  }
`;
