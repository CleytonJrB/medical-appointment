import { useQuery } from "@tanstack/react-query";

import { useDoctors } from "./use-doctors";
import { queryKeys } from "../constantes";
import { getAppointments } from "../db/appointments.db";

//status - pending, confirmed, canceled, completed

// const mookAppointments = [
//   {
//     id: "asd22133f",
//     doctor: "453u23dda",
//     patientName: "John Doe",
//     patientEmail: "John@email.com",
//     patientPhone: "81 98177-5815",
//     patientBirthDate: "1998-07-10T03:00:00.000Z",
//     patientGender: "male",
//     reasonConsultation:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
//     date: "2025-06-24T03:00:00.000Z",
//     dateTime: "2025-06-08T23:03:17.237Z",
//     appointmentDate: "2025-06-24T23:03:17.237Z",
//     status: "pending",

//     createdAt: new Date(),
//     updatedAt: new Date(),

//     createdBy: "1",

//     // Mock data for doctor
//     serviceRoomId: "dsad323432",
//   },
// ];

export const useAppointments = () => {
  const doctors = useDoctors();

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.appointments],
    queryFn: async () => await getAppointments(),
  });

  const appointmentsWithDoctors = (data ?? []).map((appointment) => {
    const doctor = doctors.data.find((doc) => doc.id === appointment.doctor);

    return {
      ...appointment,
      doctor: doctor ? doctor : appointment.doctor,
    };
  });

  return {
    data: appointmentsWithDoctors,
    loading: isLoading,
  };
};
