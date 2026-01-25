// SEU NÚMERO ATUALIZADO (55 + 19 + Numero)
const telefoneMoras = "5519999112173"; 



// --- NAVEGAÇÃO ---
function navegarPara(idTela) {
    // 1. Esconde todas as telas
    const telas = document.querySelectorAll('.screen');
    telas.forEach(tela => {
        tela.classList.remove('active');
        setTimeout(() => {
            if(!tela.classList.contains('active')) tela.classList.add('hidden');
        }, 300); // Tempo da transição
    });

    // 2. Mostra a tela desejada
    const telaAtiva = document.getElementById(idTela);
    telaAtiva.classList.remove('hidden');
    // Força layout refresh
    void telaAtiva.offsetWidth; 
    telaAtiva.classList.add('active');

    // 3. Atualiza o Menu Superior (Botões Ativos)
    atualizarMenuTopo(idTela);
}

function atualizarMenuTopo(idTela) {
    const btnInicio = document.getElementById('btn-inicio');
    const btnSobre = document.getElementById('btn-sobre');

    // Remove classe active de ambos
    btnInicio.classList.remove('active');
    btnSobre.classList.remove('active');

    // Se for tela "Sobre", ativa o botão Sobre
    if (idTela === 'tela-sobre') {
        btnSobre.classList.add('active');
    } else {
        // Qualquer outra tela (Menu, Conserto, etc) ativa o "Início"
        btnInicio.classList.add('active');
    }
}

// Função para enviar zap sem emojis
function enviarWhatsApp(texto) {
    const url = `https://wa.me/${telefoneMoras}?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
}

// --- LISTENERS DOS FORMULÁRIOS ---
// Conserto
document.getElementById('formConserto').addEventListener('submit', (e) => {
    e.preventDefault();
    const nome = document.getElementById('nomeConserto').value;
    const modelo = document.getElementById('modeloConserto').value;
    const problema = document.getElementById('problemaConserto').value;
    enviarWhatsApp(`*SOLICITACAO DE CONSERTO*\n\n*Cliente:* ${nome}\n*Modelo:* ${modelo}\n*Problema:* ${problema}`);
});

// Venda
document.getElementById('formVenda').addEventListener('submit', (e) => {
    e.preventDefault();
    const modelo = document.getElementById('modeloVenda').value;
    const valor = document.getElementById('valorVenda').value;
    const estado = document.getElementById('estadoVenda').value;
    enviarWhatsApp(`*QUERO VENDER MEU CELULAR*\n\n*Modelo:* ${modelo}\n*Valor:* R$ ${valor}\n*Estado:* ${estado}`);
});

// Sites
document.getElementById('formSite').addEventListener('submit', (e) => {
    e.preventDefault();
    const empresa = document.getElementById('nomeEmpresa').value;
    const tipo = document.getElementById('tipoSite').value;
    const detalhes = document.getElementById('detalhesSite').value;
    enviarWhatsApp(`*ORCAMENTO DE SITE*\n\n*Projeto:* ${empresa}\n*Tipo:* ${tipo}\n*Detalhes:* ${detalhes}`);
});