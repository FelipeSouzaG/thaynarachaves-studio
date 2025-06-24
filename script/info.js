import { closeModalRegister } from './modals.js';

export async function showModalInformation() {
  const modal = document.getElementById('modal-information');
  const title = document.getElementById('modal-information-title');
  const content = document.getElementById('modal-information-main');
  const btnClose = document.getElementById('close-information');
  const init = document.getElementById('init');

  title.textContent = 'Sobre';
  content.innerHTML = `
    <div class="contact-card">
      <p>
        A beleza sempre foi uma forma de expressão, e foi com esse propósito que iniciei minha jornada em 2022, com o antigo <span>Thay Ester Studio</span>.
        Com o passar dos anos, cresci, amadureci e entendi que era hora de evoluir, e assim nasceu o <span>Thaynara Chaves Studio</span>, em <span>2025</span>, carregando ainda mais identidade, propósito e amor pelo que faço.
        Aqui, mais do que <span>procedimentos</span>, ofereço <span>experiências únicas de cuidado, autoestima e transformação</span>. Sou especializada em <span>Extensão de Cílios e Design de Sobrancelhas</span> e acredito no poder dos detalhes para revelar o que há de mais belo em cada mulher.
        Com dedicação e aperfeiçoamento constante, o estúdio conquistou a confiança de suas clientes e expandiu sua atuação, passando a oferecer também <span>cursos de formação em Lash Design</span>, formando novas profissionais e incentivando o empreendedorismo feminino na área da beleza.
        <span>Fundado por Thaynara Chaves</span>, profissional apaixonada por realçar a beleza natural e transformar o cuidado em um momento de conexão, autoestima e leveza.
      </p>

      <h2>Missão</h2>
      <p>
        Proporcionar experiências únicas e transformadoras através de serviços especializados em cílios e sobrancelhas, promovendo a autoestima, o cuidado e a valorização da beleza individual.
      </p>
      
      <h2>Visão</h2>
      <p>
        Ser referência em extensão de cílios, design de sobrancelhas e formação profissional, reconhecida pela excelência no atendimento, qualidade dos serviços e impacto positivo na vida das clientes e alunas.
      </p>
      
      <h2>Valores</h2>
      <ul>
        <li><P><span>Respeito à individualidade</span></p></li>
        <li><P><span>Comprometimento com resultados</span></p></li>
        <li><P><span>Ética e transparência</span></p></li>
        <li><P><span>Atualização constante</span></p></li>
        <li><P><span>Amor pelo que faz</span></p></li>
      </ul>
      
      <img src="/img/thaystudio.svg" alt="Logo da Thaynara Chaves Studio">
    </div>
  `;

  modal.style.display = 'block';

  btnClose.onclick = function () {
    modal.style.display = 'none';
  };

  init.onclick = function () {
    content.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
}

export async function showModalContact() {
  const modal = document.getElementById('modal-information');
  const title = document.getElementById('modal-information-title');
  const content = document.getElementById('modal-information-main');
  const btnClose = document.getElementById('close-information');
  const init = document.getElementById('init');

  title.textContent = 'Contatos';
  content.innerHTML = `
    <div class="contact-card">
      <p>Tem alguma dúvida, deseja agendar um horário ou saber mais sobre os cursos? Fale com a gente!</p>

      <div class="contact-item">
        <h3>📱 WhatsApp</h3>
        <a href="https://wa.me/5531973082873?text=Olá%20Thaynara!%20Vi%20seu%20site%20e%20gostaria%20..." target="_blank">
          (31) 97308-2873
        </a>
        <span>Clique para conversar</span>
      </div>

      <div class="contact-item">
        <h3>📸 Instagram</h3>
        <a href="https://www.instagram.com/thaynarachavesstudio/" target="_blank">
          @thaynarachavesstudio
        </a>
        <span>Siga no Instagram</span>
      </div>

      <div class="contact-item">
        <h3>📍 Atendimento com horário marcado</h3>
        <span>Rua dos Atleticanos, 986 – Milionários, Belo Horizonte/MG</span>
      </div>
      
      <img src="/img/thaystudio.svg" alt="Logo da Thaynara Chaves Studio">             
    </div>
  `;

  modal.style.display = 'block';

  btnClose.onclick = function () {
    modal.style.display = 'none';
  };

  init.onclick = function () {
    content.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
}

export async function showModalTraining() {
  const modal = document.getElementById('modal-register');
  const title = document.getElementById('modal-register-title');
  const content = document.getElementById('modal-register-main');
  const btnClose = document.getElementById('close-register');
  const footer = document.getElementById('modal-register-footer');

  const imageSources = [
    '/img/curso-banner.svg',
    '/img/curso_lash_2.svg',
    '/img/curso_lash_3.svg',
    '/img/curso_lash_4.svg',
    '/img/curso_lash_5.svg',
    '/img/curso_lash_6.svg',
  ];

  function preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  }

  await Promise.all(imageSources.map(preloadImage));

  title.textContent = 'LASH DESING';
  content.innerHTML = `
      <div class="form-center">
        <div class="training-banner">
          ${imageSources
            .map(
              (src) =>
                `<img src="${src}" alt="Conteúdo de treinamento de Lash desing">`
            )
            .join('')}
        </div>
      </div>
    `;

  modal.style.display = 'block';

  btnClose.onclick = function () {
    modal.style.display = 'none';
  };

  footer.innerHTML = `
    <div class="modal-user-footer">
      <button id="appointmentWa" class="modal-content-btn-enable"> Agendar </button>
    </div>
  `;

  document
    .getElementById('appointmentWa')
    .addEventListener('click', function () {
      closeModalRegister();
      const whatsappUrl =
        'https://wa.me/5531973082873?text=Olá%20Thaynara!%20Gostaria%20de%20mais%20informações%20sobre%20o%20curso%20de%20Lash%20Desing';
      window.open(whatsappUrl, '_blank');
    });
}

async function showModalInfoCarousel(titleCarousel, imageSrc, imageAlt, text) {
  const modal = document.getElementById('modal-register');
  const title = document.getElementById('modal-register-title');
  const content = document.getElementById('modal-register-main');
  const btnClose = document.getElementById('close-register');
  const footer = document.getElementById('modal-register-footer');

  title.textContent = `${titleCarousel}`;
  content.innerHTML = `
      <div class="carousel-modal">
        <img src="${imageSrc}" alt="${imageAlt}">
        <label class="label">${text}</label>
      </div>
    `;

  modal.style.display = 'block';

  btnClose.onclick = function () {
    modal.style.display = 'none';
  };

  footer.innerHTML = `
    <div class="modal-user-footer">
      <button id="appointmentBtn" class="modal-content-btn-enable">Agendar</button>
    </div>
  `;

  document.getElementById('appointmentBtn').addEventListener('click', () => {
    closeModalRegister();
    const section = document.getElementById('contato');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

export async function setupCarouselModalListeners() {
  const slides = document.querySelectorAll('.car-slide');

  slides.forEach((slide) => {
    slide.addEventListener('click', async () => {
      const title = slide.querySelector('h4')?.textContent || '';
      const image = slide.querySelector('img');
      const text = slide.querySelector('h5')?.textContent || '';

      const imageSrc = image?.getAttribute('src') || '';
      const imageAlt = image?.getAttribute('alt') || '';

      await showModalInfoCarousel(title, imageSrc, imageAlt, text);
    });
  });
}
