import { useState } from "react";

import { useHospital } from "../../hooks/use-hospital";

import * as Yup from "yup";

import { extractYupErrors } from "../../utils/general";

import * as S from "./styles";
import { customColors } from "../../styles/colors";

import { Button, IconButton, Stack, Typography } from "@mui/material";

import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useMutation } from "@tanstack/react-query";

import CustomTimePicker from "../customTimePicker/CustomTimePicker";
import { updateHospital } from "../../db/hospital.db";

const actionsSchema = Yup.object().shape({
  startDateAt: Yup.date().required("Campo obrigatorio!"),
  endDateAt: Yup.date().required("Campo obrigatorio!"),
});

export default function SettingsDialog({
  handleCloseOpenSettingsDialog,
  hospitalData,
}) {
  const { data: hospitalDataList, refetch } = useHospital();

  const [errors, setFormErrors] = useState(false);

  const _hospitalData = hospitalData || hospitalDataList?.[0] || {};

  const initialServieceRoomData = _hospitalData?.id
    ? _hospitalData
    : {
        startDateAt: new Date("2023-01-01T08:00:00"),
        endDateAt: new Date("2023-01-01T18:00:00"),
      };

  const [customValues, setCustomValues] = useState(initialServieceRoomData);

  const updateHospitalMutate = useMutation({
    mutationFn: async () => {
      await customHandle({ customValues });

      const hospitalId = _hospitalData?.id;

      await updateHospital(hospitalId, {
        ...customValues,
        createdAt: new Date(customValues.createdAt),
      });
    },
    onSuccess: () => {
      refetch();

      handleCloseOpenSettingsDialog();
    },
    onError: (error) => {
      console.error("cancelAppointmentMutate - error: ", error);
    },
  });

  async function customHandle({ customValues }) {
    try {
      await actionsSchema.validate(customValues, {
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
            Configurações
          </Typography>

          <IconButton onClick={handleCloseOpenSettingsDialog}>
            <CloseRoundedIcon sx={{ color: customColors.black }} />
          </IconButton>
        </Stack>

        <CustomTimePicker
          label="Hora do Começo do expediente"
          value={customValues.startDateAt}
          onChange={(newValue) => {
            setCustomValues((prev) => ({
              ...prev,
              startDateAt: newValue,
            }));

            setFormErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.startDateAt;
              return newErrors;
            });
          }}
          error={errors?.startDateAt}
        />

        <CustomTimePicker
          label="Hora do Fim de expediente"
          value={customValues.endDateAt}
          onChange={(newValue) => {
            setCustomValues((prev) => ({
              ...prev,
              endDateAt: newValue,
            }));

            setFormErrors((prev) => {
              const newErrors = { ...prev };
              delete newErrors.endDateAt;
              return newErrors;
            });
          }}
          error={errors?.endDateAt}
        />
      </Stack>

      <S.ButtonContainerDialog>
        <Button
          variant="text"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();

            handleCloseOpenSettingsDialog();
          }}
          disabled={updateHospitalMutate.isPending}
          loading={updateHospitalMutate.isPending}
        >
          Cancelar
        </Button>

        <Button
          variant="contained"
          fullWidth
          disabled={updateHospitalMutate.isPending}
          loading={updateHospitalMutate.isPending}
          onClick={async (e) => {
            e.stopPropagation();

            await updateHospitalMutate.mutateAsync();
          }}
        >
          Salvar
        </Button>
      </S.ButtonContainerDialog>
    </S.MainDialogContainer>
  );
}
