import * as Yup from "yup";

export const customAppointmentCreateHeaderData = {
  title: "Criação de Agendamento",
  hasBack: true,
};

export const appointmentDataInitialValues = (currentUser) => {
  const { name = "", email = "", telephone = "" } = currentUser;

  return {
    //Step One
    date: new Date(),

    //Step Two
    doctor: null,
    dateTime: null,

    //Step Three
    patientName: name,
    patientEmail: email,
    patientPhone: telephone,
    patientBirthDate: null,
    patientGender: "",

    //Step Four
    reasonConsultation: "",
  };
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
