import { useMemo, useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useServiceRooms } from "../../hooks/use-service-rooms";

import { updateServiceRooms } from "../../db/serviceRooms.db";

import { CommonMainContainer } from "../../styles/common";

import { Button, Stack } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";
import ServiceRoomsCard from "../../components/serviceRoomsCard/ServiceRoomsCard";
import EmptyList from "../../components/emptyList/EmptyList";
import CustomDialog from "../../components/customDialog/CustomDialog";
import CustomDialogCreateServiceRooms from "../../components/dialogs/CustomDialogCreateServiceRooms";
import CustomTextField from "../../components/customTextField/CustomTextField";

export default function ServiceRooms() {
  const { data: serviceRooms, refetch: refetchServiceRooms } =
    useServiceRooms();

  const [openCloseCreateServiceRooms, setOpenCloseCreateServiceRooms] =
    useState({ open: false, serviceRooms: null });

  const [searchFilter, setSearchFilter] = useState();

  const filteredServiceRooms = useMemo(() => {
    if (!searchFilter) return serviceRooms;

    return serviceRooms.filter((sr) => {
      const searchTerm = searchFilter.toLowerCase();
      return (
        sr.name.toLowerCase().includes(searchTerm) ||
        sr.description.toLowerCase().includes(searchTerm)
      );
    });
  }, [searchFilter, serviceRooms]);

  const hasServiceRooms =
    filteredServiceRooms && filteredServiceRooms.length > 0;

  const customHeaderData = {
    title: "Salas de Atendimento",
    description: "Gerencie as salas de atendimento disponíveis.",
  };

  const updateStatusMutate = useMutation({
    mutationFn: async (sr) => {
      const id = sr?.id;
      const newStatus = sr?.status === "active" ? "inactive" : "active";

      await updateServiceRooms(id, { ...sr, status: newStatus });
    },
    onSuccess: () => {
      refetchServiceRooms();
    },
    onError: (error) => {
      console.error("updateStatusMutate - error: ", error);
    },
  });

  function handleOpenCloseCreateServiceRooms(serviceRoomsData) {
    setOpenCloseCreateServiceRooms((state) => {
      return {
        open: !state.open,
        serviceRooms: serviceRoomsData ?? null,
      };
    });
  }

  function renderServiceRoomCard(item, index) {
    return (
      <ServiceRoomsCard
        key={index}
        onEditClick={(sr) => handleOpenCloseCreateServiceRooms(sr)}
        onUpdateStatusClick={(sr) => updateStatusMutate.mutateAsync(sr)}
        isLoading={updateStatusMutate.isLoading}
        {...item}
      />
    );
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenCloseCreateServiceRooms(null)}
        >
          Criar uma nova sala
        </Button>
      </CustomHeader>

      <CustomDialog
        open={openCloseCreateServiceRooms.open}
        handleCloseDialog={() => handleOpenCloseCreateServiceRooms(null)}
      >
        <CustomDialogCreateServiceRooms
          handleOpenCloseCreateServiceRooms={() =>
            handleOpenCloseCreateServiceRooms(null)
          }
          servicesRoomsData={openCloseCreateServiceRooms.serviceRooms}
          refetchServiceRooms={refetchServiceRooms}
        />
      </CustomDialog>

      <Stack maxWidth={"60%"} width={"100%"} marginBottom={2}>
        <CustomTextField
          label="Procurar"
          placeholder="Procurar pelo nome ou descrição da sala"
          value={searchFilter}
          fullWidth
          onChange={(e) => {
            setSearchFilter(e);
          }}
        />
      </Stack>

      {hasServiceRooms ? (
        <Stack direction={"row"} width="100%" flexWrap="wrap" gap={2}>
          {filteredServiceRooms.map(renderServiceRoomCard)}
        </Stack>
      ) : (
        <EmptyList simple />
      )}
    </CommonMainContainer>
  );
}
