(() => {
  const dialog = document.querySelector('#gallery-viewer');
  const links = [...document.querySelectorAll('.gallery-open')];
  if (dialog && typeof dialog.showModal === 'function') {
    const image = document.querySelector('#viewer-image'), caption = document.querySelector('#viewer-caption'), count = document.querySelector('#viewer-count');
    const previous = document.querySelector('#viewer-prev'), next = document.querySelector('#viewer-next');
    let selected = 0, opener;
    const show = (index) => {
      selected = (index + links.length) % links.length;
      const link = links[selected];
      image.src = link.href; image.alt = link.querySelector('img').alt;
      caption.textContent = link.dataset.caption; count.textContent = `${selected + 1} / ${links.length}`;
      previous.disabled = next.disabled = links.length < 2;
    };
    links.forEach((link, index) => link.addEventListener('click', event => {
      event.preventDefault(); opener = link; show(index); dialog.showModal();
    }));
    previous.addEventListener('click', () => show(selected - 1));
    next.addEventListener('click', () => show(selected + 1));
    document.querySelector('#viewer-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) { const box = dialog.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close(); } });
    dialog.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(selected - 1); }
      if (event.key === 'ArrowRight') { event.preventDefault(); show(selected + 1); }
    });
    dialog.addEventListener('close', () => { if (opener) opener.focus(); });
  }
  if (['localhost', '127.0.0.1'].includes(location.hostname)) document.querySelectorAll('.local-media-tools').forEach(el => { el.hidden = false; });
})();
