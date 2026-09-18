// Shared navigation bar. Include this script on every page; it reads
// <body data-page="landing|roadmap|tower-overview"> to highlight the current page.
// One underline is shared by all links. Pages are separate documents, so the line
// remembers the link it left (sessionStorage) and glides from there on the next page.
(function () {
  var PAGES = [
    { id: 'landing', label: 'Landing', href: '/' },
    { id: 'roadmap', label: 'Roadmap', href: '/roadmap/' },
    { id: 'tower-overview', label: 'Tower Overview', href: '/tower-overview/' },
  ];
  var KEY = 'gfs-nav-from';
  var current = document.body.dataset.page || '';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');

  var header = document.createElement('header');
  header.className = 'site-nav';
  var brand = document.createElement('a');
  brand.className = 'site-nav-brand';
  brand.href = '/';
  brand.setAttribute('aria-label', 'AstraZeneca - GFS KL home');
  var logo = document.createElement('img');
  logo.src = '/assets/brand/astrazeneca.svg';
  logo.alt = 'AstraZeneca';
  logo.width = 187;
  logo.height = 47;
  brand.appendChild(logo);
  var nav = document.createElement('nav');
  nav.setAttribute('aria-label', 'Explore GFS KL');
  var list = document.createElement('ul');
  list.className = 'site-nav-links';
  var links = {};
  PAGES.forEach(function (page) {
    var item = document.createElement('li');
    var link = document.createElement('a');
    link.href = page.href;
    link.textContent = page.label;
    link.dataset.page = page.id;
    if (page.id === current) link.setAttribute('aria-current', 'page');
    item.appendChild(link);
    list.appendChild(item);
    links[page.id] = link;
  });
  var underline = document.createElement('span');
  underline.className = 'site-nav-underline';
  underline.setAttribute('aria-hidden', 'true');
  list.appendChild(underline);
  nav.appendChild(list);
  header.appendChild(brand);
  header.appendChild(nav);
  document.body.insertBefore(header, document.body.firstChild);

  function place(link, animate) {
    if (!link) return;
    var box = list.getBoundingClientRect(), r = link.getBoundingClientRect();
    underline.style.transition = animate && !reduced.matches ? '' : 'none';
    underline.style.width = r.width + 'px';
    underline.style.transform = 'translateX(' + (r.left - box.left) + 'px)';
    underline.style.opacity = '1';
    if (!animate) { void underline.offsetWidth; underline.style.transition = ''; }
  }

  // Start where the previous page left the line, then glide to this page's link.
  var from = null;
  try { from = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (e) {}
  var target = links[current];
  if (from && links[from] && from !== current && target) {
    place(links[from], false);
    requestAnimationFrame(function () { requestAnimationFrame(function () { place(target, true); }); });
  } else {
    place(target, false);
  }

  // On click the line leaves immediately; the next document picks it up from here.
  PAGES.forEach(function (page) {
    links[page.id].addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      place(links[page.id], true);
      try { sessionStorage.setItem(KEY, current); } catch (err) {}
    });
  });
  window.addEventListener('resize', function () { place(links[current], false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { place(links[current], false); });

  // Records whether the visitor is using a keyboard or a pointer so pages can
  // skip decorative motion during keyboard interaction (html[data-input=keyboard]).
  var keyboard = function () { document.documentElement.dataset.input = 'keyboard'; };
  var pointer = function () { document.documentElement.dataset.input = 'pointer'; };
  document.addEventListener('keydown', keyboard, true);
  document.addEventListener('pointerdown', pointer, true);
  document.addEventListener('pointermove', pointer, true);
})();
