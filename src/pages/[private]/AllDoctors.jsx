import { useMemo, useState } from "react";

import { useDoctors } from "../../hooks/use-doctors";

import { combinedFilterDoctors } from "../../utils/appointments";

import { medicalSpecialtiesList } from "../../constantes";

import * as S from "../../components/appointmentsCreateSteps/styles";
import { CommonMainContainer } from "../../styles/common";

import CustomHeader from "../../components/customHeader/CustomHeader";
import EmptyList from "../../components/emptyList/EmptyList";
import CustomTextField from "../../components/customTextField/CustomTextField";
import CustomSelected from "../../components/customSelected/CustomSelected";
import DoctorsCard from "../../components/doctorsCard/DoctorsCard";
import { Stack } from "@mui/material";

export default function AllDoctors() {
  const { data: doctorsList } = useDoctors();

  const [searchFilter, setSearchFilter] = useState({
    search: "",
    medicalSpecialties: [],
  });

  const resultFilterDoctorList = useMemo(() => {
    return combinedFilterDoctors(searchFilter, doctorsList);
  }, [searchFilter, doctorsList]);

  const hasDoctors =
    resultFilterDoctorList && resultFilterDoctorList.length > 0;

  const customHeaderData = {
    title: "Todos os Médicos",
    description: "Encontre o médico ideal para você",
  };

  function renderDoctors(item, index) {
    return <DoctorsCard key={index} doctor={item} />;
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData} />

      <S.SearchContainer>
        <CustomTextField
          label="Procurar"
          placeholder="Procurar pelo nome ou especialização"
          value={searchFilter.search}
          onChange={(e) => {
            setSearchFilter((state) => {
              return { ...state, search: e };
            });
          }}
        />

        <CustomSelected
          label="Especiaplidades"
          list={medicalSpecialtiesList}
          multiple
          value={searchFilter.medicalSpecialties}
          onChange={(e) => {
            setSearchFilter((state) => {
              return { ...state, medicalSpecialties: e };
            });
          }}
        />
      </S.SearchContainer>

      <Stack gap={"1rem"} width={"100%"}>
        {hasDoctors ? (
          resultFilterDoctorList.map(renderDoctors)
        ) : (
          <EmptyList simple />
        )}
      </Stack>
    </CommonMainContainer>
  );
}
