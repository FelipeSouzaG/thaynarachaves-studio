export default async function handler(request, response) {
  // Configura CORS para produção
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

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

  if (request.method === 'OPTIONS') {
    return response.status(200).end();
  }

  if (request.method === 'GET') {
    try {
      const { searchParams } = new URL(request.url, `http://${request.headers.host}`);
      const dateParam = searchParams.get('data');
      
      if (!dateParam) {
        return response.status(400).json({
          status: 'error',
          message: 'Parâmetro de data é obrigatório',
        });
      }

      const urlToFetch = `${GOOGLE_SCRIPT_URL}?data=${encodeURIComponent(dateParam)}`;
      const googleResponse = await fetch(urlToFetch);
      
      if (!googleResponse.ok) {
        throw new Error('Falha na requisição para o Google Script');
      }

      const responseData = await googleResponse.json();
      return response.status(200).json(responseData);
    } catch (error) {
      console.error('Erro no proxy GET:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Falha ao buscar horários disponíveis',
      });
    }
  }

  if (request.method === 'POST') {
    try {
      let body;
      
      // Verifica o Content-Type para parsear corretamente
      const contentType = request.headers['content-type'];
      if (contentType === 'application/json') {
        body = request.body;
      } else {
        // Para compatibilidade com x-www-form-urlencoded
        const rawBody = await getRawBody(request);
        body = Object.fromEntries(new URLSearchParams(rawBody.toString()));
      }

      // Validação dos campos obrigatórios
      const requiredFields = ['nome', 'telefone', 'procedimento', 'data', 'horario'];
      const missingFields = requiredFields.filter(field => !body[field]);
      
      if (missingFields.length > 0) {
        return response.status(400).json({
          status: 'error',
          message: `Campos obrigatórios faltando: ${missingFields.join(', ')}`,
        });
      }

      // Envia para o Google Script
      const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(body).toString(),
      });

      const responseData = await googleResponse.json();

      if (!googleResponse.ok || responseData.status !== 'success') {
        return response.status(500).json(responseData);
      }

      // Notificação via Telegram
      let telegramSent = false;
      if (BOT_TOKEN && CHAT_ID) {
        try {
          const msg = `Novo agendamento:\nNome: ${body.nome}\nTelefone: ${body.telefone}\nProcedimento: ${body.procedimento}\nData: ${body.data}\nHora: ${body.horario}`;
          
          const telegramRes = await fetch(
            `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ chat_id: CHAT_ID, text: msg }),
            }
          );
          
          telegramSent = telegramRes.ok;
        } catch (err) {
          console.warn('Erro ao enviar Telegram:', err);
        }
      }

      // Fallback para WhatsApp
      const fallbackWaLink = !telegramSent && PHONE_ADMIN
        ? `https://wa.me/${PHONE_ADMIN}?text=${encodeURIComponent(msg)}`
        : null;

      return response.status(200).json({
        ...responseData,
        telegramSent,
        fallbackWaLink,
      });
    } catch (error) {
      console.error('Erro no proxy POST:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Falha ao processar agendamento',
      });
    }
  }

  return response.status(405).json({ message: 'Método não permitido' });
}

// Helper para ler o body raw
async function getRawBody(request) {
  return new Promise((resolve, reject) => {
    let data = [];
    request.on('data', chunk => data.push(chunk));
    request.on('end', () => resolve(Buffer.concat(data)));
    request.on('error', reject);
  });
}
