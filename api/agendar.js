export default async function handler(request, response) {
  // 1. Garantir que a requisição seja um POST
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  // 2. Pegar a URL secreta das Variáveis de Ambiente da Vercel
  const GOOGLE_SCRIPT_URL = process.env.API_URL;

  if (!GOOGLE_SCRIPT_URL) {
    return response
      .status(500)
      .json({
        status: 'error',
        message: 'API URL não configurada no servidor.',
      });
  }

  try {
    // 3. Encaminhar a requisição para o Google Apps Script
    const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // request.body já vem como um objeto JSON pela Vercel
      body: JSON.stringify(request.body),
    });

    // 4. Pegar a resposta do Google
    const responseData = await googleResponse.json();

    // 5. Encaminhar a resposta do Google de volta para o seu frontend
    // Usamos o status da resposta do Google, se disponível, ou 200 por padrão.
    response.status(googleResponse.status).json(responseData);
  } catch (error) {
    console.error('Erro no proxy para o Google Script:', error);
    response
      .status(500)
      .json({
        status: 'error',
        message: 'Falha ao se comunicar com o serviço de agendamento.',
      });
  }
}
