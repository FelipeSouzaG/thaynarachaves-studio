export default async function handler(request, response) {
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Método não permitido' });
  }

  // Pega as variáveis de ambiente seguras
  const GOOGLE_API_URL = process.env.GOOGLE_API_URL;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
  const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
  const PHONE_ADMIN = process.env.ADMIN_PHONE;

  // Pega os dados enviados pelo front-end
  const { data, horario, nome, telefone, procedimento } = request.body;

  // 1. Enviar para a Planilha Google
  const formData = new URLSearchParams();
  formData.append('data', data);
  formData.append('horario', horario);
  formData.append('nome', nome);
  formData.append('telefone', telefone);
  formData.append('procedimento', procedimento);

  try {
    const googleRes = await fetch(GOOGLE_API_URL, {
      method: 'POST',
      body: formData,
    });
    const appointmentData = await googleRes.json();

    if (!googleRes.ok || appointmentData.status === 'error') {
      // Se der erro no Google, já para por aqui
      return response.status(400).json(appointmentData);
    }

    // 2. Enviar notificação para o Telegram
    const notificationMsg = `Novo agendamento:\nNome: ${nome}\nTelefone: ${telefone}\nProcedimento: ${procedimento}\nData: ${data}\nHora: ${horario}`;

    try {
      await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: notificationMsg,
        }),
      });
    } catch (telegramError) {
      console.warn(
        'Erro ao enviar para Telegram, gerando link do WhatsApp:',
        telegramError
      );
      const msgWa = `Olá! Acabei de fazer um agendamento\nSegue os dados:\n${notificationMsg}`;
      const encodedMsg = encodeURIComponent(msgWa);
      // Adiciona o link do WhatsApp na resposta de sucesso
      appointmentData.whatsappLink = `https://wa.me/${PHONE_ADMIN}?text=${encodedMsg}`;
    }

    // Retorna a resposta de sucesso para o front-end
    return response.status(200).json(appointmentData);
  } catch (error) {
    console.error('Erro no agendamento:', error);
    return response
      .status(500)
      .json({ status: 'error', message: 'Erro de conexão no servidor.' });
  }
}
