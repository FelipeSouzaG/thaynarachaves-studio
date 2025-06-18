export default async function handler(request, response) {
  const GOOGLE_SCRIPT_URL = process.env.API_URL;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const PHONE_ADMIN = process.env.ADMIN_PHONE_WA;

  if (!GOOGLE_SCRIPT_URL) {
    return response.status(500).json({
      status: 'error',
      message: 'API URL não configurada no servidor.',
    });
  }

  if (request.method === 'GET') {
    try {
      const { search } = new URL(request.url, `http://${request.headers.host}`);
      const urlToFetch = GOOGLE_SCRIPT_URL + search;

      const googleResponse = await fetch(urlToFetch);
      const responseData = await googleResponse.json();

      return response.status(200).json(responseData);
    } catch (error) {
      console.error('Erro no proxy GET para o Google Script:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Falha ao buscar dados.',
      });
    }
  }

  if (request.method === 'POST') {
    try {
      const body = request.body;

      const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(body).toString(),
      });

      const responseData = await googleResponse.json();

      if (!googleResponse.ok || responseData.status !== 'success') {
        return response.status(500).json(responseData);
      }

      const { nome, telefone, procedimento, data, horario } = body;
      const msg = `Novo agendamento:\nNome: ${nome}\nTelefone: ${telefone}\nProcedimento: ${procedimento}\nData: ${data}\nHora: ${horario}`;

      let telegramSent = false;
      try {
        if (BOT_TOKEN && CHAT_ID) {
          const telegramRes = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
            }
          );

          const telegramData = await telegramRes.json();
          telegramSent = telegramRes.ok && telegramData.ok === true;
        }
      } catch (err) {
        console.warn('Erro ao enviar Telegram:', err);
      }

      const fallbackWaLink =
        !telegramSent && PHONE_ADMIN
          ? `https://wa.me/${PHONE_ADMIN}?text=${encodeURIComponent(msg)}`
          : null;

      return response.status(200).json({
        ...responseData,
        telegramSent,
        fallbackWaLink,
      });
    } catch (error) {
      console.error('Erro no proxy POST para o Google Script:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Falha ao criar agendamento.',
      });
    }
  }

  return response.status(405).json({ message: 'Method Not Allowed' });
}
