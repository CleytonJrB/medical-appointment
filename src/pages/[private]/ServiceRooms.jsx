import { CommonMainContainer } from "../../styles/common";

import { Button, Stack } from "@mui/material";

import CustomHeader from "../../components/customHeader/CustomHeader";
import ServiceRoomsCard from "../../components/serviceRoomsCard/ServiceRoomsCard";
import { useServiceRooms } from "../../hooks/use-service-rooms";
import EmptyList from "../../components/emptyList/EmptyList";
import { useState } from "react";
import CustomDialog from "../../components/customDialog/CustomDialog";
import CustomDialogCreateServiceRooms from "../../components/dialogs/CustomDialogCreateServiceRooms";

export default function ServiceRooms() {
  const { data: serviceRooms } = useServiceRooms();

  const hasServiceRooms = serviceRooms && serviceRooms.length > 0;

  const [openCloseCreateServiceRooms, setOpenCloseCreateServiceRooms] =
    useState(false);

  const customHeaderData = {
    title: "Salas de Atendimento",
    description: "Gerencie as salas de atendimento disponíveis.",
  };

  function handleOpenCloseCreateServiceRooms() {
    setOpenCloseCreateServiceRooms((state) => !state);
  }

  function renderServiceRoomCard(item, index) {
    return <ServiceRoomsCard key={index} {...item} />;
  }

  return (
    <CommonMainContainer gap={"1rem"}>
      <CustomHeader {...customHeaderData}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenCloseCreateServiceRooms}
        >
          Criar uma nova sala
        </Button>
      </CustomHeader>

      <CustomDialog
        open={openCloseCreateServiceRooms}
        handleCloseDialog={handleOpenCloseCreateServiceRooms}
      >
        <CustomDialogCreateServiceRooms
          handleOpenCloseCreateServiceRooms={handleOpenCloseCreateServiceRooms}
        />
      </CustomDialog>

      {hasServiceRooms ? (
        <Stack direction={"row"} width="100%" flexWrap="wrap" gap={2}>
          {serviceRooms.map(renderServiceRoomCard)}
        </Stack>
      ) : (
        <EmptyList simple />
      )}
    </CommonMainContainer>
  );
}
