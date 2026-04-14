// ============================================================
//  LUIZA MICHIELIN — PORTFOLIO SCRIPT
// ============================================================

// ============================================================
//  FOTO DE FUNDO DO HERO (BANNER PRINCIPAL)
//  Cole o caminho da sua foto aqui:
//  Exemplo: './fotos/banner.jpg'
//  Deixe null para usar o fundo escuro.
// ============================================================
const HERO_BG_IMAGE = './image/fotofundo.png'; // <- coloque o caminho aqui: './fotos/banner.jpg'

// ============================================================
//  FOTO DA SEÇÃO "SOBRE"
//  Cole o caminho da sua foto aqui:
//  Exemplo: './fotos/perfil.jpg'
//  Deixe null para mostrar o espaço vazio.
// ============================================================
const ABOUT_IMAGE = './image/imagem_pessoal.jpeg'; // <- coloque o caminho aqui: './fotos/perfil.jpg'

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
    category: 'pecas',
    image: './image/jasmine.jpeg'  // <- './fotos/jasmine.jpg'
  },

  // --- CARD 2 ---
  {
    title: 'Fantasia de gênio',
    category: 'pecas',
    image: './image/genio.jpeg' // <- './fotos/bia.jpg'
  },

  // --- CARD 3 ---
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: './image/mostra1.jpeg'  // <- './fotos/teatro.jpg'
  },
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: './image/mostra2.jpeg'  // <- './fotos/teatro.jpg'
  },
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: './image/mostra3.jpeg'  // <- './fotos/teatro.jpg'
  },



  // --- CARD 5 ---
  {
    title: 'Figurino das Dynamos(musical)',
    category: 'figurinos',
    image: './image/ma2.jpg'  // <- './fotos/peca1.jpg'
  },

  // --- CARD 6 ---
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: './image/ma1.jpg' // <- './fotos/projeto1.jpg'
  },
  {
    title: 'Figurino das Dynamos(musical)',
    category: 'figurinos',
    image: './image/ma3.jpg' // <- './fotos/projeto1.jpg'
  },
  {
    title: 'Figurino das Dynamos(musical)',
    category: 'figurinos',
    image: './image/ma4.jpg' // <- './fotos/projeto1.jpg'
  },
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: './image/ma5.jpg' // <- './fotos/projeto1.jpg'
  },
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: './image/ma6.jpg' // <- './fotos/projeto1.jpg'
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

document.addEventListener('DOMContentLoaded', init);