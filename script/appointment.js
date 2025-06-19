import { closeModal, closeModalRegister, showModalAlert } from './modals.js';
import {
  formatPhoneValue,
  setupValidation,
  validatePhone,
} from './validation.js';

export async function appointmentDay(dateSelected) {
  const container = document.getElementById('tableAppointmentDateMobile');
  container.innerHTML = `
    <div class="loading-spinner">
      <div class="spinner"></div>
      <p>Buscando horários...</p>
    </div>
  `;

  try {
    const response = await fetch(`/api/get-horarios?data=${dateSelected}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const horarios = await response.json();

    if (horarios.length === 0) {
      container.innerHTML = '<label class="label">Nenhum horário disponível para esta data.</label>';
      return;
    }

    container.innerHTML = `
      <div class="form-center">
        <label class="label">Horários disponiveis</label>
        <div class="form-data-item" id="times"><div>
      </div>
    `;

    const times = document.getElementById('times');

    horarios.sort((a, b) => {
      const timeToMinutes = (time) => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };

      return timeToMinutes(a.horario) - timeToMinutes(b.horario);
    });

    horarios.forEach((horario) => {
      if (!horario.nome) {
        const btn = document.createElement('button');
        btn.textContent = horario.horario;
        btn.classList.add('appointment-button');
        btn.addEventListener(
          'click',
          async () => await appointmentTime(horario.horario, dateSelected)
        );
        times.appendChild(btn);
      } else {
        const ocupado = document.createElement('div');
        ocupado.textContent = `${horario.horario}`;
        ocupado.style.textDecoration = 'line-through';
        ocupado.style.opacity = '0.6';
        times.appendChild(ocupado);
      }
    });
  } catch (error) {
    container.innerHTML = `
      <div class="loading-spinner">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#dc3545">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Erro ao carregar! Tente novamente.</span>
      </div>
    `;
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
        <input
          class="form-group-input"
          type="text"
          id="name"
          placeholder=""
        >
        <label class="form-group-label" for="name">
          Digite seu nome
        </label>
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

  btnClose.onclick = function () {
    closeModalRegister();
  };

  modal.style.display = 'block';

  const phone = document.getElementById('phone');
  setupValidation(phone, validatePhone, formatPhoneValue);

  document.getElementById('submit').addEventListener('click', async () => {
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.replace(/\D/g, '');
    const procedimento = document.querySelector('input[name="phase"]:checked');

    if (!procedimento) {
      showModalAlert(
        'Alert',
        'Procedimento inválido!',
        'Por favor, selecione um procedimento.',
        closeModal
      );
      return;
    }

    if (!name || name === '') {
      showModalAlert(
        'Alert',
        'Nome Inválido',
        'Por favor, Digite seu nome',
        closeModal
      );
      return;
    }

    if (!validatePhone(phone) || phone === '' || !phone) {
      showModalAlert(
        'Alert',
        'Telefone Inválido',
        'Por favor, Digite seu telefone de contato',
        closeModal
      );
      return;
    }

    const appointmentDetails = {
      data: data,
      horario: horario,
      nome: name,
      telefone: formatPhoneValue(phone),
      procedimento: procedimento.value,
    };

    try {
      const res = await fetch('/api/submit-agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentDetails),
      });

      const appointmentData = await res.json();

      if (!res.ok || appointmentData.status === 'error') {
        showModalAlert('Alert', 'Erro!', appointmentData.message, closeModal);
        return;
      }

      if (appointmentData.whatsappLink) {
        window.open(appointmentData.whatsappLink, '_blank');
      }

      showModalAlert('Next', 'Agendado!', appointmentData.message, () => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Erro no agendamento:', error);
      showModalAlert('Alert', 'Erro de Conexão!', error.message, closeModal);
      return;
    }
  });
}
