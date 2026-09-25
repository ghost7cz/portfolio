const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const form = document.getElementById('form');
const toast = document.getElementById('toast');
const date = document.getElementById('date');

menu?.addEventListener('click', () => {
  nav.classList.toggle('open');
});

document.querySelectorAll('.links a').forEach((a) => {
  a.addEventListener('click', () => {
    nav.classList.remove('open');
  });
});

if (date) {
  date.min = new Date().toISOString().split('T')[0];
}

function notify(text) {
  toast.textContent = text;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const specialty = document.getElementById('specialty').value;
  const d = date.value;

  if (!name || !specialty || !d) {
    notify('Preencha os campos obrigatórios.');
    return;
  }

  const day = new Date(`${d}T12:00:00`).toLocaleDateString('pt-BR');

  notify(`Solicitação registrada para ${name}: ${specialty}, ${day}.`);
  form.reset();

  if (date) {
    date.min = new Date().toISOString().split('T')[0];
  }
});
