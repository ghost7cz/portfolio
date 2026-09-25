const products = [
  {id:1, cat:"burgers", name:"Classic House", desc:"Pão brioche, smash de carne, queijo prato, alface, tomate e molho da casa.", price:28, img:"produtos/hamburger-calsico.jpg", tag:"CLÁSSICO"},
  {id:2, cat:"burgers", name:"Bacon Boss", desc:"Smash duplo, cheddar cremoso, bacon crocante e molho barbecue.", price:34, img:"produtos/xbacon.jfif", tag:"MAIS PEDIDO"},
  {id:3, cat:"burgers", name:"Double Cheese", desc:"Duas carnes, queijo duplo, cebola caramelizada e molho especial.", price:38, img:"produtos/muito-queijo.jpg", tag:"DUPLO"},
  {id:4, cat:"burgers", name:"Hot House", desc:"Carne, pepperoni, cheddar, jalapeño e maionese picante.", price:35, img:"produtos/pimneta.jpg", tag:"PICANTE"},
  {id:5, cat:"combos", name:"Combo Classic", desc:"Classic House + fritas crocantes + refrigerante lata.", price:39, img:"produtos/combo.jfif", tag:"COMBO"},
  {id:6, cat:"combos", name:"Combo Bacon", desc:"Bacon Boss + fritas + refrigerante lata.", price:45, img:"produtos/combo2.jpg", tag:"COMBO"},
  {id:7, cat:"acompanhamentos", name:"Batata House", desc:"Porção de batatas crocantes com páprica e molho especial.", price:16, img:"produtos/batata.jpg", tag:""},
  {id:8, cat:"acompanhamentos", name:"Onion Rings", desc:"Anéis de cebola empanados e crocantes.", price:18, img:"produtos/cebola.jpg", tag:""},
  {id:9, cat:"acompanhamentos", name:"Cheddar Fries", desc:"Batata crocante coberta com cheddar cremoso e bacon.", price:23, img:"produtos/batata2.jfif", tag:""},
  {id:10, cat:"bebidas", name:"Refrigerante", desc:"Lata 350ml. Escolha seu sabor favorito.", price:7, img:"produtos/coca.jpg", tag:""},
  {id:11, cat:"bebidas", name:"Milkshake", desc:"Milkshake cremoso de chocolate ou morango, 400ml.", price:17, img:"produtos/milksha.jpg", tag:""},
  {id:12, cat:"bebidas", name:"Água", desc:"Água mineral sem gás, 500ml.", price:5, img:"produtos/agua.jpg", tag:""}
];
let cart = JSON.parse(localStorage.getItem("burgerCart") || "[]");
const productsEl = document.getElementById("products");
const cartEl = document.getElementById("cart");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const cartCount = document.getElementById("cartCount");
const toast = document.getElementById("toast");

function money(value){ return value.toLocaleString("pt-BR",{style:"currency",currency:"BRL"}); }

function renderProducts(category="todos"){
  const list = category==="todos" ? products : products.filter(p=>p.cat===category);
  productsEl.innerHTML = list.map(p=>`
    <article class="product">
      ${p.tag ? `<span class="product-tag">${p.tag}</span>` : ""}
      <div class="product-img"><img src="${p.img}" alt="${p.name}"></div>
      <h3>${p.name}</h3><p>${p.desc}</p>
      <div class="product-bottom"><span class="price">${money(p.price)}</span>
      <button class="add" data-id="${p.id}">+ Adicionar</button></div>
    </article>`).join("");
  document.querySelectorAll(".add").forEach(btn=>btn.addEventListener("click",()=>addToCart(Number(btn.dataset.id))));
}

function addToCart(id){
  const item = cart.find(i=>i.id===id);
  if(item) item.qty++;
  else cart.push({id,qty:1});
  save();
  openCart();
  notify("Item adicionado ao pedido!");
}

function changeQty(id, delta){
  const item=cart.find(i=>i.id===id);
  if(!item)return;
  item.qty+=delta;
  if(item.qty<=0)cart=cart.filter(i=>i.id!==id);
  save();
}

function save(){localStorage.setItem("burgerCart",JSON.stringify(cart));renderCart();}

function renderCart(){
  const count=cart.reduce((s,i)=>s+i.qty,0);
  cartCount.textContent=count;
  if(!cart.length){
    cartItems.innerHTML='<div class="empty">Seu carrinho está vazio.<br><small>Escolha um burger para começar.</small></div>';
    cartTotal.textContent=money(0); return;
  }
  let total=0;
  cartItems.innerHTML=cart.map(item=>{
    const p=products.find(x=>x.id===item.id); total+=p.price*item.qty;
    return `<div class="cart-row"><div class="cart-emoji">${p.emoji}</div><div><h4>${p.name}</h4><small>${money(p.price)} cada</small><div class="qty"><button data-id="${p.id}" data-d="-1">−</button><span>${item.qty}</span><button data-id="${p.id}" data-d="1">+</button></div></div><strong class="cart-price">${money(p.price*item.qty)}</strong></div>`;
  }).join("");
  cartTotal.textContent=money(total);
  cartItems.querySelectorAll(".qty button").forEach(b=>b.addEventListener("click",()=>changeQty(Number(b.dataset.id),Number(b.dataset.d))));
}

function openCart(){cartEl.classList.add("open");overlay.classList.add("show");}
function closeCart(){cartEl.classList.remove("open");overlay.classList.remove("show");}
function notify(msg){toast.textContent=msg;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2200);}

document.querySelectorAll(".filter").forEach(btn=>btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active"); renderProducts(btn.dataset.category);
}));
document.getElementById("openCart").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
overlay.addEventListener("click",closeCart);
document.getElementById("contactOrder").addEventListener("click",openCart);

document.getElementById("checkout").addEventListener("click",()=>{
  if(!cart.length){notify("Adicione pelo menos um item ao pedido.");return;}
  const note=document.getElementById("orderNote").value.trim();
  let text="*BURGER HOUSE — PEDIDO DEMONSTRATIVO*%0A%0A";
  cart.forEach(i=>{const p=products.find(x=>x.id===i.id);text+=`${i.qty}x ${p.name} — ${money(p.price*i.qty)}%0A`;});
  if(note)text+=`%0AObservação: ${encodeURIComponent(note)}%0A`;
  const total=cart.reduce((s,i)=>s+products.find(p=>p.id===i.id).price*i.qty,0);
  text+=`%0A*Total: ${money(total)}*`;
  notify("Demonstração: o pedido seria enviado pelo WhatsApp.");
  
  window.setTimeout(()=>window.open(`https://wa.me/5577999999999?text=${text}`,"_blank"),500);
});

renderProducts();
renderCart();
