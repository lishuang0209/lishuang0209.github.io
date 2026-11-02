const entries = [
  { title: '小红书图文创作 Skill', description: '项目 · AI 工作流 / Skills / MCP / Python', url: 'https://lishuang0209.github.io/xiaohongshu-content/', icon: 'i-spark', external: true, keywords: 'AI xiaohongshu 内容 创作 封面 文案' },
  { title: 'Blender 交互展示页', description: '项目 · React / Three.js / GSAP', url: 'https://lishuang0209.github.io/blender-landing-page/', icon: 'i-code', external: true, keywords: 'blender 3d 网页 交互 滚动 WebGL' },
  { title: '个人网站 · Graphite 原版', description: '项目 · 原版独立保留', url: 'https://lishuang0209.github.io/', icon: 'i-grid', external: true, keywords: '网站 portfolio graphite 旧版 原版' },
  { title: 'AI零代码做3D落地页：完整流程拆解附全提示词', description: '公众号文章 · AI 辅助开发 / 3D 交互', url: 'https://mp.weixin.qq.com/s/NDDeExPvONx2e7c02f8m7Q', icon: 'i-pen', external: true, keywords: 'AI 文章 3d 提示词 流程' },
  { title: '实操用Obsidian+Codex搭建一个能持续积累的产品知识库', description: '公众号文章 · 产品知识管理', url: 'https://mp.weixin.qq.com/s/VYoCFtJz50dWtEERfJwD_g', icon: 'i-pen', external: true, keywords: '文章 obsidian codex 知识库 产品' },
  { title: '当 REA 号称逆向一切，真正带不走的东西是什么', description: '公众号文章 · 技术观察', url: 'https://mp.weixin.qq.com/s/6i2JO8WEyKlgmrdg3vdAUA', icon: 'i-pen', external: true, keywords: '文章 REA 逆向 技术' },
  { title: '我的技能与工具', description: '页面 · AI / 前端 / 知识管理 / 工程发布', url: '#skills', icon: 'i-command', keywords: '技能 技术 skills 工具 react python typescript' },
  { title: '关于小小', description: '页面 · 创作与探索', url: '#about', icon: 'i-grid', keywords: '关于 about 小小 介绍' },
  { title: 'GitHub 个人主页', description: '代码、项目与更多探索', url: 'https://github.com/lishuang0209', icon: 'i-github', external: true, keywords: 'github 源码 开源 仓库' }
];

const dialog = document.getElementById('command-dialog');
const input = document.getElementById('command-input');
const results = document.getElementById('command-results');
const empty = document.getElementById('command-empty');
const count = document.getElementById('result-count');
let selectedIndex = 0;
let visibleEntries = entries;

function createIcon(name) {
  const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  icon.classList.add('icon');
  icon.setAttribute('aria-hidden', 'true');
  const use = document.createElementNS('http://www.w3.org/2000/svg', 'use');
  use.setAttribute('href', '#' + name);
  icon.append(use);
  return icon;
}

function renderResults() {
  const query = input.value.trim().toLocaleLowerCase();
  visibleEntries = entries.filter(entry => (entry.title + ' ' + entry.description + ' ' + entry.keywords).toLocaleLowerCase().includes(query));
  selectedIndex = 0;
  const links = visibleEntries.map((entry, index) => {
    const link = document.createElement('a');
    link.href = entry.url;
    link.className = 'result-link';
    if (entry.external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    const iconContainer = document.createElement('span');
    iconContainer.className = 'app-icon';
    iconContainer.append(createIcon(entry.icon));
    const text = document.createElement('span');
    text.className = 'result-text';
    const title = document.createElement('strong');
    title.textContent = entry.title;
    const description = document.createElement('small');
    description.textContent = entry.description;
    text.append(title, description);
    link.append(iconContainer, text, createIcon(entry.external ? 'i-external' : 'i-arrow'));
    link.addEventListener('pointerenter', () => selectResult(index, false));
    link.addEventListener('focus', () => selectResult(index, false));
    link.addEventListener('click', closeDialog);
    return link;
  });
  results.replaceChildren(...links);
  empty.hidden = visibleEntries.length !== 0;
  count.textContent = visibleEntries.length + ' 个入口';
  selectResult(0, false);
}

function selectResult(index, scroll) {
  const links = [...results.querySelectorAll('a')];
  if (!links.length) return;
  selectedIndex = (index + links.length) % links.length;
  links.forEach((link, itemIndex) => {
    link.classList.toggle('is-selected', itemIndex === selectedIndex);
    if (itemIndex === selectedIndex) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
  if (scroll) links[selectedIndex].scrollIntoView({ block: 'nearest' });
}

function openDialog() {
  if (dialog.open) return;
  input.value = '';
  renderResults();
  document.body.classList.add('dialog-open');
  dialog.showModal();
  input.focus();
}

function closeDialog() {
  dialog.close();
}

document.querySelectorAll('[data-open-command]').forEach(button => button.addEventListener('click', openDialog));
document.getElementById('close-command').addEventListener('click', closeDialog);
input.addEventListener('input', renderResults);
input.addEventListener('keydown', event => {
  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
    event.preventDefault();
    selectResult(selectedIndex + (event.key === 'ArrowDown' ? 1 : -1), true);
  }
  if (event.key === 'Enter') {
    event.preventDefault();
    results.querySelectorAll('a')[selectedIndex]?.click();
  }
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
dialog.addEventListener('click', event => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog();
});
document.addEventListener('keydown', event => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    if (dialog.open) closeDialog();
    else openDialog();
  }
});

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const projectCards = [...document.querySelectorAll('[data-category]')];
filterButtons.forEach(button => button.addEventListener('click', () => {
  filterButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let visible = 0;
  projectCards.forEach(card => {
    card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    if (!card.hidden) visible++;
  });
  document.getElementById('filter-status').textContent = '当前显示 ' + visible + ' 个项目';
}));

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.navigation nav a')];
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
