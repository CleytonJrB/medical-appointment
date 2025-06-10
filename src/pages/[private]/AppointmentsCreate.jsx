import { useCallback, useState } from "react";

import { useCurrentUser } from "../../hooks/use-current-user";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { createAppointment, updateAppointment } from "../../db/appointments.db";

import {
  appointmentDataInitialValues,
  appointmentSchemeStepFour,
  appointmentSchemeStepOne,
  appointmentSchemeStepThree,
  appointmentSchemeStepTwo,
  customAppointmentCreateHeaderData,
} from "../../utils/appointments";
import { extractYupErrors, routes } from "../../utils/general";
import { mergeDateAndTime } from "../../utils/formatDate";

import { CommonMainContainer } from "../../styles/common";

import CustomStepper from "../../components/customStepper/CustomStepper";
import CustomHeader from "../../components/customHeader/CustomHeader";

import AppointCreateOne from "../../components/appointmentsCreateSteps/appointCreateOne";
import AppointCreateTwo from "../../components/appointmentsCreateSteps/AppointCreateTwo";
import AppointCreateThree from "../../components/appointmentsCreateSteps/AppointCreateThree";
import AppointCreateFour from "../../components/appointmentsCreateSteps/AppointCreateFour";
import AppointCreateFive from "../../components/appointmentsCreateSteps/AppointCreateFive";

export default function AppointmentsCreate() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const location = useLocation();

  const isDoctor = currentUser?.type === "DOCTOR";
  const redirectTo = isDoctor
    ? routes.protected.medicalAppointments
    : routes.protected.appointments;

  const editAppointmentData = location?.state ?? null;

  const [appointmentData, setAppointmentData] = useState(
    appointmentDataInitialValues(currentUser, editAppointmentData)
  );
  const [formErrors, setFormErrors] = useState({});

  const handleInput = useCallback((field, value) => {
    const isNestedValue = field?.includes(".");

    setAppointmentData((state) => {
      if (isNestedValue) {
        const [parentField, childrenField] = field.split(".");

        return {
          ...state,
          [parentField]: { ...state[parentField], [childrenField]: value },
        };
      }

      return { ...state, [field]: value };
    });
  }, []);

  const customSteps = [
    {
      label: "Escolha da Data",
      content: () => (
        <AppointCreateOne
          values={appointmentData}
          handleInput={handleInput}
          errors={formErrors}
        />
      ),
      handleNextStep: async () =>
        await customHandleNextStep(appointmentSchemeStepOne),
    },
    {
      label: "Escolha o Médico e a Especialidade",
      content: () => (
        <AppointCreateTwo
          values={appointmentData}
          handleInput={handleInput}
          errors={formErrors}
        />
      ),
      handleNextStep: async () =>
        await customHandleNextStep(appointmentSchemeStepTwo),
    },
    {
      label: "Dados do Paciente",
      content: () => (
        <AppointCreateThree
          values={appointmentData}
          handleInput={handleInput}
          errors={formErrors}
        />
      ),
      handleNextStep: async () =>
        await customHandleNextStep(appointmentSchemeStepThree),
    },
    {
      label: "Observacoes",
      content: () => (
        <AppointCreateFour
          values={appointmentData}
          handleInput={handleInput}
          errors={formErrors}
        />
      ),
      handleNextStep: async () =>
        await customHandleNextStep(appointmentSchemeStepFour),
    },
    {
      label: "Confirmação",
      content: () => (
        <AppointCreateFive values={appointmentData} errors={formErrors} />
      ),
    },
  ];

  const appointmentMutate = useMutation({
    mutationFn: async () => {
      const { date, dateTime, ...others } = appointmentData;

      if (appointmentData?.id) {
        const id = appointmentData?.id;

        const appointmentDataToEdit = {
          ...appointmentData,
          appointmentDate: mergeDateAndTime(date, dateTime),
        };

        await updateAppointment(id, appointmentDataToEdit);
      } else {
        const appointmentDataToSubmit = {
          ...others,
          date,
          dateTime,
          appointmentDate: mergeDateAndTime(date, dateTime),
          status: "pending",
          createdBy: Number(currentUser?.id),
        };

        await createAppointment(appointmentDataToSubmit);
      }
    },
    onSuccess: () => {
      navigate(redirectTo);
    },
    onError: (error) => {
      console.error("createEmailCampaignMutate - error: ", error);
    },
  });

  async function customHandleNextStep(scheme) {
    try {
      await scheme.validate(appointmentData, {
        abortEarly: false,
      });
      setFormErrors({});
    } catch (error) {
      setFormErrors(extractYupErrors(error));
      throw error;
    }
  }

  return (
    <CommonMainContainer sx={{ gap: "1rem" }}>
      <CustomHeader
        {...customAppointmentCreateHeaderData(!!editAppointmentData?.id)}
      />

      <CustomStepper
        steps={customSteps}
        mutateComplete={() => appointmentMutate.mutateAsync()}
        loading={appointmentMutate.isPending}
        enable={appointmentData?.id}
      />
    </CommonMainContainer>
  );
}
