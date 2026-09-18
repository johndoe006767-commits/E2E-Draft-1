// Trackpad-style wheel scrolling for every page.
// A mouse wheel delivers scroll in hard steps; this intercepts wheel input, accumulates
// it into a target, and lets the real scroll position glide toward that target with
// exponential damping, the way a MacBook trackpad decelerates. Works on the window and on
// any scrollable container (dialog bodies, panels). Touch devices, pinch-zoom and pages
// that handle the wheel themselves (the tower scene) are left alone.
(function () {
  if (matchMedia('(pointer: coarse)').matches) return;
  var reduced = matchMedia('(prefers-reduced-motion: reduce)');
  var active = new Map(); // scroller -> { target, last }
  var raf = 0;

  function scrollerFor(node, dir) {
    var el = node instanceof Element ? node : null;
    while (el && el !== document.body && el !== document.documentElement) {
      var cs = getComputedStyle(el);
      if (/(auto|scroll)/.test(cs.overflowY) && el.scrollHeight > el.clientHeight + 1) {
        var atTop = el.scrollTop <= 0, atBottom = el.scrollTop >= el.scrollHeight - el.clientHeight - 1;
        if ((dir < 0 && !atTop) || (dir > 0 && !atBottom)) return el;
      }
      el = el.parentElement;
    }
    var root = document.scrollingElement || document.documentElement;
    return root.scrollHeight > root.clientHeight + 1 ? root : null;
  }

  function max(el) { return el.scrollHeight - el.clientHeight; }

  function tick(now) {
    raf = 0;
    var lambda = reduced.matches ? 26 : 11;
    active.forEach(function (state, el) {
      var dt = Math.min(0.05, (now - state.last) / 1000) || 0.016;
      state.last = now;
      var current = el.scrollTop;
      var diff = state.target - current;
      if (Math.abs(diff) < 0.4) { el.scrollTop = state.target; active.delete(el); return; }
      el.scrollTop = current + diff * (1 - Math.exp(-lambda * dt));
    });
    if (active.size) raf = requestAnimationFrame(tick);
  }

  window.addEventListener('wheel', function (e) {
    if (e.ctrlKey || e.metaKey || e.defaultPrevented) return;
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal: native
    var delta = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? window.innerHeight : 1);
    if (!delta) return;
    var el = scrollerFor(e.target, delta);
    if (!el) return;
    e.preventDefault();
    var state = active.get(el);
    if (!state) { state = { target: el.scrollTop, last: performance.now() }; active.set(el, state); }
    // Each notch adds a bounded impulse; fast spins stack into a longer, still smooth glide.
    state.target = Math.max(0, Math.min(max(el), state.target + Math.max(-260, Math.min(260, delta))));
    if (!raf) raf = requestAnimationFrame(tick);
  }, { passive: false });

  // A drag on the scrollbar or a keyboard jump takes over cleanly.
  ['keydown', 'pointerdown'].forEach(function (type) {
    window.addEventListener(type, function () { active.clear(); }, true);
  });
})();
