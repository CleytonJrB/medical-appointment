import { Stack, styled } from "@mui/material";

export const MainDialogContainer = styled(Stack)`
  gap: 1rem;
  flex-direction: column;
  padding: 1rem;
  align-items: center;
  padding-left: 2rem;
  padding-right: 2rem;

  .spanBold {
    font-weight: 700;
  }
`;

export const ButtonContainerDialog = styled(Stack)`
  width: 100%;

  flex-direction: row;

  justify-content: flex-end;

  margin-top: 1rem;

  gap: 1rem;
`;
