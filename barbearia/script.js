const selected = new Map();

const serviceButtons = document.querySelectorAll(".choose-service");
const selectedServices = document.getElementById("selectedServices");
const totalPrice = document.getElementById("totalPrice");
const toast = document.getElementById("toast");
const form = document.getElementById("bookingForm");
const dateInput = document.getElementById("date");

const today = new Date();
dateInput.min = today.toISOString().split("T")[0];

function renderSelected() {
  if (!selected.size) {
    selectedServices.textContent = "Nenhum serviço selecionado.";
    totalPrice.textContent = "R$ 0";
    return;
  }

  selectedServices.innerHTML = [...selected.values()]
    .map(item => `${item.name} — R$ ${item.price}`)
    .join("<br>");

  const total = [...selected.values()].reduce((sum, item) => sum + item.price, 0);
  totalPrice.textContent = `R$ ${total}`;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

serviceButtons.forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.service;
    const price = Number(button.dataset.price);

    if (selected.has(name)) {
      selected.delete(name);
      button.textContent = "Selecionar";
      button.closest(".service-card").classList.remove("featured");
    } else {
      selected.set(name, { name, price });
      button.textContent = "Selecionado ✓";
      button.closest(".service-card").classList.add("featured");
    }
    renderSelected();
    document.querySelector("#agenda").scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

form.addEventListener("submit", event => {
  event.preventDefault();

  if (!selected.size) {
    showToast("Selecione pelo menos um serviço.");
    document.querySelector("#servicos").scrollIntoView({ behavior: "smooth" });
    return;
  }

  const name = document.getElementById("name").value.trim();
  const date = dateInput.value;
  const time = document.getElementById("time").value;

  const formattedDate = new Date(date + "T12:00:00").toLocaleDateString("pt-BR");

  showToast(`Agendamento demonstrativo criado para ${name}, ${formattedDate} às ${time}.`);
  form.reset();
  selected.clear();
  serviceButtons.forEach(btn => {
    btn.textContent = "Selecionar";
    btn.closest(".service-card").classList.remove("featured");
  });
  renderSelected();
});

document.querySelector(".menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav").classList.toggle("open");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => document.querySelector(".nav").classList.remove("open"));
});
