import { closeModal, closeModalRegister, showModalAlert } from './modals.js';
import {
  formatPhoneValue,
  setupValidation,
  validatePhone,
} from './validation.js';

export async function appointmentDay(dateSelected) {
  const container = document.getElementById('tableAppointmentDateMobile');
  container.innerHTML = '<p>Carregando...</p>';

  try {
    const response = await fetch(`${API_URL}?data=${dateSelected}`);
    const horarios = await response.json();

    if (!horarios.length) {
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

    horarios.forEach((horario) => {
      if (!horario.nome) {
        const btn = document.createElement('button');
        btn.textContent = horario.horario;
        btn.classList.add('appointment-button');
        btn.addEventListener('click', async () => {
          await appointmentTime(horario.horario, dateSelected);
        });
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
    container.innerHTML =
      '<p>Erro ao carregar horários. Tente novamente mais tarde.</p>';
  }
}

async function appointmentTime(horario, data) {
  const modal = document.getElementById('modal-register');
  const title = document.getElementById('modal-register-title');
  const content = document.getElementById('modal-register-main');
  const btnClose = document.getElementById('close-register');
  const footer = document.getElementById('modal-register-footer');

  title.textContent = 'Agendar Procedimento';

  content.innerHTML = `
    <div class="form-content">
      <div class="title-loss">
        <label class="label">Selecione o procedimento</label>
      </div>
      <div class="data-items">
        <label class="radio-option label">
          <input type="radio" class="radio" name="phase" value="Sobrancelhas">
          <span class="span">Sobrancelhas</span>
        </label>
        <label class="radio-option label">
          <input type="radio" class="radio" name="phase" value="Extensão de Cílios">
          <span class="span">Extensão de Cílios</span>
        </label>
      </div>

      <div class="form-group">
        <input class="form-group-input" type="text" id="name" placeholder="">
        <label class="form-group-label" for="name">Digite seu nome</label>
      </div>

      <div class="form-group">
        <input class="form-group-input" type="text" id="phone" required>
        <label class="form-group-label" for="">Telefone:</label>
        <i class="bi bi-phone toggle-icon-input"></i>
      </div>
    </div>
  `;

  footer.innerHTML = `
    <div class="modal-user-footer">
      <button id="submit" class="modal-content-btn-enable">Enviar</button>
    </div>
  `;

  btnClose.onclick = closeModalRegister;
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
      showModalAlert(
        'Alert',
        'Procedimento inválido!',
        'Por favor, selecione um procedimento.',
        closeModal
      );
      return;
    }

    if (!name) {
      showModalAlert(
        'Alert',
        'Nome Inválido',
        'Por favor, digite seu nome.',
        closeModal
      );
      return;
    }

    if (!validatePhone(phoneDigits)) {
      showModalAlert(
        'Alert',
        'Telefone Inválido',
        'Por favor, digite um telefone válido.',
        closeModal
      );
      return;
    }

    const payload = {
      data,
      horario,
      nome: name,
      telefone: formatPhoneValue(phoneDigits),
      procedimento: procedimento.value,
    };

    try {
      const res = await fetch('/api/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (!res.ok || result.status === 'error') {
        showModalAlert('Alert', 'Erro!', result.message, closeModal);
        return;
      }

      if (!result.telegramSent && result.fallbackWaLink) {
        window.open(result.fallbackWaLink, '_blank');
      }

      showModalAlert('Next', 'Agendado!', result.message, () => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro no agendamento:', error);
      showModalAlert('Alert', 'Erro de Conexão!', error.message, closeModal);
    }
  });
}
