
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});


nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});


const statNumbers = document.querySelectorAll('.stat-num');

function animarContador(el) {
  const alvo = parseInt(el.dataset.count, 10);
  const duracao = 1200;
  const inicio = performance.now();

  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    const valorAtual = Math.floor(progresso * alvo);
    el.textContent = valorAtual;
    if (progresso < 1) {
      requestAnimationFrame(passo);
    } else {
      el.textContent = alvo;
    }
  }
  requestAnimationFrame(passo);
}

const statsSection = document.getElementById('stats');
let statsAnimados = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimados) {
      statsAnimados = true;
      statNumbers.forEach(animarContador);
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.4 });

if (statsSection) statsObserver.observe(statsSection);


const track = document.getElementById('sliderTrack');
const dotsContainer = document.getElementById('sliderDots');
const slides = track.querySelectorAll('.depoimento');
let slideAtual = 0;
let autoplayId = null;

slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.setAttribute('aria-label', `Ver depoimento ${i + 1}`);
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => irParaSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = dotsContainer.querySelectorAll('button');

function irParaSlide(indice) {
  slideAtual = indice;
  track.style.transform = `translateX(-${slideAtual * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === slideAtual));
}

function proximoSlide() {
  irParaSlide((slideAtual + 1) % slides.length);
}

function iniciarAutoplay() {
  autoplayId = setInterval(proximoSlide, 5500);
}
function pararAutoplay() {
  clearInterval(autoplayId);
}

iniciarAutoplay();
const sliderEl = document.getElementById('slider');
sliderEl.addEventListener('mouseenter', pararAutoplay);
sliderEl.addEventListener('mouseleave', iniciarAutoplay);


const form = document.getElementById('contatoForm');
const formSuccess = document.getElementById('formSuccess');

function mostrarErro(campoId, mensagem) {
  const erroEl = document.getElementById(`erro-${campoId}`);
  const campoEl = document.getElementById(campoId);
  erroEl.textContent = mensagem;
  campoEl.closest('.field').classList.toggle('invalid', Boolean(mensagem));
}

function validarNome() {
  const valor = document.getElementById('nome').value.trim();
  if (valor.length < 3) {
    mostrarErro('nome', 'Digite seu nome completo.');
    return false;
  }
  mostrarErro('nome', '');
  return true;
}

function validarTelefone() {
  const valor = document.getElementById('telefone').value.trim();
  const digitos = valor.replace(/\D/g, '');
  if (digitos.length < 10) {
    mostrarErro('telefone', 'Digite um telefone válido com DDD.');
    return false;
  }
  mostrarErro('telefone', '');
  return true;
}

function validarEmail() {
  const valor = document.getElementById('email').value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(valor)) {
    mostrarErro('email', 'Digite um e-mail válido.');
    return false;
  }
  mostrarErro('email', '');
  return true;
}

function validarObjetivo() {
  const valor = document.getElementById('objetivo').value;
  if (!valor) {
    mostrarErro('objetivo', 'Selecione um objetivo.');
    return false;
  }
  mostrarErro('objetivo', '');
  return true;
}


document.getElementById('nome').addEventListener('blur', validarNome);
document.getElementById('telefone').addEventListener('blur', validarTelefone);
document.getElementById('email').addEventListener('blur', validarEmail);
document.getElementById('objetivo').addEventListener('change', validarObjetivo);


document.getElementById('telefone').addEventListener('input', (e) => {
  let v = e.target.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 6) {
    v = v.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  } else if (v.length > 2) {
    v = v.replace(/(\d{2})(\d{0,5})/, '($1) $2');
  } else if (v.length > 0) {
    v = v.replace(/(\d{0,2})/, '($1');
  }
  e.target.value = v;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nomeOk = validarNome();
  const telefoneOk = validarTelefone();
  const emailOk = validarEmail();
  const objetivoOk = validarObjetivo();

  if (nomeOk && telefoneOk && emailOk && objetivoOk) {
    
    formSuccess.textContent = 'Recebido! Vou te chamar no WhatsApp em breve para marcar a avaliação.';
    form.reset();
    document.querySelectorAll('.field').forEach(f => f.classList.remove('invalid'));
  } else {
    formSuccess.textContent = '';
  }
});
