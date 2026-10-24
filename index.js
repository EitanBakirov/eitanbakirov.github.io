import { bio, skills, experience, education, featuredProjects, socialLinks } from './user-data/data.js';
import { organizations, projectPresentation } from './user-data/presentation.js';

const select = selector => document.querySelector(selector);
const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
const externalLink = (url, className, text) => {
  const link = element('a', className, text);
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  return link;
};
const coreTools = new Set(['Python', 'SQL', 'PySpark', 'Databricks', 'MLflow', 'XGBoost', 'OpenSearch', 'FastAPI', 'Probability Calibration', 'Multi-Armed Bandits', 'Semantic Search']);
const tags = (items, emphasize = false) => {
  const list = element('div', 'tag-list');
  items.forEach(item => list.append(element('span', emphasize && coreTools.has(item) ? 'key-tool' : '', item)));
  return list;
};
const details = (items, emphasize = false) => {
  const list = element('ul', 'detail-list');
  items.forEach(text => {
    const item = element('li');
    if (!emphasize) item.textContent = text;
    else text.split(/(logistic regression|XGBoost|probability calibration|Python, SQL, PySpark, and Databricks|MLflow|FastAPI and OpenSearch|Bayesian estimation)/g).forEach((part, i) => item.append(i % 2 ? element('strong', '', part) : document.createTextNode(part)));
    list.append(item);
  });
  return list;
};

bio.forEach(text => {
  const paragraph = element('p');
  paragraph.innerHTML = text; // Trusted, repository-owned biography markup.
  select('#bio').append(paragraph);
});
socialLinks.forEach(item => {
  const link = externalLink(item.url, '', item.platform + ' ↗');
  link.setAttribute('aria-label', `Eitan Bakirov on ${item.platform} (opens in a new tab)`);
  select('#social-links-container').append(link);
});

experience.forEach((job, index) => {
  const card = element('article', `experience-card${index === 0 ? ' current' : ''}`);
  const meta = element('div', 'experience-meta');
  meta.append(element('p', 'period', job.duration));
  const organization = organizations[job.title];
  if (organization) {
    const logo = element('div', 'company-logo' + (organization.emblem ? ' emblem' : ''));
    const image = element('img');
    image.src = organization.logo;
    image.alt = organization.alt;
    image.loading = 'lazy';
    image.width = 145;
    image.height = 70;
    logo.append(image);
    meta.append(logo);
  }
  const body = element('div', 'experience-body');
  const heading = element('div', 'role-header');
  heading.append(element('h3', '', job.subtitle));
  if (index === 0) heading.append(element('span', 'current-label', 'Current role'));
  body.append(heading, element('p', 'organization', job.title), details(job.details, index === 0), tags(job.tags, true));
  card.append(meta, body);
  select('#experience-list').append(card);
});

skills.forEach((group, index) => {
  const card = element('article', 'skill-card');
  const title = element('h3');
  title.append(element('span', 'skill-number', String(index + 1).padStart(2, '0')), document.createTextNode(group.category));
  card.append(title, tags(group.items, true));
  select('#skills-grid').append(card);
});

const modal = select('#project-modal');
let lastProjectTrigger;
const openProject = (project, trigger) => {
  lastProjectTrigger = trigger;
  const presentation = projectPresentation[project.repoName];
  select('#modal-title').textContent = project.title;
  select('#modal-category').textContent = presentation.label;
  select('#modal-description').textContent = project.description;
  select('#modal-tags').replaceChildren(...tags(project.tags).children);
  select('#modal-github').href = project.github;
  select('#modal-demo').hidden = !project.demo;
  if (project.demo) select('#modal-demo').href = project.demo;
  const gallery = select('#modal-gallery');
  gallery.replaceChildren();
  presentation.screenshots.forEach((path, index) => {
    const figure = element('figure');
    const image = element('img');
    image.src = path;
    image.alt = `${project.title} — screenshot ${index + 1}`;
    image.loading = 'lazy';
    figure.append(image, element('figcaption', '', `Screenshot ${index + 1}`));
    gallery.append(figure);
  });
  modal.showModal();
  modal.scrollTop = 0;
};
select('.dialog-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  const box = modal.getBoundingClientRect();
  if (event.target === modal && (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom)) modal.close();
});
modal.addEventListener('close', () => lastProjectTrigger?.focus());

const renderProjects = (filter = 'all') => {
  const visible = featuredProjects.filter(project => filter === 'all' || projectPresentation[project.repoName].category === filter);
  select('#projects-container').replaceChildren();
  visible.forEach(project => {
    const presentation = projectPresentation[project.repoName];
    const card = element('article', 'project-card');
    const imageButton = element('button', 'project-image');
    imageButton.type = 'button';
    imageButton.setAttribute('aria-label', `View ${project.title} details`);
    const image = element('img');
    image.src = presentation.thumbnail;
    image.alt = ''; // The adjacent title names the project.
    image.loading = 'lazy';
    image.width = 128;
    image.height = 128;
    imageButton.append(image);
    imageButton.addEventListener('click', () => openProject(project, imageButton));
    const copy = element('div', 'project-copy');
    const heading = element('h3');
    const titleButton = element('button', 'project-title', project.title);
    titleButton.type = 'button';
    titleButton.addEventListener('click', () => openProject(project, titleButton));
    heading.append(titleButton);
    const bottom = element('div', 'project-bottom');
    const codeLink = externalLink(project.github, 'project-link', '↗');
    codeLink.setAttribute('aria-label', `View ${project.title} code (opens in a new tab)`);
    bottom.append(tags(project.tags.slice(0, 3)), codeLink);
    copy.append(element('span', 'project-category', presentation.label), heading, element('p', '', project.shortDescription), bottom);
    card.append(imageButton, copy);
    select('#projects-container').append(card);
  });
  select('#project-count').textContent = `${visible.length} project${visible.length === 1 ? '' : 's'}`;
};
document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  renderProjects(button.dataset.filter);
}));
renderProjects();

education.forEach(item => {
  const row = element('article', 'education-item');
  const body = element('div');
  body.append(element('h3', '', item.title), element('p', 'organization', item.subtitle), details(item.details), tags(item.tags));
  row.append(element('p', 'period', item.duration), body);
  select('#education-list').append(row);
});
select('#year').textContent = new Date().getFullYear();

const themeButton = select('.theme-toggle');
const updateThemeLabel = () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', `Switch to ${dark ? 'light' : 'dark'} theme`);
  themeButton.setAttribute('aria-pressed', String(dark));
};
updateThemeLabel();
themeButton.addEventListener('click', () => {
  const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = theme;
  try { localStorage.setItem('eitan-theme', theme); } catch {}
  updateThemeLabel();
});

const navLinks = [...document.querySelectorAll('nav a')];
const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
let scheduled = false;
const updateNavigation = () => {
  const readingLine = window.scrollY + 160;
  let current;
  sections.forEach(section => { if (section.offsetTop <= readingLine) current = section.id; });
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = 'contact';
  navLinks.forEach(link => {
    if (link.hash === '#' + current) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  scheduled = false;
};
window.addEventListener('scroll', () => {
  if (!scheduled) { scheduled = true; requestAnimationFrame(updateNavigation); }
}, {passive: true});
window.addEventListener('resize', updateNavigation);
updateNavigation();
