import { apiFetch } from "../services/api";

export async function getServiceRooms() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch("/ServiceRooms", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching serviceRooms:", error);
    return [];
  }
}

export async function getMyServiceRooms() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch("/ServiceRooms/my", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching serviceRooms:", error);
    return [];
  }
}

export async function getServiceRoomsById(id) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch(`/ServiceRooms/${id}`, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching serviceRooms by ID:", error);
    return null;
  }
}

export async function createServiceRooms(serviceRoomsData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const _serviceRoomsData = {
      ...serviceRoomsData,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(_serviceRoomsData),
      redirect: "follow",
    };

    const response = await apiFetch("/ServiceRooms", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error creating serviceRooms:", error);
    return null;
  }
}

export async function updateServiceRooms(id, serviceRoomsData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const _serviceRoomsData = {
      ...serviceRoomsData,
      updatedAt: new Date(),
    };

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(_serviceRoomsData),
      redirect: "follow",
    };

    const response = await apiFetch(`/ServiceRooms/${id}`, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating serviceRooms:", error);
    return null;
  }
}
