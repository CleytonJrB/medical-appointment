import { useCallback, useState } from "react";

import { useCurrentUser } from "../../hooks/use-current-user";
import { useLocation } from "react-router-dom";

import {
  appointmentDataInitialValues,
  appointmentSchemeStepFour,
  appointmentSchemeStepOne,
  appointmentSchemeStepThree,
  appointmentSchemeStepTwo,
  customAppointmentCreateHeaderData,
} from "../../utils/appointments";
import { extractYupErrors } from "../../utils/general";
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
  const currentUser = useCurrentUser();
  const location = useLocation();

  const stateRedirect = location.state;

  const [appointmentData, setAppointmentData] = useState(
    appointmentDataInitialValues(currentUser, stateRedirect)
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

  async function handleConcluded() {
    const { date, dateTime, ...others } = appointmentData;

    const appointmentDataToSubmit = {
      ...others,
      date,
      dateTime,
      appointmentDate: mergeDateAndTime(date, dateTime),
      status: "pending",
      createAt: new Date(),
      updateAt: new Date(),
    };

    console.log("Appointment data submitted:", appointmentDataToSubmit);
  }

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
        {...customAppointmentCreateHeaderData(!!stateRedirect?.id)}
      />

      <CustomStepper steps={customSteps} mutateComplete={handleConcluded} />
    </CommonMainContainer>
  );
}
