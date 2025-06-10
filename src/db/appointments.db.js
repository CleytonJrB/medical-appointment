import { apiFetch } from "../services/api";

export async function getAppointments() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch("/Appointment", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function getMyAppointments() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch("/Appointment/my", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function getAppointmentById(id) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch(`/Appointment/${id}`, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching appointment by ID:", error);
    return null;
  }
}

export async function createAppointment(appointmentData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(appointmentData),
      redirect: "follow",
    };

    const response = await apiFetch("/Appointment", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error creating appointment:", error);
    return null;
  }
}

export async function updateAppointment(id, appointmentData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(appointmentData),
      redirect: "follow",
    };

    const response = await apiFetch(`/Appointment/${id}`, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating appointment:", error);
    return null;
  }
}
