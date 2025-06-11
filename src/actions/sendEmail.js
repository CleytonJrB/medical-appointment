// {
//   "to": "cleytonjrbg.dev@gmail.com",
//   "name": "Cleyton Barbosa",
//   "doctor": "Mariana Lopes",
//   "date": "18/06/2025 - 15:00",
//   "room": "Sala 101 - Clínica Geral"
// }

const PROD_URL =
  "https://cleytonjrbg.app.n8n.cloud/webhook/6ce61fd6-7b6c-473a-8224-73b9708adc01";
const DEV_URL =
  "https://cleytonjrbg.app.n8n.cloud/webhook-test/6ce61fd6-7b6c-473a-8224-73b9708adc01";

const WEBHOOK_BASIC_AUTH_PASS = "7uqZwUmRVQ63cixKpQEUaYHcNOA2m5lN";

export async function sendEmail(emailBody) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Basic ${WEBHOOK_BASIC_AUTH_PASS}`);

    const _emailBody = {
      ...emailBody,
      to: "cleytonjrbg.dev@gmail.com",
    };

    const raw = JSON.stringify(_emailBody);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(PROD_URL, requestOptions);

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
