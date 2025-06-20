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
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="toggle-icon-input" viewBox="0 0 16 16">
          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
        </svg>
      </div>
      <div class="form-group">
        <input class="form-group-input" type="tel" id="phone" required>
        <label class="form-group-label" for="">Telefone:</label>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="toggle-icon-input" viewBox="0 0 16 16">
          <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
        </svg>
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

    footer.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
      </div>
    `;

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
        footer.innerHTML = `
          <div class="modal-user-footer">
            <button id="submit" class="modal-content-btn-enable">Enviar</button>
          </div>
        `;
        showModalAlert('Alert', 'Erro!', appointmentData.message, closeModal);
        return;
      }

       footer.innerHTML = `
          <div class="modal-user-footer"></div>
        `;

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
