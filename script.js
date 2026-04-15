// ============================================================
//  LUIZA MICHIELIN — PORTFOLIO SCRIPT
// ============================================================

const HERO_BG_IMAGE = './image/fotofundo.png';
const ABOUT_IMAGE   = './image/imagem_pessoal.jpeg';

const cards = [

  {
    title: 'Fantasia da Jasmine',
    category: 'pecas',
    image: './image/jasmine.jpeg'
  },
  {
    title: 'Fantasia de gênio',
    category: 'pecas',
    image: './image/genio.jpeg'
  },
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: './image/mostra1.jpeg'
  },
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: './image/mostra2.jpeg'
  },
  {
    title: 'Figurino Teatro',
    category: 'figurinos',
    image: './image/mostra3.jpeg'
  },
  {
    title: 'Figurino das Dynamos (musical)',
    category: 'figurinos',
    image: './image/ma2.jpg'
  },
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: './image/ma1.jpg'
  },
  {
    title: 'Figurino das Dynamos (musical)',
    category: 'figurinos',
    image: './image/ma3.jpg'
  },
  {
    title: 'Figurino das Dynamos (musical)',
    category: 'figurinos',
    image: './image/ma4.jpg'
  },
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: './image/ma5.jpg'
  },
  {
    title: 'Projeto Especial',
    category: 'projetos',
    image: './image/ma6.jpg'
  },

  // Adicione mais cards aqui:
  // {
  //   title: 'Nome do Projeto',
  //   category: 'figurinos',
  //   image: './image/nome-do-arquivo.jpg'
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

  filtered.forEach(card => {
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
  const heroBg = document.getElementById('heroBgPhoto');
  if (HERO_BG_IMAGE && heroBg) {
    heroBg.style.backgroundImage = `url('${HERO_BG_IMAGE}')`;
    heroBg.classList.add('has-photo');
  }

  const aboutImg         = document.getElementById('aboutImg');
  const aboutPlaceholder = document.getElementById('aboutPlaceholder');
  if (ABOUT_IMAGE && aboutImg) {
    aboutImg.src           = ABOUT_IMAGE;
    aboutImg.style.display = 'block';
    if (aboutPlaceholder) aboutPlaceholder.style.display = 'none';
  }

  renderGrid();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ============================================================
//  MENU MOBILE
// ============================================================
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ============================================================
//  ENVIAR MENSAGEM VIA WHATSAPP
// ============================================================
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
    + `Nova mensagem pelo seu site:\n\n`
    + `👤 *Nome:* ${nome}\n`
    + `📱 *Contato:* ${contato}\n`
    + `🎭 *Tipo de projeto:* ${tipo}\n\n`
    + `💬 *Mensagem:*\n${msg}`;

  const url = `https://wa.me/5547999589792?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');

  document.getElementById('contactModal').classList.remove('open');
  document.getElementById('contactNome').value    = '';
  document.getElementById('contactContato').value = '';
  document.getElementById('contactMsg').value     = '';
}

document.addEventListener('DOMContentLoaded', init);