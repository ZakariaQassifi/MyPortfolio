/* 
   PROJECT DATA
 */
const PROJECTS = {
  cpp: {
    icon: "C++",
    title: "Programmation Objet — C++ (Pr.i.Bakkouri)",
    subtitle: "C++ · Qt · Artificial Intelligence",
    overview: {
      heading: "About this project",
      desc: "A series of practical lab reports (TDs/TPs) covering object-oriented programming in C++, including inheritance, polymorphism, templates, and Qt UI development. Also includes an AI sub-project: an Intelligent Planning Assistant that organises and prioritises tasks using heuristic algorithms.",
      tags: ["C++", "Qt", "OOP", "Inheritance", "Templates", "AI", "Planning"],
      demo: ""
    },
    pdfs: [
      { label: "Rapport de TD", url: "https://drive.google.com/file/d/1KMqZlRYrj1q-N9IYvZK58EQfQnZs9z5v/view?usp=sharing" },
      { label: "TP1 ", url: "https://drive.google.com/file/d/1hFuqoYmpJvZJj-ZxCT_NFyCZI9GFUmqo/view?usp=sharing" },
      { label: "TP2 ", url: "https://drive.google.com/file/d/154LH_vNg2TvWLVdiAzWIw3Eki_1GLHcw/view?usp=drive_link" },
      { label: "TP3 ", url: "https://drive.google.com/file/d/1wyDbxFoKZbkjpqYbj2NTnSB4ZVtPYO3V/view?usp=sharing" },
      { label: "TP4 ", url: "https://drive.google.com/file/d/1aQ5e5MKzykym1yy7lkBHqcqjlGS_Dj96/view?usp=drive_link" },
      { label: "TP5 ", url: "https://drive.google.com/file/d/1MVxm0rbfGFa7m8Pl0JMb9-_BfsmqLXTx/view?usp=drive_link" },
      { label: "TP6 ", url: "https://drive.google.com/file/d/1z8VyUjixyB9ykyN48gtmiUnvh9mr0KZf/view?usp=drive_link" },
      { label: "TP7 ", url: "https://drive.google.com/file/d/1OS0xtNCMbEjuevkgV6Y43o5VrQavQ1zK/view?usp=drive_link" },
      { label: "TP8 ", url: "https://drive.google.com/file/d/1lT9xsIayEO6oFHXzThAL7pYDW6upO0_R/view?usp=drive_link" },
      { label: "TP9 ", url: "https://drive.google.com/file/d/1X8FoOBsCNc3EaZqQhQXWPw88bkRZtZg2/view?usp=drive_link" },
      { label: "PROJET ", url: "https://drive.google.com/file/d/1X8FoOBsCNc3EaZqQhQXWPw88bkRZtZg2/view?usp=drive_link" },
      // { label: "projet", url: "" },
    ]
  },

  // ADD MORE PROJECTS HERE 
  // web: {
  //   icon: "🌐",
  //   title: "competetion projet",
  //   subtitle: "HTML · CSS · JavaScript",
  //   overview: {
  //     heading: "About this project",
  //     desc: "Description of project.",
  //     tags: ["HTML", "CSS", "JavaScript"],
  //     github: "https://github.com/ZakariaQassifi/repo",
  //     demo: "https://your-demo-link.com"
  //   },
  //   pdfs: [
  //     { label: "Report", url: "https://drive.google.com/file/d/YOUR_ID/view?usp=sharing" },
  //   ]
  // },
  // ────────────────────────────────────────────────────────────
};

//Modal state
let activeProject = null;

function openModal(key, tab = 'overview') {
  const p = PROJECTS[key];
  if (!p) return;
  activeProject = key;

  // Header
  document.getElementById('modalIcon').textContent = p.icon;
  document.getElementById('modalTitle').textContent = p.title;
  document.getElementById('modalSubtitle').textContent = p.subtitle;

  // Overview tab
  document.getElementById('ov-title').textContent = p.overview.heading;
  document.getElementById('ov-desc').textContent = p.overview.desc;
  document.getElementById('ov-tags').innerHTML = p.overview.tags
    .map(t => `<span class="card-tag">${t}</span>`).join('');

  const linksEl = document.getElementById('ov-links');
  linksEl.innerHTML = '';
  if (p.overview.github && p.overview.github !== '#')
    linksEl.innerHTML += `<a href="${p.overview.github}" target="_blank" class="btn btn-primary" style="font-size:.85rem;padding:10px 22px">GitHub →</a>`;
  if (p.overview.demo && p.overview.demo !== '#')
    linksEl.innerHTML += `<a href="${p.overview.demo}" target="_blank" class="btn btn-outline" style="font-size:.85rem;padding:10px 22px">Live Demo →</a>`;

  // Reports tab & rebuild buttons
  const toolbar = document.getElementById('pdfToolbar');
  while (toolbar.children.length > 1) toolbar.removeChild(toolbar.lastChild);

  const empty   = document.getElementById('pdfEmpty');
  const emptyMsg = document.getElementById('pdfEmptyMsg');
  const card    = document.getElementById('pdfCard');
  card.style.display = 'none';

  if (p.pdfs.length === 0) {
    empty.style.display = 'flex';
    emptyMsg.innerHTML = 'No reports added yet.<br>Edit <code>script.js</code> to add Drive links.';
  } else {
    empty.style.display = 'none';
    p.pdfs.forEach((pdf, i) => {
      const btn = document.createElement('button');
      btn.className = 'pdf-btn' + (i === 0 ? ' active' : '');
      btn.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
        </svg>${pdf.label}`;
      btn.onclick = () => loadPDF(pdf.url, pdf.label, btn);
      toolbar.appendChild(btn);
    });
    loadPDF(p.pdfs[0].url, p.pdfs[0].label, toolbar.querySelectorAll('.pdf-btn')[0]);
  }

  // Show modal
  document.getElementById('modalBackdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  switchTab(tab);
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function handleBackdropClick(e) {
  if (e.target === document.getElementById('modalBackdrop')) closeModal();
}

function switchTab(name) {
  document.querySelectorAll('.modal-tab').forEach(t =>
    t.classList.toggle('active', t.dataset.tab === name));
  document.querySelectorAll('.tab-panel').forEach(p =>
    p.classList.toggle('active', p.id === 'tab-' + name));
}

function loadPDF(url, label, clickedBtn) {
  document.querySelectorAll('.pdf-btn').forEach(b => b.classList.remove('active'));
  clickedBtn.classList.add('active');
  document.getElementById('pdfEmpty').style.display = 'none';
  const card = document.getElementById('pdfCard');
  card.style.display = 'flex';
  document.getElementById('pdfCardName').textContent = label;
  document.getElementById('pdfOpenBtn').href = url;
}

// Close on Escape key
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

//Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Contact form
function handleSubmit(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#2a52a0';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    e.target.reset();
  }, 3000);
}
