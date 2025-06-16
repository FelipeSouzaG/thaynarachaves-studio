import {
  showModalCommerce,
  showModalTraining,
  showModalContact,
  showModalInformation,
} from './info.js';
import { closeModal, closeModalRegister, showModalAlert } from './modals.js';
import {
  formatPhoneValue,
  setupValidation,
  validateDate,
  validatePhone,
} from './validation.js';

function enableFullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.webkitRequestFullscreen) {
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) {
    document.documentElement.msRequestFullscreen();
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    enableFullScreen();

    document.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        enableFullScreen();
      }
    });
  }

  const hamburger = document.getElementById('hamburger');
  const menuTablet = document.getElementById('menu-tablet');
  const menu = document.getElementById('menu');
  const closeMenuBtn = document.querySelector('.close-menu-btn');
  const menuLinks = document.querySelectorAll('.menu-link');

  // Função para abrir o menu
  function openMenu() {
    menu.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menu.classList.remove('show');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  menuTablet.addEventListener('click', (e) => {
    e.stopPropagation();
    openMenu();
  });

  closeMenuBtn.addEventListener('click', closeMenu);

  menuLinks.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target)) {
      closeMenu();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('show')) {
      closeMenu();
    }
  });

  const markers = document.querySelectorAll('.section-marker');
  const main = document.querySelector('.main-mobile');
  const sections = document.querySelectorAll('.section');
  const scrollPrompt = document.querySelector('.scroll-prompt');

  function positionMarkers() {
    markers.forEach((marker, index) => {
      if (index < sections.length) {
        const section = sections[index];
        const position = (section.offsetTop / main.scrollHeight) * 100;
        marker.style.top = `${position}%`;
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target
            .querySelector('.section-content')
            .classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  function init() {
    positionMarkers();
    sections.forEach((section) => {
      observer.observe(section);
    });

    scrollPrompt.addEventListener('click', () => {
      main.scrollBy({
        top: window.innerHeight * 0.8,
        behavior: 'smooth',
      });
    });

    window.addEventListener('resize', positionMarkers);
  }

  let isScrolling;
  main.addEventListener(
    'scroll',
    () => {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(70);
    },
    false
  );

  init();

  document.getElementById('about-us').addEventListener('click', async () => {
    await showModalInformation();
  });

  document.getElementById('contact').addEventListener('click', async () => {
    await showModalContact();
  });

  document
    .getElementById('commerce-menu')
    .addEventListener('click', async () => {
      await showModalCommerce();
    });

  document
    .getElementById('trainingBtn-mobile')
    .addEventListener('click', async () => {
      await showModalTraining();
    });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.scheduling button')) {
      const section = document.getElementById('contato');
      section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });

  const el = document.getElementById('dateMobile');
  const formattedToday = validateDate(el);
  el.value = formattedToday;

  el.addEventListener('change', async () => {
    await appointmentDay(el.value);
  });

  await appointmentDay(el.value);

  const API_URL =
    'https://script.google.com/macros/s/AKfycbyM1ENCcLNO9etUxL_Qrjh8OcdUfQTjnlBxrtSEgYbQfjxsSMVV71i_QirsQObqXaEL-Q/exec';

  async function appointmentDay(dateSelected) {
    const container = document.getElementById('tableAppointmentDateMobile');
    container.innerHTML = '<p>Carregando...</p>';

    try {
      const response = await fetch(`${API_URL}?data=${dateSelected}`);

      const horarios = await response.json();

      if (horarios.length === 0) {
        container.innerHTML = '';
        container.innerHTML =
          '<p>Nenhum horário disponível para esta data.</p>';
        return;
      }

      container.innerHTML = `
        <div class="form-center">
          <label class="label">Horários disponiveis</label>
            <div class="form-data-item" id="times"><div>
        </div>
      `;

      const times = document.getElementById('times');

      horarios.forEach((horario) => {
        if (!horario.nome) {
          const btn = document.createElement('button');
          btn.textContent = horario.horario;
          btn.classList.add('appointment-button');
          btn.addEventListener('click', () =>
            agendarHorario(horario.horario, dateSelected)
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
      console.error('Erro ao buscar horários:', error);
      container.innerHTML =
        '<p>Erro ao carregar horários. Tente novamente mais tarde.</p>';
    }
  }

  async function agendarHorario(horario, data) {
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

      const dataScheduling = {
        data: data,
        horario: horario,
        nome: name,
        telefone: phone,
      };

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataScheduling),
        });

        const data = await res.json();

        if (data.status === 'success') {
          showModalAlert('Next', 'Agendado!', data.message, () => {
            window.location.reload();
          });
        } else if (data.error === 'error') {
          showModalAlert('Alert', 'Erro!', data.message, closeModal);
        } else {
          showModalAlert('Alert', 'Erro!', data.message, closeModal);
        }
      } catch (error) {
        console.error('Erro no agendamento:', error);
        showModalAlert('Alert', 'Erro de Conexão!', error.message, closeModal);
        return;
      }
    });
  }
});
