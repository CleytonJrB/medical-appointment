// {
//   "to": "cleytonjrbg.dev@gmail.com",
//   "name": "Cleyton Barbosa",
//   "doctor": "Mariana Lopes",
//   "date": "18/06/2025 - 15:00",
//   "room": "Sala 101 - Clínica Geral"
// }

import { sendEmailHtml } from "../templates/sendEmailHtml";

const PROD_URL = "https://api.resend.com/emails";

const RESEND_API_TOKEN = "re_ZmTPRKc7_HrZsTrWgvoUQ39u55GybMsCm";

export async function sendEmail(emailBody) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${RESEND_API_TOKEN}`);

    const _emailBody = {
      ...emailBody,
      from: "Acme <onboarding@resend.dev>",
      to: "cleytonjrbg.dev@gmail.com",
      subject: "Pronto Consulta - Confirmação de Consulta",
      html: sendEmailHtml({
        date: emailBody.date,
        doctor: emailBody.doctor,
        room: emailBody.room,
        name: emailBody.name,
      }),
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
