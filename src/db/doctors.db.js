import { apiFetch } from "../services/api";

export async function getDoctors() {
  try {
    const myHeaders = new Headers();
    myHeaders.append("accept", "text/plain");

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await apiFetch("/Doctors", requestOptions);

    const result = await response.json();

    const _result = result.map((doctor) => {
      // eslint-disable-next-line no-unused-vars
      const { passwordHash, ...others } = doctor;

      return {
        ...others,
        hours: [], // Placeholder for hours, can be filled later
      };
    });

    return _result;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return [];
  }
}
