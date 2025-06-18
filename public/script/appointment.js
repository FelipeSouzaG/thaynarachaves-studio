import { closeModal, closeModalRegister, showModalAlert } from './modals.js';
import {
  formatPhoneValue,
  setupValidation,
  validatePhone,
} from './validation.js';

const API_URL = '/api/agendar';

export async function appointmentDay(dateSelected) {
  const container = document.getElementById('tableAppointmentDateMobile');
  container.innerHTML = '<p>Carregando...</p>';

  try {
    // Codifica a data para URL
    const encodedDate = encodeURIComponent(dateSelected);
    const response = await fetch(`${API_URL}?data=${encodedDate}`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const horarios = await response.json();

    if (!horarios || !Array.isArray(horarios) || horarios.length === 0) {
      container.innerHTML = '<p>Nenhum horário disponível para esta data.</p>';
      return;
    }

    container.innerHTML = `
      <div class="form-center">
        <label class="label">Horários disponíveis</label>
        <div class="form-data-item" id="times"></div>
      </div>
    `;

    const times = document.getElementById('times');
    times.innerHTML = ''; // Limpa conteúdo anterior

    horarios.forEach((horario) => {
      if (!horario.nome) {
        const btn = document.createElement('button');
        btn.textContent = horario.horario;
        btn.classList.add('appointment-button');
        btn.addEventListener('click', () => appointmentTime(horario.horario, dateSelected));
        times.appendChild(btn);
      } else {
        const ocupado = document.createElement('div');
        ocupado.textContent = horario.horario;
        ocupado.style.textDecoration = 'line-through';
        ocupado.style.opacity = '0.6';
        times.appendChild(ocupado);
      }
    });
  } catch (error) {
    console.error('Erro ao buscar horários:', error);
    container.innerHTML = `
      <p>Erro ao carregar horários.</p>
      <button onclick="location.reload()" class="retry-button">Tentar novamente</button>
    `;
  }
}

async function appointmentTime(horario, data) {
  const modal = document.getElementById('modal-register');
  const title = document.getElementById('modal-register-title');
  const content = document.getElementById('modal-register-main');
  const footer = document.getElementById('modal-register-footer');

  title.textContent = 'Agendar Procedimento';
  
  content.innerHTML = `
    <div class="form-content">
      <div class="title-loss">
        <label class="label">Selecione o procedimento</label>
      </div>
      <div class="data-items">
        <label class="radio-option label">
          <input type="radio" class="radio" name="phase" value="Sobrancelhas" required>
          <span class="span">Sobrancelhas</span>
        </label>
        <label class="radio-option label">
          <input type="radio" class="radio" name="phase" value="Extensão de Cílios" required>
          <span class="span">Extensão de Cílios</span>
        </label>
      </div>

      <div class="form-group">
        <input class="form-group-input" type="text" id="name" placeholder="" required>
        <label class="form-group-label" for="name">Digite seu nome</label>
      </div>

      <div class="form-group">
        <input class="form-group-input" type="text" id="phone" required>
        <label class="form-group-label" for="phone">Telefone:</label>
        <i class="bi bi-phone toggle-icon-input"></i>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <div class="modal-user-footer">
      <button id="submit" class="modal-content-btn-enable">Enviar</button>
    </div>
  `;

  document.getElementById('close-register').onclick = closeModalRegister;
  modal.style.display = 'block';

  const phone = document.getElementById('phone');
  setupValidation(phone, validatePhone, formatPhoneValue);

  document.getElementById('submit').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const rawPhone = document.getElementById('phone').value;
    const phoneDigits = rawPhone.replace(/\D/g, '');
    const procedimento = document.querySelector('input[name="phase"]:checked');

    // Validações
    if (!procedimento) {
      showModalAlert('Atenção', 'Por favor, selecione um procedimento.', closeModal);
      return;
    }

    if (!name) {
      showModalAlert('Atenção', 'Por favor, digite seu nome completo.', closeModal);
      return;
    }

    if (!validatePhone(phoneDigits)) {
      showModalAlert('Atenção', 'Por favor, digite um telefone válido com DDD.', closeModal);
      return;
    }

    try {
      const payload = {
        data,
        horario,
        nome: name,
        telefone: formatPhoneValue(phoneDigits),
        procedimento: procedimento.value,
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || 'Erro ao processar agendamento');
      }

      // Feedback para o usuário
      showModalAlert('Sucesso!', 'Agendamento realizado com sucesso!', () => {
        if (result.fallbackWaLink && !result.telegramSent) {
          window.open(result.fallbackWaLink, '_blank');
        }
        window.location.reload();
      });

    } catch (error) {
      console.error('Erro no agendamento:', error);
      showModalAlert('Erro', error.message || 'Falha ao agendar. Tente novamente.', closeModal);
    }
  });
}
