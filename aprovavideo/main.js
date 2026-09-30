function criarAvatar(s, h, t, b, long) {
  return '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">' +
    '<rect width="100" height="100" fill="' + b + '"/>' +
    (long ? '<rect x="27" y="30" width="46" height="52" rx="22" fill="' + h + '"/>' : '') +
    '<path d="M12 100c0-22 16-30 38-30s38 8 38 30z" fill="' + t + '"/>' +
    '<rect x="43" y="56" width="14" height="16" rx="6" fill="' + s + '"/>' +
    '<ellipse cx="50" cy="42" rx="17" ry="20" fill="' + s + '"/>' +
    '<path d="M32 40c-2-18 10-24 20-24s20 6 18 24c-3-8-8-12-18-12s-15 4-20 12z" fill="' + h + '"/>' +
    '<circle cx="43" cy="44" r="2" fill="#2a2a2a"/>' +
    '<circle cx="57" cy="44" r="2" fill="#2a2a2a"/>' +
    '<path d="M43 52q7 6 14 0" stroke="#2a2a2a" stroke-width="2" fill="none" stroke-linecap="round"/>' +
    '</svg>';
}

var depoimentos = [
  {
    n: 'Mariana Souza',
    u: 'Medicina · USP',
    e: 'ENEM 962',
    q: 'As aulas curtas me ajudaram a estudar mesmo trabalhando meio período. Os simulados foram decisivos.',
    a: ['#f1c27d', '#2b1b12', '#4353ff', '#dfe3ff', 1]
  },
  {
    n: 'Lucas Oliveira',
    u: 'Engenharia · Unicamp',
    e: '1ª fase 82%',
    q: 'As questões comentadas de Matemática e Física mudaram meu jeito de resolver prova.',
    a: ['#c68642', '#1a1a1a', '#12b76a', '#d5f5e6', 0]
  },
  {
    n: 'Ana Beatriz Lima',
    u: 'Direito · UFBA',
    e: 'Redação 960',
    q: 'A correção de redação por competência foi o que me levou de 640 a 960 em poucos meses.',
    a: ['#8d5524', '#1a1010', '#ffb020', '#fff0d0', 1]
  },
  {
    n: 'Pedro Henrique',
    u: 'Ciência da Computação · UFMG',
    e: 'SISU 1º lugar',
    q: 'O cronograma pronto tirou minha ansiedade. Eu só precisava abrir o app e seguir o plano.',
    a: ['#e0ac69', '#5a3825', '#ef476f', '#ffe0e8', 0]
  },
  {
    n: 'Júlia Ferreira',
    u: 'Psicologia · UNESP',
    e: 'ENEM 905',
    q: 'Estudei pelo celular no ônibus todos os dias. Passei na primeira tentativa!',
    a: ['#ffdbac', '#c2571b', '#7c3aed', '#ece3ff', 1]
  },
  {
    n: 'Gabriel Santos',
    u: 'Arquitetura · UFRJ',
    e: 'ENEM 890',
    q: 'Quando eu travava, os monitores respondiam rápido. Isso fez toda a diferença.',
    a: ['#a86b3c', '#111', '#0ea5e9', '#dcf2ff', 0]
  }
];

function gerarAvatar(item) {
  var a = item.a;
  return criarAvatar(a[0], a[1], a[2], a[3], a[4]);
}

function renderizarMiniDepoimentos() {
  var mini = document.getElementById('mini');
  mini.innerHTML = depoimentos.slice(0, 4).map(function (item) {
    return '<div class="row">' +
      gerarAvatar(item) +
      '<div><b>' + item.n + '</b><span>' + item.u + '</span></div>' +
      '</div>';
  }).join('');
}

function renderizarDepoimentos() {
  var dep = document.getElementById('dep');
  dep.innerHTML = depoimentos.map(function (item) {
    return '<div class="card">' +
      '<div class="who">' +
      gerarAvatar(item) +
      '<div><b>' + item.n + '</b><span>' + item.u + '</span></div>' +
      '</div>' +
      '<div class="tags"><span>Aprovado(a)</span><span>' + item.e + '</span></div>' +
      '<div class="stars">★★★★★</div>' +
      '<p>“' + item.q + '”</p>' +
      '</div>';
  }).join('');
}

function initMenuMobile() {
  var nav = document.getElementById('nv');
  var botao = document.getElementById('bg');

  botao.onclick = function () {
    nav.classList.toggle('open');
  };

  nav.onclick = function (event) {
    if (event.target.tagName === 'A') {
      nav.classList.remove('open');
    }
  };
}

renderizarMiniDepoimentos();
renderizarDepoimentos();
initMenuMobile();
