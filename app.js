const $ = (selector) => document.querySelector(selector);
const normalize = (value) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
let category = 'all';
function filterProjects() {
  const query = normalize($('#search').value.trim());
  const status = $('#status-filter').value;
  let count = 0;
  document.querySelectorAll('#project-grid .project-card').forEach(card => {
    const show = (category === 'all' || card.dataset.category === category) && (status === 'all' || card.dataset.status === status) && normalize(card.dataset.search).includes(query);
    card.hidden = !show;
    if (show) count++;
  });
  $('#result-count').textContent = `${count} ${count === 1 ? 'proyecto' : 'proyectos'}`;
  $('#empty').hidden = count !== 0;
}
function resetFilters() {
  category = 'all'; $('#search').value = ''; $('#status-filter').value = 'all';
  document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === 'all')));
  filterProjects();
}
if ($('#project-grid')) {
  $('#search').addEventListener('input', filterProjects);
  $('#status-filter').addEventListener('change', filterProjects);
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    filterProjects();
  }));
  $('#reset').addEventListener('click', resetFilters);
  $('#empty-reset').addEventListener('click', resetFilters);
}
if ($('#menu-toggle')) {
  $('#menu-toggle').addEventListener('click', () => {
    const expanded = $('#menu-toggle').getAttribute('aria-expanded') === 'true';
    $('#menu-toggle').setAttribute('aria-expanded', String(!expanded));
    $('#nav').classList.toggle('open', !expanded);
  });
  $('#nav').querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    $('#menu-toggle').setAttribute('aria-expanded', 'false'); $('#nav').classList.remove('open');
  }));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') { $('#menu-toggle').setAttribute('aria-expanded', 'false'); $('#nav').classList.remove('open'); }});
}
if ($('#copy-email')) $('#copy-email').addEventListener('click', async () => {
  try { await navigator.clipboard.writeText('franklinandreslemaguevara@gmail.com'); $('#copy-feedback').textContent = 'Correo copiado.'; }
  catch { $('#copy-feedback').textContent = 'Selecciona y copia este correo: franklinandreslemaguevara@gmail.com'; }
});
document.querySelectorAll('[data-print]').forEach(button => button.addEventListener('click', () => window.print()));

if (['127.0.0.1', 'localhost'].includes(location.hostname) || location.protocol === 'file:') document.querySelectorAll('[data-owner-tools]').forEach(element => { element.hidden = false; });


// The three cases are still readable when scripts are unavailable.
const connectionControls = document.querySelector('[data-channel-controls]');
if (connectionControls) {
 const switches = [...connectionControls.querySelectorAll('[data-channel]')];
 const panels = [...document.querySelectorAll('[data-channel-panel]')];
 const selectConnection = (button) => {
  switches.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  panels.forEach(panel => { panel.hidden = panel.dataset.channelPanel !== button.dataset.channel; });
 };
 if (switches.length) {
  switches.forEach(button => button.addEventListener('click', () => selectConnection(button)));
  selectConnection(switches[0]);
  connectionControls.hidden = false;
 }
}
