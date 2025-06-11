import { useState } from "react";
import { useMutation } from "@tanstack/react-query";

import {
  createServiceRooms,
  updateServiceRooms,
} from "../../db/serviceRooms.db";

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
  servicesRoomsData,
  refetchServiceRooms,
}) {
  const [errors, setFormErrors] = useState(false);

  const initialServieceRoomData = servicesRoomsData?.id
    ? servicesRoomsData
    : {
        name: "",
        description: "",
      };

  const [customValues, setCustomValues] = useState(initialServieceRoomData);

  const serviceRoomsMutate = useMutation({
    mutationFn: async () => {
      await customHandle();

      if (servicesRoomsData?.id) {
        const id = servicesRoomsData?.id;

        await updateServiceRooms(id, { ...customValues, status: "active" });
      } else {
        await createServiceRooms({ ...customValues, status: "active" });
      }
    },
    onSuccess: () => {
      refetchServiceRooms();

      handleOpenCloseCreateServiceRooms();
    },
    onError: (error) => {
      console.error("createEmailCampaignMutate - error: ", error);
    },
  });

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
              setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.name;
                return newErrors;
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
              setFormErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.description;
                return newErrors;
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
          disabled={serviceRoomsMutate.isPending}
          loading={serviceRoomsMutate.isPending}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={serviceRoomsMutate.isPending}
          loading={serviceRoomsMutate.isPending}
          onClick={async (e) => {
            e.stopPropagation();

            await serviceRoomsMutate.mutateAsync();
          }}
        >
          Criar
        </Button>
      </S.ButtonContainerDialog>
    </S.MainDialogContainer>
  );
}
