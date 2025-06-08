import { Stack } from "@mui/material";

import CustomTextField from "../customTextField/CustomTextField";
import CustomDatePicker from "../customDatePicker/CustomDatePicker";
import CustomSelected from "../customSelected/CustomSelected";
import { genderList } from "../../constantes";

export default function AppointCreateThree({ values, handleInput, errors }) {
  const {
    patientName,
    patientEmail,
    patientPhone,
    patientBirthDate,
    patientGender,
  } = values;

  const inputsList = [
    {
      label: "Nome do Paciente",
      value: patientName,
      field: "patientName",
      placeholder: "Digite o nome do paciente",
    },
    {
      label: "Email do Paciente",
      value: patientEmail,
      field: "patientEmail",
      placeholder: "Digite o email do paciente",
    },
    {
      label: "Data de Nascimento do Paciente",
      value: patientBirthDate,
      field: "patientBirthDate",
      placeholder: "Digite a data de nascimento do paciente (DD/MM/AAAA)",
    },
    {
      label: "Gênero do Paciente",
      value: patientGender,
      field: "patientGender",
      placeholder: "Selecione o gênero do paciente",
    },
    {
      label: "Telefone do Paciente",
      value: patientPhone,
      field: "patientPhone",
      placeholder: "Digite o telefone do paciente",
    },
  ];

  function renderDatePicker(input, index) {
    const { label, value, field } = input;

    return (
      <CustomDatePicker
        key={index}
        value={value}
        label={label}
        error={errors[field]}
        onChange={(date) => {
          handleInput(field, date);
        }}
      />
    );
  }

  function renderGenderSelect(input, index) {
    const { label, value, field } = input;

    return (
      <CustomSelected
        key={index}
        value={value}
        label={label}
        list={genderList}
        error={errors[field]}
        onChange={(selected) => {
          handleInput(field, selected);
        }}
      />
    );
  }

  function renderInputs(input, index) {
    const { label, value, field, placeholder } = input;

    const isBirthDate = field === "patientBirthDate";
    const isGender = field === "patientGender";
    const isPhone = field === "patientPhone";
    const maskPhone = isPhone ? "PHONE" : null;

    if (isBirthDate) {
      return renderDatePicker(input, index);
    }

    if (isGender) {
      return renderGenderSelect(input, index);
    }

    return (
      <CustomTextField
        key={index}
        value={value}
        label={label}
        placeholder={placeholder}
        mask={maskPhone}
        error={errors[field]}
        onChange={(text) => {
          handleInput(field, text);
        }}
      />
    );
  }
  return <Stack gap={2}>{inputsList.map(renderInputs)}</Stack>;
}
