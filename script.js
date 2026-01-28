const telefoneMoras = "5519999112173"; 

//  FORÇAR TOPO AO RECARREGAR 
if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// === 2. FUNÇÃO ESPECÍFICA PARA O BOTÃO EXPLORAR (Correção do Bug) ===
function scrollToServices() {
  const servicosSection = document.getElementById('servicos');
  if (servicosSection) {
    const headerOffset = 80;
    const elementPosition = servicosSection.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }
}

// === NAVEGAÇÃO ENTRE TELAS ===
function showScreen(id) {
  const targetScreen = document.getElementById(id);
  
  // Se já estiver na tela, ignora
  if (targetScreen && targetScreen.classList.contains('active')) return;

  // Reseta telas
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  
  // Ativa tela alvo
  if (targetScreen) {
    setTimeout(() => {
        targetScreen.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  }

  // Menu Ativo
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  
  if (id === 'home') {
    const btn = document.querySelector('nav button[data-screen="home"]');
    if(btn) btn.classList.add('active');
  } else if (id === 'sobre') {
    const btn = document.querySelector('nav button[data-screen="sobre"]');
    if(btn) btn.classList.add('active');
  }
}

// === BOTÕES DO MENU 
document.querySelectorAll('[data-screen]').forEach(el => {
  el.addEventListener('click', (e) => {

    if (el.id === 'btnExplorar') return;

    e.preventDefault();
    const targetId = el.getAttribute('data-screen');
    showScreen(targetId);
  });
});

// === HEADER SCROLL ===
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
});

// === WHATSAPP ===
function enviarWhatsApp(msg) {
  const url = `https://wa.me/${telefoneMoras}?text=${encodeURIComponent(msg)}`;
  window.open(url, '_blank');
}

// === LÓGICA SITE SEMANAL ===
const planoSiteSelect = document.getElementById('planoSite');
const divSemanal = document.getElementById('descricao-semanal-container');

if (planoSiteSelect && divSemanal) {
  planoSiteSelect.addEventListener('change', function() {
    if (this.value === 'semanal') divSemanal.style.display = 'block';
    else divSemanal.style.display = 'none';
  });
}

// === FORMULÁRIOS ===
const formConserto = document.getElementById('formConserto');
if (formConserto) {
  formConserto.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeConserto').value;
    const modelo = document.getElementById('modeloConserto').value;
    const problema = document.getElementById('problemaConserto').value;
    enviarWhatsApp(`*SOLICITACAO DE CONSERTO*\n\nNome: ${nome}\nModelo: ${modelo}\nProblema: ${problema}`);
  });
}

const formVenda = document.getElementById('formVenda');
if (formVenda) {
  formVenda.addEventListener('submit', (e) => {
    e.preventDefault();
    const modelo = document.getElementById('modeloVenda').value;
    const valor = document.getElementById('valorVenda').value;
    const estado = document.getElementById('estadoVenda').value;
    enviarWhatsApp(`*QUERO VENDER MEU CELULAR*\n\nModelo: ${modelo}\nValor: R$ ${valor}\nEstado: ${estado}`);
  });
}

const formSite = document.getElementById('formSite');
if (formSite) {
  formSite.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeEmpresa').value;
    const tipo = document.getElementById('tipoSite').value;
    const plano = document.getElementById('planoSite').value;
    const detalhes = document.getElementById('detalhesSite').value;
    let msg = `*ORCAMENTO DE SITE*\n\nProjeto: ${nome}\nTipo: ${tipo}\nPlano: ${plano}\n`;
    if (plano === 'semanal') msg += `Detalhes Semanal: ${document.getElementById('descricaoSemanal').value}\n`;
    msg += `Outros: ${detalhes}`;
    enviarWhatsApp(msg);
  });
}

const formAnuncio = document.getElementById('formAnuncio');
if (formAnuncio) {
  formAnuncio.addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeAnuncio').value;
    const tipo = document.getElementById('tipoAnuncio').value;
    const plano = document.getElementById('planoAnuncio').value;
    const descricao = document.getElementById('descricaoAnuncio').value;
    enviarWhatsApp(`*CRIACAO DE ANUNCIO*\n\nCampanha: ${nome}\nFormato: ${tipo}\nPlano: ${plano}\nDescricao: ${descricao}`);
  });
}

// === INICIALIZAÇÃO ===
document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0,0);
  showScreen('home');
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 1000, easing: 'ease-out-quart', once: true });
  }
});
