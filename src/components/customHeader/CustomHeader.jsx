import { useNavigate } from "react-router-dom";

import * as S from "./styles";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { customColors } from "../../styles/colors";

export default function CustomHeader(props) {
  const navigate = useNavigate();

  const { title, description, children, icon, hasBack } = props;

  return (
    <S.MainContainer>
      <S.ColumnContainer>
        {hasBack && (
          <Stack direction="row" alignItems="center" gap={0.2}>
            <Button
              onClick={() => navigate(-1)}
              startIcon={
                <ArrowBackRoundedIcon sx={{ color: customColors.black }} />
              }
              sx={{ textTransform: "none", padding: "0.4rem 0.8rem" }}
            >
              <Typography variant="body1" fontWeight={600}>
                Voltar
              </Typography>
            </Button>
          </Stack>
        )}

        <S.MainInformation>
          {icon}

          <S.TitleContainer>
            <Typography variant="h4" fontWeight={600}>
              {title}
            </Typography>

            {description && (
              <Typography variant="body1" fontStyle="italic">
                {description}
              </Typography>
            )}
          </S.TitleContainer>
        </S.MainInformation>
      </S.ColumnContainer>

      {children}
    </S.MainContainer>
  );
}
