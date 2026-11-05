// Click or press Enter on a screenshot to view it full size. Esc or click to close.
(function () {
  var imgs = document.querySelectorAll('.project-page .section img');
  if (!imgs.length) return;

  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-label', 'Enlarged screenshot');
  box.hidden = true;
  box.innerHTML =
    '<button class="lightbox-close" type="button">Close</button>' +
    '<img alt="" />' +
    '<p class="lightbox-caption"></p>';
  document.body.appendChild(box);

  var big = box.querySelector('img');
  var caption = box.querySelector('.lightbox-caption');
  var closeBtn = box.querySelector('.lightbox-close');
  var lastFocus = null;

  function open(img) {
    lastFocus = img;
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    var fig = img.closest('figure');
    var cap = fig && fig.querySelector('figcaption');
    caption.textContent = cap ? cap.textContent : img.alt;
    box.hidden = false;
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  }

  function close() {
    box.hidden = true;
    document.body.classList.remove('lightbox-open');
    if (lastFocus) lastFocus.focus();
  }

  imgs.forEach(function (img) {
    img.classList.add('zoomable');
    img.tabIndex = 0;
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'Enlarge: ' + (img.alt || 'screenshot'));
    img.addEventListener('click', function () { open(img); });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(img); }
    });
  });

  box.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !box.hidden) close();
  });
})();
