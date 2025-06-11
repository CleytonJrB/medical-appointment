import { apiFetch } from "../services/api";

export async function getHospital() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch("/Hospital", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching hospital:", error);
    return [];
  }
}

export async function getHospitalById(id) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch(`/Hospital/${id}`, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error fetching hospital by ID:", error);
    return null;
  }
}

export async function createHospital(hospitalData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const _hospitalData = {
      ...hospitalData,
      updatedAt: new Date(),
      createdAt: new Date(),
    };

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(_hospitalData),
      redirect: "follow",
    };

    const response = await apiFetch("/Hospital", requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error creating hospital:", error);
    return null;
  }
}

export async function updateHospital(id, hospitalData) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const _hospitalData = {
      ...hospitalData,
      updatedAt: new Date(),
    };

    const requestOptions = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(_hospitalData),
      redirect: "follow",
    };

    const response = await apiFetch(`/Hospital/${id}`, requestOptions);

    const result = await response.json();

    return result;
  } catch (error) {
    console.error("Error updating hospital:", error);
    return null;
  }
}
