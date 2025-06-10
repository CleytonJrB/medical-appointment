import * as Yup from "yup";

export const customAppointmentCreateHeaderData = (isEditing) => {
  const title = isEditing ? "Edição de Agendamento" : "Criação de Agendamento";

  return {
    title,
    hasBack: true,
  };
};

export const appointmentDataInitialValues = (currentUser, stateRedirect) => {
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

  if (stateRedirect) {
    const editValues = {
      id: stateRedirect.id || null,

      //Step One
      date: stateRedirect.date ? new Date(stateRedirect.date) : new Date(),

      //Step Two
      doctor: stateRedirect.doctor.id || null,
      dateTime: stateRedirect.dateTime
        ? new Date(stateRedirect.dateTime)
        : null,

      //Step Three
      patientName: stateRedirect.patientName || name,
      patientEmail: stateRedirect.patientEmail || email,
      patientPhone: stateRedirect.patientPhone || phoneNumber,
      patientBirthDate: stateRedirect.patientBirthDate
        ? new Date(stateRedirect.patientBirthDate)
        : null,
      patientGender: stateRedirect.patientGender || "",

      //Step Four
      reasonConsultation: stateRedirect.reasonConsultation || "",
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
    const docTorMedicalSpecialties = doctor?.specialtys || [];

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
    case "canceled":
      return { label: "Cancelado", color: "error" };
    case "completed":
      return { label: "Concluído", color: "primary" };
    default:
      return { label: "Desconhecido", color: "default" };
  }
}
