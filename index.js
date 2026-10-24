import { bio, skills, experience, education, featuredProjects, socialLinks } from './user-data/data.js';
import { organizations, educationOrganizations, projectPresentation } from './user-data/presentation.js';

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
const brandIcons = {"LinkedIn": "<svg class=\"social-icon\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 448 512\"><path d=\"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z\"/></svg>", "GitHub": "<svg class=\"social-icon\" aria-hidden=\"true\" focusable=\"false\" xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 496 512\"><path d=\"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z\"/></svg>"};
const addBrandIcon = (link, platform) => {
  if (brandIcons[platform]) link.insertAdjacentHTML("afterbegin", brandIcons[platform]);
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
  const link = externalLink(item.url, '', item.platform);
  link.dataset.platform = item.platform;
  addBrandIcon(link, item.platform);
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
    image.width = organization.emblem ? 156 : 200;
    image.height = organization.emblem ? 156 : 70;
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
    image.width = 640;
    image.height = 400;
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
    card.addEventListener('click', event => {
      if (!event.target.closest('a, button')) openProject(project, titleButton);
    });
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
  const meta = element('div', 'education-meta');
  meta.append(element('p', 'period', item.duration));
  const organization = educationOrganizations[item.subtitle];
  if (organization) {
    const logo = element('div', 'education-logo' + (organization.emblem ? ' emblem' : '') + (organization.wordmark ? ' wordmark' : ''));
    const image = element('img');
    image.src = organization.logo;
    image.alt = organization.alt;
    image.loading = 'lazy';
    image.width = organization.emblem ? 100 : 140;
    image.height = 100;
    if (organization.darkLogo) {
      logo.classList.add('theme-aware-logo');
      image.className = 'logo-light';
      const darkImage = image.cloneNode();
      darkImage.src = organization.darkLogo;
      darkImage.className = 'logo-dark';
      logo.append(image, darkImage);
    } else {
      logo.append(image);
    }
    meta.append(logo);
  }
  row.append(meta, body);
  select('#education-list').append(row);
});
document.querySelectorAll('.contact-links a, #modal-github').forEach(link => {
  addBrandIcon(link, link.id === 'modal-github' || link.textContent.includes('GitHub') ? 'GitHub' : 'LinkedIn');
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
