import { formGroupEye, formGroupEyeSlash, formGroupMail } from './icons.js';
import { closeModal, closeModalRegister, showModalAlert } from './modals.js';
import { validateEmail, validatePassword } from './validation.js';

export async function showModalInformation() {
  const modal = document.getElementById('modal-information');
  const title = document.getElementById('modal-information-title');
  const content = document.getElementById('modal-information-main');
  const btnClose = document.getElementById('close-information');
  const init = document.getElementById('init');

  title.textContent = 'Sobre Nós';
  content.innerHTML = `
    <div class="contact-card">
      <p>Na <span>FluxoClean</span>, acreditamos que <span>indústrias de pequeno e médio porte, prestadores de serviços e beneficiadoras</span> que não tem Engenharia de Processo ou Analistas de Melhoria Contínua em seu time de trabalho merecem operar com a eficiência das grandes empresas, mas sem a complexidade e os custos elevados.</p>
      
      <h2>Nossos principais serviços incluem:</h2>
      <ul>
        <li><P>Análise de processos utilizando Kaizen, PDCA, FMEA e WCM</p></li>
        <li><P>Implantação de melhoria contínua e padronização com redução de custos</p></li>
        <li><P>Digitalização de processos por meio de aplicativos personalizados</p></li>
        <li><P>Treinamentos operacionais e gerenciais voltados à eficiência e padronização</p></li>
        <li><P>Desenvolvimento de software personalizado para prestadores de serviços</p></li>
      </ul>

      <h2>Missão</h2>
      <p>Aumentar o <span>lucro líquido entregando performance, padronização e controle das operações e serviços</span> de nossos parceiros.</p>
      
      <h2>Visão</h2>
      <p>Ser referência em <span>soluções acessíveis e personalizadas na melhoria de processos e digitalização de pequenas e médias empresas</span> na região de Belo Horizonte.</p>
      
      <h2>Valores</h2>
      <ul>
        <li><P><span>Verdade, Integridade, Honestidade, Ética e Transparência</span></p></li>
        <li><P><span>Construção de valor em processos e serviços</span></p></li>
        <li><P><span>Inovar, padronizar e digitalizar</span></p></li>
      </ul>
      
      <h2>Atendemos especialmente</h2>
      <ul>
        <li><P>Pequenas e médias indústrias</p></li>
        <li><P>Beneficiadoras de alimentos</p></li>
        <li><P>Oficinas e prestadores de serviços</p></li>
        <li><P>Empresas que não tem Engenharia / Analista de Processos</p></li>
      </ul>

      <h2>O que fazemos</h2>
      <p>Identificar e <span>eliminar ou mitigar</span> perdas que consomem até <span>20% do faturamento</span>, utilizando metodologias reconhecidas de classe mundial como:</p>
      <ul>
        <li><P><span>KAIZEN</span> (melhoria contínua)</p></li>
        <li><P><span>PDCA</span> (ciclo de otimização)</p></li>
        <li><P><span>WCM</span> (excêlencia em manufatura)</p></li>
        <li><P><span>FMEA</span> (análise de falhas e efeito)</p></li>
      </ul>
      <h2>Atuação</h2>
      <P><span>Belo Horizonte/MG e região</span> (com possibilidade de atuação em todo o estado)</p>
      <P>Acesse nossos canais de comunicação e solicite uma <span>avaliação</span>.</p>
        <img src="./src/img/logo-header.svg" alt="Logo da FluxoClean">            
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
      
      <h2>Instituicional</h2>
      <div class="contact-item">
        <a href="mailto:contato@fluxoclean.com.br?subject=Resumo%20do%20processo%20e%20principais%20perdas&body=Olá,%20meu%20nome%20é%20...%20Gostaria%20de%20compartilhar%20um%20resumo%20do%20meu%20processo%20de%20...%20e%20as%20etapas%20onde%20acredito%20que%20ocorrem%20as%20maiores%20perdas.%20Segue%20abaixo:%0A%0A- Resumo%20do%20processo:%20...%0A- Etapa%201:%0A- Etapa%202:%0A- Etapa%203:%0A%0A- Principais%20perdas%20identificadas:%20...%0A%0AAguardo%20seu%20retorno%20para%20avançarmos%20na%20melhoria%20do%20meu%20processo." 
           onclick="return gtag_report_conversion('mailto:contato@fluxoclean.com.br')" 
           target="_blank">
          contato@fluxoclean.com.br
        </a>
        <span>— Dúvidas e esclarecimentos</span>
      </div>

      <h2>Analista Técnico</h2>
      <div class="contact-item">
        <a href="mailto:felipe.galvao@fluxoclean.com.br" target="_blank">
          felipe.galvao@fluxoclean.com.br
        </a>
        <span>— Felipe Galvão</span>
      </div>
      <div class="contact-item">
        <a href="https://wa.me/5531983330332?text=Olá%20FluxoClean!%20Vi%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20diagnóstico%20ou%20conversar%20sobre%20meu%20processo." 
           onclick="return gtag_report_conversion('https://wa.me/5531983330332?text=Olá%20FluxoClean!%20Vi%20seu%20site%20e%20gostaria%20de%20solicitar%20um%20diagnóstico%20ou%20conversar%20sobre%20meu%20processo.')" 
           target="_blank">
          (31)99545-4632
        </a>
        <span>— WhatsApp</span>
      </div>
      <h2>Atuação</h2>
      <div class="contact-item">
        <a href="#">
          Belo Horizonte e Região
        </a>
        <span>— Possibilidade em todo estado de MG</span>
      </div>
      <img src="./src/img/logo-header.svg" alt="Logo da FluxoClean">             
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

export async function showModalLogin() {
  const modal = document.getElementById('modal-register');
  const title = document.getElementById('modal-register-title');
  const content = document.getElementById('modal-register-main');
  const btnClose = document.getElementById('close-register');
  const footer = document.getElementById('modal-register-footer');

  title.textContent = 'Iniciar Sessão';
  content.innerHTML = `
    <form id="formLogin" class="form">  
      <div class="form-group">
        <input class="form-group-input" type="text" id="email" name="email" autocomplete="username" required>
        <label class="form-group-label" for="">E-mail:</label>
        ${formGroupMail}
      </div>
      <div class="form-group">
        <input class="form-group-input" type="password" id="password" class="icon-input"  name="password" autocomplete="current-password" required>
        <label class="form-group-label" for="">Senha:</label>
        <button type="button" id="togglePassword">
          ${formGroupEye}
        </button>
      </div>
    </form>
  `;

  footer.innerHTML = `
    <div class="modal-user-footer">
      <button id="submit" class="modal-content-btn-enable">Entrar</button>
    </div>
  `;

  btnClose.onclick = function () {
    closeModalRegister();
  };

  modal.style.display = 'block';

  const passwordInput = document.getElementById('password');
  const togglePasswordButton = document.getElementById('togglePassword');

  togglePasswordButton.addEventListener('click', () => {
    const type =
      passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    togglePasswordButton.innerHTML =
      type === 'password' ? formGroupEye : formGroupEyeSlash;
  });

  document.getElementById('submit').addEventListener('click', async () => {
    const dataLogin = {};

    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    if (email === '') {
      showModalAlert('Alert', 'E-mail!!', 'Digite seu e-mail', closeModal);
      return;
    }

    if (password === '') {
      showModalAlert('Alert', 'Senha!!', 'Digite a senha', closeModal);
      return;
    }

    if (!validateEmail(email) || !validatePassword(password)) {
      showModalAlert(
        'Alert',
        'Login Inválido',
        'E-mail ou Senha inválido!',
        closeModal
      );
      return;
    }

    dataLogin.email = email;
    dataLogin.password = password;

    try {
      const userData = await userLogin(dataLogin);
      if (userData.redirectUrl) {
        window.location.href = userData.redirectUrl;
      } else if (userData.status === 201) {
        const level = userData.level;
        showModalAlert('Next', userData.title, userData.msg, async () => {
          await openSession(level);
          window.location.href = './client.html';
        });
      } else if (userData.status === 400 || userData.status === 401) {
        showModalAlert('Alert', userData.title, userData.msg, closeModal);
        return;
      }
    } catch (error) {
      showModalAlert('Alert', 'Erro de Conexão!', error, closeModal);
      return;
    }
  });
}

export function ErrorBase(
  msg = 'Falha na conexão com servidor. Verifique a internet ou tente novamente.'
) {
  const error = new Error(msg);
  return error;
}

const userLogin = async (dataUser) => {
  try {
    const response = await fetch(`https://localhost:3000/api/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(dataUser),
    });
    const dataLogin = await response.json();
    return dataLogin;
  } catch (error) {
    throw ErrorBase();
  }
};

