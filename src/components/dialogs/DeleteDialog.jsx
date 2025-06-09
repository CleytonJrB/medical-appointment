import { useState } from "react";

import { useCurrentUser } from "../../hooks/use-current-user";

import * as Yup from "yup";

import { extractYupErrors } from "../../utils/general";

import * as S from "./styles";
import { customColors } from "../../styles/colors";

import { Button, IconButton, Stack, Typography } from "@mui/material";
import CustomTextField from "../customTextField/CustomTextField";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const actionsDeleteSchema = (emailToConfirm) =>
  Yup.object().shape({
    email: Yup.string()
      .email("Formato de E-mail invalido!")
      .oneOf([emailToConfirm], "Os emails não se conicidem.")
      .required("Campo obrigatorio!"),
  });

export default function DeleteDialog({
  handleCloseOpenDialogDelete,
  mutate,
  hasConfirmation = false,

  confirmDeleteTitle = `Deletar permanentemente`,
  confirmDeleteMessage = `Você está prestes a deletar permanentemente`,
  confirmDeleteDescription = "Essa operação é irreversível. Tem certeza de que deseja continuar?",

  cancelDeleteButtonTitle = "Deletar",
}) {
  const user = useCurrentUser();

  const emailToConfirm = user?.email;

  const [loading, setLoding] = useState(false);
  const [errors, setFormErrors] = useState(false);
  const [email, setEmail] = useState("");

  async function handleDelete() {
    try {
      setLoding(true);

      if (hasConfirmation) {
        await customHandle();
      }

      await mutate();

      handleCloseOpenDialogDelete();
    } catch (error) {
      console.error("Error deleting contact items:", error);
    } finally {
      setLoding(false);
    }
  }

  async function customHandle() {
    try {
      await actionsDeleteSchema(emailToConfirm).validate(
        { email },
        {
          abortEarly: false,
        }
      );

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
            {confirmDeleteTitle}
          </Typography>

          <IconButton onClick={handleCloseOpenDialogDelete}>
            <CloseRoundedIcon sx={{ color: customColors.black }} />
          </IconButton>
        </Stack>

        {confirmDeleteMessage && (
          <Typography variant="body1">{confirmDeleteMessage}</Typography>
        )}

        {confirmDeleteDescription && (
          <Typography variant="body1">{confirmDeleteDescription}</Typography>
        )}

        {hasConfirmation && (
          <Stack gap={"0.5rem"}>
            <Typography variant="body1">
              Confirme seu <span className="spanBold">E-mail</span> para
              continuar:
            </Typography>

            <CustomTextField
              name="email"
              type="email"
              label="Email"
              placeholder={"Example@email.com"}
              onChange={(e) => {
                setEmail(e);
              }}
              error={errors.email}
              value={email}
            />
          </Stack>
        )}
      </Stack>

      <S.ButtonContainerDialog>
        <Button
          variant="text"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();

            handleCloseOpenDialogDelete();
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

            await handleDelete();
          }}
        >
          {cancelDeleteButtonTitle}
        </Button>
      </S.ButtonContainerDialog>
    </S.MainDialogContainer>
  );
}
