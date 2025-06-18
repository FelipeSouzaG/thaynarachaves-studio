export default async function handler(request, response) {
  // Pega a data que foi enviada como parâmetro na URL (?data=...)
  const { data } = request.query;
  const API_URL = process.env.GOOGLE_API_URL; // Pega a variável de ambiente

  if (!data) {
    return response.status(400).json({ error: 'Data não fornecida.' });
  }

  try {
    const apiResponse = await fetch(`${API_URL}?data=${data}`);

    if (!apiResponse.ok) {
      throw new Error(`Erro na API do Google: ${apiResponse.statusText}`);
    }

    const horarios = await apiResponse.json();
    // Retorna os horários para o seu front-end
    return response.status(200).json(horarios);
  } catch (error) {
    console.error('Erro ao buscar horários:', error);
    return response
      .status(500)
      .json({ error: 'Erro ao conectar com o serviço de agendamento.' });
  }
}
