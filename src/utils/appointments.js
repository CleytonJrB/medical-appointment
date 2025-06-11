import * as Yup from "yup";

import { addDays, isAfter, isSameDay } from "date-fns";

export const customAppointmentCreateHeaderData = (isEditing) => {
  const title = isEditing ? "Edição de Agendamento" : "Criação de Agendamento";

  return {
    title,
    hasBack: true,
  };
};

export const appointmentDataInitialValues = (
  currentUser,
  editAppointmentData
) => {
  const { name = "", email = "", phoneNumber = "" } = currentUser;

  const defaultValues = {
    //Step One
    date: new Date(),

    //Step Two
    doctor: null,
    dateTime: null,

    //Step Three
    patientName: name,
    patientEmail: email,
    patientPhone: phoneNumber,
    patientBirthDate: null,
    patientGender: "",

    //Step Four
    reasonConsultation: "",
  };

  if (editAppointmentData) {
    const formatted = formattedAppointmentData(editAppointmentData);

    const editValues = {
      ...formatted,
      doctor: editAppointmentData.doctor.id || null,
    };

    return editValues;
  }

  return defaultValues;
};

export const appointmentSchemeStepOne = Yup.object().shape({
  date: Yup.date().required("Campo obrigatorio!"),
});

export const appointmentSchemeStepTwo = Yup.object().shape({
  doctor: Yup.string().required("Campo obrigatorio!"),
  dateTime: Yup.date().required("Campo obrigatorio!"),
});

export const appointmentSchemeStepThree = Yup.object().shape({
  patientName: Yup.string().required("Campo obrigatorio!"),
  patientEmail: Yup.string()
    .email("Formato de E-mail invalido!")
    .required("Campo obrigatorio!"),
  patientPhone: Yup.string().required("Campo obrigatorio!"),
  patientBirthDate: Yup.date().required("Campo obrigatorio!"),
  patientGender: Yup.string().required("Campo obrigatorio!"),
});

export const appointmentSchemeStepFour = Yup.object().shape({
  reasonConsultation: Yup.string().required("Campo obrigatorio!"),
});

export function combinedFilterDoctors(searchFilter, doctorList) {
  const { search, medicalSpecialties } = searchFilter;

  if (!doctorList) return [];

  let validSearch = true;
  let validMedicalSpecialties = true;

  return doctorList?.filter((doctor) => {
    const docTorMedicalSpecialties = doctor?.specialties || [];

    if (search) {
      validSearch = doctor.name.toLowerCase().includes(search.toLowerCase());
    }

    if (medicalSpecialties.length > 0) {
      validMedicalSpecialties = docTorMedicalSpecialties.some((specialty) => {
        return medicalSpecialties.includes(specialty);
      });
    }

    return validSearch && validMedicalSpecialties;
  });
}

export function appointmentChipByStatus(status) {
  switch (status) {
    case "pending":
      return { label: "Esperando uma resposta", color: "warning" };
    case "confirmed":
      return { label: "Confirmado", color: "success" };
    case "cancelled":
      return { label: "Não aceito", color: "error" };
    case "completed":
      return { label: "Concluído", color: "primary" };
    default:
      return { label: "Desconhecido", color: "default" };
  }
}

export function formattedAppointmentData(appointment) {
  if (!appointment) return {};

  return {
    ...appointment,
    patientBirthDate: new Date(appointment.patientBirthDate),
    appointmentDate: new Date(appointment.appointmentDate),
    createdAt: new Date(appointment.createdAt),
    updatedAt: new Date(appointment.updatedAt),
    date: new Date(appointment.date),
    dateTime: new Date(appointment.dateTime),
  };
}

export function isCustomDaysBefore({ days = 2, targetDate }) {
  const today = new Date();

  const twoDaysBefore = addDays(today, days);

  return (
    isSameDay(twoDaysBefore, targetDate) || isAfter(twoDaysBefore, targetDate)
  );
}
