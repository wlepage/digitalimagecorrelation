/* Progressive-enhancement TOC for the DIC guide.
   Builds a nested table of contents from the article's headings (which carry
   kramdown-generated ids) and highlights the section currently in view.
   With JS off, the static fallback list in the layout still works. */
(function () {
  'use strict';

  var article = document.querySelector('.doc-article');
  var list = document.querySelector('.toc-list');
  if (!article || !list) return;

  // Only the seven numbered top-level sections appear in the nav.
  var headings = Array.prototype.slice.call(
    article.querySelectorAll('h1[id]')
  );
  if (!headings.length) return;

  // Replace the no-JS fallback with a generated, nested list.
  list.removeAttribute('data-toc-fallback');
  list.innerHTML = '';

  var linkFor = {};
  headings.forEach(function (h) {
    var li = document.createElement('li');
    li.className = 'toc-' + h.tagName.toLowerCase();
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
    linkFor[h.id] = a;
  });

  // Scroll-spy via IntersectionObserver: the topmost heading whose section is
  // in view gets marked active.
  var current = null;
  function setActive(id) {
    if (id === current) return;
    if (current && linkFor[current]) linkFor[current].classList.remove('is-active');
    if (id && linkFor[id]) linkFor[id].classList.add('is-active');
    current = id;
  }

  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      visible[entry.target.id] = entry.isIntersecting;
    });
    // Pick the first heading (document order) currently intersecting.
    for (var i = 0; i < headings.length; i++) {
      if (visible[headings[i].id]) { setActive(headings[i].id); return; }
    }
  }, { rootMargin: '-20% 0px -70% 0px' });

  headings.forEach(function (h) { observer.observe(h); });
})();
