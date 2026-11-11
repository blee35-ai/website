/* =========================================================
   Project data — edit this list to change the Work section
   - category: branding | uiux | editorial | illustration
   - image: "images/filename.jpg" (leave empty to show a color placeholder)
   ========================================================= */
const projects = [
  {
    title: "Bloom Coffee",
    category: "branding",
    year: "2026",
    role: "Brand Identity, Packaging",
    client: "Bloom Coffee Roasters",
    color: "#c8553d",
    image: "",
    description:
      "An identity refresh for a local specialty coffee brand. I turned each bean's origin and flavor notes into a color system, then extended it to packaging and in-store signage.",
  },
  {
    title: "Mono Banking App",
    category: "uiux",
    year: "2026",
    role: "UX Research, UI Design",
    client: "Personal Project",
    color: "#2f4858",
    image: "",
    description:
      "A minimal banking app for users in their twenties. Based on user interviews, I cut the transfer flow from five steps to two and built a supporting design system.",
  },
  {
    title: "Seoul Archive",
    category: "editorial",
    year: "2025",
    role: "Editorial Design, Typography",
    client: "SVA Thesis",
    color: "#6b705c",
    image: "",
    description:
      "A 200-page archive book documenting Seoul's disappearing hand-painted signage. It explores grid systems and mixed Korean–English typesetting.",
  },
  {
    title: "Night Garden",
    category: "illustration",
    year: "2025",
    role: "Illustration, Motion",
    client: "Exhibition Poster Series",
    color: "#3d348b",
    image: "",
    description:
      "A poster series and short motion pieces for a night-time botanical garden exhibition, designed in a limited palette for fluorescent ink printing.",
  },
  {
    title: "Tidy Tasks",
    category: "uiux",
    year: "2025",
    role: "Product Design",
    client: "Startup Internship",
    color: "#e09f3e",
    image: "",
    description:
      "A dashboard redesign for a team collaboration tool. I restructured the information hierarchy and created a component library with dark mode and accessibility guidelines.",
  },
  {
    title: "Wave Festival",
    category: "branding",
    year: "2024",
    role: "Visual Identity, Motion",
    client: "Wave Music Festival",
    color: "#0f7173",
    image: "",
    description:
      "A flexible identity for a music festival. The logo, drawn from sound waveforms, changes shape with each lineup and time slot.",
  },
];

const categoryLabel = {
  branding: "Branding",
  uiux: "UI/UX",
  editorial: "Editorial",
  illustration: "Illustration",
};

/* ===== Helpers ===== */
const $ = (sel) => document.querySelector(sel);

function coverHTML(p) {
  return p.image
    ? `<img src="${p.image}" alt="${p.title}" loading="lazy" />`
    : `<div class="placeholder" style="background:${p.color}">${p.title}</div>`;
}

/* ===== Render project grid ===== */
const grid = $("#grid");

grid.innerHTML = projects
  .map(
    (p, i) => `
    <button class="card reveal" data-category="${p.category}" data-index="${i}">
      <div class="card-thumb">${coverHTML(p)}</div>
      <div class="card-info">
        <h3 class="card-title">${p.title}</h3>
        <span class="card-meta">${categoryLabel[p.category]} · ${p.year}</span>
      </div>
    </button>`
  )
  .join("");

/* ===== Filters ===== */
$("#filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter");
  if (!btn) return;

  document.querySelectorAll(".filter").forEach((b) => b.classList.toggle("active", b === btn));

  const filter = btn.dataset.filter;
  grid.querySelectorAll(".card").forEach((card) => {
    const show = filter === "all" || card.dataset.category === filter;
    card.classList.toggle("hidden", !show);
    if (show) card.classList.add("visible");
  });
});

/* ===== Modal ===== */
const modal = $("#modal");
let lastFocused = null;

function openModal(p) {
  lastFocused = document.activeElement;
  $("#modalCover").innerHTML = coverHTML(p);
  $("#modalMeta").textContent = `${categoryLabel[p.category]} — ${p.year}`;
  $("#modalTitle").textContent = p.title;
  $("#modalDesc").textContent = p.description;
  $("#modalInfo").innerHTML = `
    <div><dt>Client</dt><dd>${p.client}</dd></div>
    <div><dt>Role</dt><dd>${p.role}</dd></div>
    <div><dt>Year</dt><dd>${p.year}</dd></div>`;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  modal.querySelector(".modal-close").focus();
}

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lastFocused?.focus();
}

grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) openModal(projects[card.dataset.index]);
});

modal.addEventListener("click", (e) => {
  if (e.target.closest("[data-close]")) closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

/* ===== Mobile menu ===== */
const menuBtn = $("#menuBtn");
const nav = $("#nav");

menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
  document.body.classList.toggle("no-scroll", open);
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
    document.body.classList.remove("no-scroll");
  }
});

/* ===== Header style on scroll ===== */
const header = $("#header");
const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 20);
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ===== Scroll reveal ===== */
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        io.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

/* ===== Footer year ===== */
$("#year").textContent = new Date().getFullYear();
