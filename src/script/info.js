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

export async function showModalTraining() {
  const modal = document.getElementById('modal-information');
  const title = document.getElementById('modal-information-title');
  const content = document.getElementById('modal-information-main');
  const btnClose = document.getElementById('close-information');
  const init = document.getElementById('init');

  title.textContent = 'LASH DESING';
  content.innerHTML = `
    <div class="form-center">
      <div class="training-banner">
        <img src="./src/img/curso-banner.svg" alt="Capa do conteudo de treinamento de Lash desing"> 
        <img src="./src/img/curso_lash_2.svg" alt="Página 1 do conteudo de treinamento de Lash desing">
        <img src="./src/img/curso_lash_3.svg" alt="Página 2 do conteudo de treinamento de Lash desing">
        <img src="./src/img/curso_lash_4.svg" alt="Página 3 do conteudo de treinamento de Lash desing">
        <img src="./src/img/curso_lash_5.svg" alt="Página 4 do conteudo de treinamento de Lash desing">
        <img src="./src/img/curso_lash_6.svg" alt="Página 5 do conteudo de treinamento de Lash desing">
      </div>
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
