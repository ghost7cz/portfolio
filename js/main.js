
(function () {
  'use strict';

  
  var nav = document.getElementById('nav');
  function onScroll() { nav.classList.toggle('s', window.scrollY > 20); }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  
  var burger = document.getElementById('bg');
  var links = document.getElementById('links');
  function setMenu(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  }
  burger.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') setMenu(false); }); 
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });   
  window.addEventListener('resize', function () { if (window.innerWidth > 960) setMenu(false); });  

  
  var track = document.getElementById('mt');
  if (track) track.innerHTML += track.innerHTML;

  
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); }); 
  }

  
  var win = document.getElementById('win');
  if (win && window.matchMedia('(hover:hover) and (prefers-reduced-motion:no-preference)').matches) {
    window.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 8;
      var y = (e.clientY / window.innerHeight - 0.5) * 8;
      win.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    }, { passive: true });
  }

})();
