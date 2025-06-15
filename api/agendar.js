export default async function handler(request, response) {
  const GOOGLE_SCRIPT_URL = process.env.API_URL;

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
      return response
        .status(500)
        .json({ status: 'error', message: 'Falha ao buscar dados.' });
    }
  } else if (request.method === 'POST') {
    try {
      const googleResponse = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.body),
      });

      const responseData = await googleResponse.json();

      return response.status(200).json(responseData);
    } catch (error) {
      console.error('Erro no proxy POST para o Google Script:', error);
      return response
        .status(500)
        .json({ status: 'error', message: 'Falha ao criar agendamento.' });
    }
  } else {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }
}
