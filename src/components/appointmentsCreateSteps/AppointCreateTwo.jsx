import { useMemo, useState } from "react";

import { useDoctors } from "../../hooks/use-doctors";
import { useAppointments } from "../../hooks/use-appointments";

import { isSameDay } from "date-fns";

import { medicalSpecialtiesList } from "../../constantes";
import { combinedFilterDoctors } from "../../utils/appointments";

import * as S from "./styles";

import { FormHelperText, Stack } from "@mui/material";

import CustomTextField from "../customTextField/CustomTextField";
import CustomSelected from "../customSelected/CustomSelected";
import EmptyList from "../emptyList/EmptyList";
import DoctorsCard from "../doctorsCard/DoctorsCard";

export default function AppointCreateTwo({ values, handleInput, errors }) {
  const { doctor, date, dateTime } = values;

  const { data: allAppointments } = useAppointments();

  const _allAppointments = allAppointments?.filter((appointment) => {
    const condition = isSameDay(date, new Date(appointment?.appointmentDate));
    const isCancelled = appointment.status === "cancelled";
    const isCompleted = appointment.status === "completed";

    return condition && !isCancelled && !isCompleted;
  });

  const hasError = errors?.doctor;

  const [searchFilter, setSearchFilter] = useState({
    search: "",
    medicalSpecialties: [],
  });

  const { data: doctorsList } = useDoctors();

  const resultFilterDoctorList = useMemo(() => {
    return combinedFilterDoctors(searchFilter, doctorsList);
  }, [searchFilter, doctorsList]);

  const hasDoctors =
    resultFilterDoctorList && resultFilterDoctorList.length > 0;

  function handleSelectedDoctor(doctorData) {
    const { dateTime, doctor } = doctorData;

    handleInput("doctor", doctor.id);
    handleInput("dateTime", dateTime);
  }

  function renderDoctors(item, index) {
    const isSelected = doctor == item?.id;

    const appointmentsForDoctor = _allAppointments
      ?.filter((appointment) => appointment?.doctor?.id === item?.id)
      .map((appointment) => new Date(appointment?.dateTime));

    return (
      <DoctorsCard
        key={index}
        doctor={item}
        doctorIsSelected={isSelected}
        hoursSelected={dateTime}
        handleSelectedDoctor={handleSelectedDoctor}
        appointmentsForDoctor={appointmentsForDoctor}
        hasSelectedHoues
      />
    );
  }

  return (
    <Stack gap={"1rem"}>
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

      {hasError && (
        <FormHelperText error>
          *Escolha um horário de algum Doutor.
        </FormHelperText>
      )}

      <Stack gap={"1rem"}>
        {hasDoctors ? (
          resultFilterDoctorList.map(renderDoctors)
        ) : (
          <EmptyList simple />
        )}
      </Stack>
    </Stack>
  );
}
