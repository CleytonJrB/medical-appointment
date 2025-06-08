import { useState } from "react";

import { medicalSpecialtiesList } from "../../constantes";

import * as S from "./styles";

import { Stack } from "@mui/material";

import CustomTextField from "../customTextField/CustomTextField";
import CustomSelected from "../customSelected/CustomSelected";
import { useDoctors } from "../../hooks/use-doctors";
import EmptyList from "../emptyList/EmptyList";
import DoctorsCard from "../doctorsCard/DoctorsCard";
import { formattedHours } from "../../utils/general";

export default function AppointCreateTwo() {
  const [serch, setSerch] = useState("");

  const { data: doctorsList } = useDoctors();

  const hasDoctors = doctorsList && doctorsList.length > 0;

  function renderDoctors(item, index) {
    return (
      <DoctorsCard
        key={index}
        doctor={item}
        handleSelectedHour={(date) =>
          console.log(`Selected hour: ${formattedHours(date)}`)
        }
      />
    );
  }

  return (
    <Stack gap={"1rem"}>
      <S.SearchContainer>
        <CustomTextField
          label="Procurar"
          placeholder="Procurar pelo nome ou especialização"
          value={serch}
          onChange={(e) => setSerch(e)}
        />

        <CustomSelected
          label="Especiaplidades"
          selectedList={medicalSpecialtiesList}
        />
      </S.SearchContainer>

      <Stack gap={"1rem"}>
        {hasDoctors ? doctorsList.map(renderDoctors) : <EmptyList simple />}
      </Stack>
    </Stack>
  );
}
