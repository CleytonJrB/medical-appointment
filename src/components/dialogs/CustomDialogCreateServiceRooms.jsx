import { useState } from "react";

import * as Yup from "yup";

import { extractYupErrors } from "../../utils/general";

import * as S from "./styles";
import { customColors } from "../../styles/colors";

import { Button, IconButton, Stack, Typography } from "@mui/material";
import CustomTextField from "../customTextField/CustomTextField";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const actionsCreateServiceRoomsSchema = () =>
  Yup.object().shape({
    name: Yup.string().required("Campo obrigatorio!"),
    description: Yup.string().required("Campo obrigatorio!"),
  });

export default function CustomDialogCreateServiceRooms({
  handleOpenCloseCreateServiceRooms,
}) {
  const [loading, setLoding] = useState(false);
  const [errors, setFormErrors] = useState(false);

  const [customValues, setCustomValues] = useState({
    name: "",
    description: "",
  });

  async function handleCreate() {
    try {
      setLoding(true);

      await customHandle();

      handleOpenCloseCreateServiceRooms();
    } catch (error) {
      console.error("Error deleting contact items:", error);
    } finally {
      setLoding(false);
    }
  }

  async function customHandle() {
    try {
      await actionsCreateServiceRoomsSchema().validate(customValues, {
        abortEarly: false,
      });

      setFormErrors({});
    } catch (error) {
      setFormErrors(extractYupErrors(error));
      throw error;
    }
  }

  return (
    <S.MainDialogContainer sx={{ padding: "1rem" }}>
      <Stack gap={"1rem"} width={"100%"}>
        <Stack
          width="100%"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          gap="1rem"
        >
          <Typography variant="body1" fontWeight={700}>
            Criar Sala de Atendimento
          </Typography>

          <IconButton onClick={handleOpenCloseCreateServiceRooms}>
            <CloseRoundedIcon sx={{ color: customColors.black }} />
          </IconButton>
        </Stack>

        <Stack gap={"0.5rem"}>
          <CustomTextField
            name="name"
            label="Nome"
            placeholder={"Sala 1"}
            error={errors.name}
            value={customValues.name}
            onChange={(e) => {
              setCustomValues((prev) => {
                return { ...prev, name: e };
              });
            }}
          />

          <CustomTextField
            name="description"
            label="Descrição"
            placeholder={"Essa sala esta destinada a..."}
            error={errors.description}
            value={customValues.description}
            onChange={(e) => {
              setCustomValues((prev) => {
                return { ...prev, description: e };
              });
            }}
          />
        </Stack>
      </Stack>

      <S.ButtonContainerDialog>
        <Button
          variant="text"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();

            handleOpenCloseCreateServiceRooms();
          }}
          disabled={loading}
          loading={loading}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={loading}
          loading={loading}
          onClick={async (e) => {
            e.stopPropagation();

            await handleCreate();
          }}
        >
          Criar
        </Button>
      </S.ButtonContainerDialog>
    </S.MainDialogContainer>
  );
}
