const projectTabs = [...document.querySelectorAll('[data-project]')];
function selectProject(tab, focus = false) {
  projectTabs.forEach(item => {
    const active = item === tab;
    item.classList.toggle('active', active);
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    document.getElementById(item.getAttribute('aria-controls')).hidden = !active;
  });
  if (focus) tab.focus();
}
projectTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectProject(tab));
  tab.addEventListener('keydown', event => {
    let target;
    if (event.key === 'ArrowRight') target = (index + 1) % projectTabs.length;
    if (event.key === 'ArrowLeft') target = (index - 1 + projectTabs.length) % projectTabs.length;
    if (event.key === 'Home') target = 0;
    if (event.key === 'End') target = projectTabs.length - 1;
    if (target === undefined) return;
    event.preventDefault();
    selectProject(projectTabs[target], true);
  });
});

const filters = [...document.querySelectorAll('[data-filter]')];
const articles = [...document.querySelectorAll('[data-category]')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  articles.forEach(article => {
    article.hidden = button.dataset.filter !== 'all' && article.dataset.category !== button.dataset.filter;
    if (!article.hidden) count++;
  });
  document.getElementById('article-status').textContent = '当前显示 ' + count + ' 篇文章';
}));

const versions = document.getElementById('versions');
document.querySelectorAll('[data-open-versions]').forEach(button => button.addEventListener('click', () => {
  if (versions.open) return;
  document.body.classList.add('dialog-open');
  versions.showModal();
}));
document.getElementById('close-versions').addEventListener('click', () => versions.close());
document.getElementById('current-version').addEventListener('click', () => versions.close());
versions.addEventListener('close', () => document.body.classList.remove('dialog-open'));
versions.addEventListener('click', event => {
  if (event.target !== versions) return;
  const box = versions.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) versions.close();
});

const header = document.getElementById('header');
function updateHeader() { header.classList.toggle('scrolled', window.scrollY > 16); }
window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();
if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('nav a')];
  const visible = new Set();
  const observer = new IntersectionObserver(changes => {
    changes.forEach(change => {
      if (change.isIntersecting) visible.add(change.target.id);
      else visible.delete(change.target.id);
    });
    const active = links.find(link => visible.has(link.hash.slice(1)));
    links.forEach(link => {
      if (link === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
  links.forEach(link => observer.observe(document.querySelector(link.hash)));
}
document.getElementById('year').textContent = new Date().getFullYear();
