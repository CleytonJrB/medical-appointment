export const confirmAppointmentHtml = ({ name, date, room, doctor }) => {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html dir="ltr" lang="en">
  <head>
    <link
      rel="preload"
      as="image"
      href="https://react-email-demo-8xz019qmh-resend.vercel.app/static/github.png"
    />
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <title>Sistema de Reserva de Horário para Consulta Médica</title>
    <!--$-->
  </head>
  <body
    style="
      background-color: #ffffff;
      color: #24292e;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica,
        Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
    "
  >
    <div
      style="
        display: none;
        overflow: hidden;
        line-height: 1px;
        opacity: 0;
        max-height: 0;
        max-width: 0;
      "
      data-skip-in-text="true"
    >
      Reserva de Horário para Consulta Médica
    </div>
    <table
      align="center"
      width="100%"
      border="0"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
      style="max-width: 480px; margin: 0 auto; padding: 20px 0 48px"
    >
      <tbody>
        <tr style="width: 100%">
          <td>
            <p
              style="
                font-size: 32px;
                line-height: 1.25;
                margin-top: 16px;
                margin-bottom: 26px;
              "
            >
              <strong>Pronto Consulta</strong>
            </p>

            <p
              style="
                font-size: 24px;
                line-height: 1.25;
                margin-top: 16px;
                margin-bottom: 16px;
              "
            >
              Olá <strong>${name}</strong>, novo agendamento confirmado pelo <strong> Dr.${doctor}</strong>
            </p>
            <table
              align="center"
              width="100%"
              border="0"
              cellpadding="0"
              cellspacing="0"
              role="presentation"
              style="
                padding: 24px;
                border: solid 1px #dedede;
                border-radius: 5px;
                text-align: center;
              "
            >
              <tbody>
                <tr>
                  <td>
                    <p
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 0 0 10px 0;
                        text-align: left;
                        margin-top: 0;
                        margin-right: 0;
                        margin-bottom: 10px;
                        margin-left: 0;
                      "
                    >
                      <strong>Data da Consulta</strong>
                    </p>
                    <p
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 0 0 10px 0;
                        text-align: left;
                        margin-top: 0;
                        margin-right: 0;
                        margin-bottom: 10px;
                        margin-left: 0;
                      "
                    >
                    ${date}
                    </p>

                    <p
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 0 0 10px 0;
                        text-align: left;
                        margin-top: 0;
                        margin-right: 0;
                        margin-bottom: 10px;
                        margin-left: 0;
                      "
                    >
                      <strong>Sala de Atendimento</strong>
                    </p>

                    <p
                      style="
                        font-size: 14px;
                        line-height: 24px;
                        margin: 0 0 10px 0;
                        text-align: left;
                        margin-top: 0;
                        margin-right: 0;
                        margin-bottom: 10px;
                        margin-left: 0;
                      "
                    >
                  ${room}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>

            <p
              style="
                font-size: 12px;
                line-height: 24px;
                color: #6a737d;
                text-align: center;
                margin-top: 60px;
                margin-bottom: 16px;
              "
            >
              Pronto Consulta ・Recife, PE ・2025
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <!--/$-->
  </body>
</html>
`;
};
