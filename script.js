// ============================================================
//  LUIZA MICHIELIN — PORTFOLIO SCRIPT
// ============================================================

// ============================================================
//  FOTO DE FUNDO DO HERO (BANNER PRINCIPAL)
//  Cole o caminho da sua foto aqui:
//  Exemplo: './fotos/banner.jpg'
//  Deixe null para usar o fundo escuro.
// ============================================================
const HERO_BG_IMAGE = null; // <- coloque o caminho aqui: './fotos/banner.jpg'

// ============================================================
//  FOTO DA SEÇÃO "SOBRE"
//  Cole o caminho da sua foto aqui:
//  Exemplo: './fotos/perfil.jpg'
//  Deixe null para mostrar o espaço vazio.
// ============================================================
const ABOUT_IMAGE = null; // <- coloque o caminho aqui: './fotos/perfil.jpg'

// ============================================================
//  CARDS DO PORTFÓLIO
//
//  Para cada card, preencha:
//    title:    nome do projeto
//    category: 'figurinos' | 'projetos' | 'pecas' | 'croche'
//    image:    caminho da foto, ex: './fotos/fantasia1.jpg'
//              Deixe null para mostrar o espaço reservado.
//
//  Para ADICIONAR um novo card, copie um bloco { } e cole
//  logo abaixo, separado por vírgula.
// ============================================================
const cards = [

  // --- CARD 1 ---
  {
    title: 'Fantasia da Jasmine',
    category: 'figurinos',
    image: null  // <- './fotos/jasmine.jpg'
  },

  // --- CARD 2 ---
  {
    title: 'Fantasia da Bia',
    category: 'figurinos',
    image: null  // <- './fotos/bia.jpg'
  },

  // --- CARD 3 ---
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: null  // <- './fotos/teatro.jpg'
  },

  // --- CARD 4 ---
  {
    title: 'Projeto Crochê',
    category: 'croche',
    image: null  // <- './fotos/croche.jpg'
  },

  // --- CARD 5 ---
  {
    title: 'Peça Autoral',
    category: 'pecas',
    image: null  // <- './fotos/peca1.jpg'
  },

  // --- CARD 6 ---
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: null  // <- './fotos/projeto1.jpg'
  },

  // Adicione mais cards aqui seguindo o mesmo formato:
  // {
  //   title: 'Nome do Projeto',
  //   category: 'figurinos',
  //   image: './fotos/nome-do-arquivo.jpg'
  // },

];

// ============================================================
//  NÃO PRECISA MEXER ABAIXO DESTA LINHA
// ============================================================

let currentTab = 'todos';

function catLabel(cat) {
  const map = {
    figurinos: 'Figurinos',
    croche: 'Crochê',
    projetos: 'Projetos',
    pecas: 'Peças Autorais'
  };
  return map[cat] || cat;
}

function renderGrid() {
  const grid = document.getElementById('photoGrid');
  const filtered = currentTab === 'todos'
    ? cards
    : cards.filter(c => c.category === currentTab);

  grid.innerHTML = '';

  filtered.forEach((card, index) => {
    const div = document.createElement('div');
    div.className = 'photo-card';

    if (card.image) {
      div.innerHTML = `
        <img src="${card.image}" alt="${card.title}">
        <div class="photo-card-info">
          <div class="photo-card-title">${card.title}</div>
          <div class="photo-card-cat">${catLabel(card.category)}</div>
        </div>
      `;
    } else {
      div.innerHTML = `
        <div class="card-placeholder">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2"/>
            <path d="M3 16l5-5 4 4 3-3 6 6"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
          </svg>
          <span>${card.title}</span>
          <span style="font-size:0.6rem;opacity:0.4;text-align:center">Adicione a foto no script.js</span>
        </div>
      `;
    }

    grid.appendChild(div);
  });
}

function filterTab(tab, btn) {
  currentTab = tab;
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderGrid();
}

// ============================================================
//  INICIALIZAÇÃO
// ============================================================
function init() {
  // Hero background
  const heroBg = document.getElementById('heroBgPhoto');
  if (HERO_BG_IMAGE && heroBg) {
    heroBg.style.backgroundImage = `url('${HERO_BG_IMAGE}')`;
    heroBg.classList.add('has-photo');
  }

  // About photo
  const aboutImg = document.getElementById('aboutImg');
  const aboutPlaceholder = document.getElementById('aboutPlaceholder');
  if (ABOUT_IMAGE && aboutImg) {
    aboutImg.src = ABOUT_IMAGE;
    aboutImg.style.display = 'block';
    if (aboutPlaceholder) aboutPlaceholder.style.display = 'none';
  }

  // Grid
  renderGrid();

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Menu mobile
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// Enviar mensagem via WhatsApp
function enviarWhatsApp() {
  const nome    = document.getElementById('contactNome').value.trim();
  const contato = document.getElementById('contactContato').value.trim();
  const tipo    = document.getElementById('contactTipo').value;
  const msg     = document.getElementById('contactMsg').value.trim();

  if (!nome || !contato || !msg) {
    alert('Por favor, preencha nome, contato e descrição do projeto.');
    return;
  }

  const texto = `Olá Luiza! 👋\n\n`
    + `Recebi uma mensagem pelo seu site:\n\n`
    + `👤 *Nome:* ${nome}\n`
    + `📱 *Contato:* ${contato}\n`
    + `🎭 *Tipo de projeto:* ${tipo}\n\n`
    + `💬 *Mensagem:*\n${msg}`;

  const url = `https://wa.me/5547999589792?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');

  // Fecha o modal e limpa os campos
  document.getElementById('contactModal').classList.remove('open');
  document.getElementById('contactNome').value    = '';
  document.getElementById('contactContato').value = '';
  document.getElementById('contactMsg').value     = '';
}

document.addEventListener('DOMContentLoaded', init);