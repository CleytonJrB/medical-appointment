import CustomTextField from "../customTextField/CustomTextField";

export default function AppointCreateFour({ values, handleInput, errors }) {
  const { reasonConsultation } = values;

  const inputData = {
    label: "Explique o motivo da consulta",
    value: reasonConsultation,
    field: "reasonConsultation",
    placeholder:
      "Descreva brevemente os sintomas, histórico médico recente ou qualquer informação que o médico deva saber antes da consulta.",
  };

  return (
    <CustomTextField
      label={inputData.label}
      value={inputData.value}
      placeholder={inputData.placeholder}
      fullWidth
      multiline={10}
      error={errors.reasonConsultation}
      onChange={(value) => handleInput(inputData.field, value)}
    />
  );
}