export async function showModalCommerce() {
  const modal = document.getElementById('modal-information');
  const title = document.getElementById('modal-information-title');
  const content = document.getElementById('modal-information-main');
  const btnClose = document.getElementById('close-information');
  const init = document.getElementById('init');

  title.textContent = 'Proposta de Serviços';
  content.innerHTML = `
    <div class="contact-card">
      
      <h2>1- Diagnose</h2>
      <P><span>✔</span> Visita técnica ou análise remota</p>
      <P><span>✔</span> Mapa de problemas identificados</p>
      <P><span>✔</span> Plano de ação simplificado</p>
      <p><span>Avaliação Pontual</span></p>

      <h2>2- Melhoria Contínua</h2>
      <P><span>✔</span> Mapeamento completo do processo</p>
      <P><span>✔</span> Construção de FMEA e Plano de Controle</p>
      <P><span>✔</span> Plano de Melhoria Contínua</p>
      <P><span>✔</span> Treinamento do time responsável</p>
      <P><span>✔</span> Implantação do WCM junto ao time</p>
      <P><span>Visitas mensais do analista</span></p>

      <h2>3- Melhoria Contínua + Controle de dados</h2>
      <P><span>✔</span> Mapeamento completo do processo</p>
      <P><span>✔</span> Construção de FMEA e Plano de Controle</p>
      <P><span>✔</span> Plano de Melhoria Contínua</p>
      <P><span>✔</span> Treinamento do time responsável</p>
      <P><span>✔</span> Implantação do WCM junto ao time</p>
      <P><span>✔</span> Controles de dados + Gráficos de performance</p>
      <P><span>Visitas quinzenais do analista</span></p>

      <i>Valores dos serviços serão passados após análise do processo</i>
      
      <img src="./src/img/logo-header.svg" alt="Logo da FluxoClean">             
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
