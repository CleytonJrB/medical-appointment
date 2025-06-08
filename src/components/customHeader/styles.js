import { Stack, styled } from "@mui/material";

export const MainContainer = styled(Stack)`
  width: 100%;

  align-items: center;
  justify-content: space-between;

  flex-direction: row;

  gap: 1rem;

  position: relative;
  flex-wrap: wrap;

  max-width: 100vw;
`;

export const TitleContainer = styled(Stack)`
  align-items: baseline;
  justify-content: baseline;

  flex-direction: column;

  position: relative;
`;

export const MainInformation = styled(Stack)`
  display: flex;

  flex-direction: row;

  align-items: center;
  justify-content: center;

  gap: 1rem;
`;

export const ColumnContainer = styled(Stack)`
  display: flex;
  flex-direction: column;

  align-items: baseline;

  gap: 0.5rem;
`;
