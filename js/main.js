const API_BASE = window.API_BASE_URL.replace(/\/$/, "");

const fallbackData = {
  profile: {
    name: "Mpiga M Muhamali",
    nationality: "Tanzanian",
    homePlace: "Geita, Tanzania",
    currentPlace: "Dar es Salaam, Tanzania",
    phone: "+255622079463",
    email: "mpigamuhamali255@gmail.com",
    languages: ["Swahili", "English"],
    title: "Data Science Student & Analyst",
    summary:
      "Tanzanian data science student passionate about data analysis, GIS, and building practical solutions for real-world problems.",
  },
  skills: {
    core: [
      "Data Analysis using Excel and Python",
      "Web Development",
      "Spatial Data Analysis in QGIS",
      "Communication and Collaboration / Teamwork",
    ],
    tools: ["Python", "SQL", "Excel", "QGIS", "R", "Stata"],
  },
  qualifications: [
    {
      title: "Certificate of Secondary Education (CSEE)",
      institution: "Masumbwe Secondary School",
      year: "2019",
    },
    {
      title: "Advanced Certificate of Secondary Education (ACSEE)",
      institution: "Mwakaleli Secondary School",
      year: "2022",
    },
    {
      title: "Bachelor of Science in Data Science",
      institution: "Currently pursuing",
      year: "In progress",
      status: "current",
    },
  ],
  projects: [
    {
      title: "Field Management System",
      organization: "Kinondoni Municipal Council",
      description:
        "Developed and supported a field management system to track municipal field activities, improve data collection workflows, and support operational reporting.",
      tags: ["Data Systems", "Municipal Operations", "Reporting"],
    },
    {
      title: "Spatial Mapping & Geographical Data Analysis",
      organization: "GIS Project",
      description:
        "Performed spatial mapping and geographical data analysis using QGIS to visualize patterns, support planning decisions, and communicate location-based insights.",
      tags: ["QGIS", "Spatial Analysis", "Mapping"],
    },
    {
      title: "Database Management Practice Project",
      organization: "Academic / Practice",
      description:
        "Designed relational database schemas, wrote SQL queries, and practiced data storage, retrieval, and integrity for structured datasets.",
      tags: ["SQL", "Databases", "Data Modeling"],
    },
    {
      title: "Exploratory Data Analysis with Python",
      organization: "Data Science Practice",
      description:
        "Cleaned, explored, and visualized datasets using Python (pandas, matplotlib) to identify trends, outliers, and actionable insights.",
      tags: ["Python", "EDA", "Visualization"],
    },
    {
      title: "Excel Dashboard for Business Metrics",
      organization: "Data Analysis",
      description:
        "Built Excel dashboards with pivot tables and charts to summarize KPIs and support decision-making for stakeholders.",
      tags: ["Excel", "Dashboards", "Analytics"],
    },
    {
      title: "Statistical Analysis with R & Stata",
      organization: "Academic Research",
      description:
        "Applied statistical methods in R and Stata for hypothesis testing, regression analysis, and research reporting.",
      tags: ["R", "Stata", "Statistics"],
    },
  ],
  contact: {
    currentPlace: "Dar es Salaam, Tanzania",
    phone: "+255622079463",
    email: "mpigamuhamali255@gmail.com",
  },
};

async function fetchJson(path) {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

async function loadPortfolio() {
  const statusEl = document.getElementById("api-status");
  let data = fallbackData;

  try {
    data = await fetchJson("/api/portfolio");
    statusEl.textContent = "Portfolio data loaded from cloud API.";
    statusEl.style.color = "var(--success)";
  } catch {
    statusEl.textContent = "Showing local data (connect API after Render deployment).";
  }

  renderProfile(data.profile);
  renderSkills(data.skills);
  renderQualifications(data.qualifications);
  renderProjects(data.projects);
  renderContact(data.contact);

  initScrollReveal();
  observeProjectCards();
}

function renderProfile(profile) {
  document.getElementById("profile-name").textContent = profile.name;
  document.getElementById("profile-title").textContent = profile.title;
  document.getElementById("profile-summary").textContent = profile.summary;

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const avatar = document.querySelector(".avatar");
  if (avatar) avatar.textContent = initials;

  const details = document.getElementById("profile-details");
  details.innerHTML = `
    <div><dt>Nationality</dt><dd>${profile.nationality}</dd></div>
    <div><dt>Home place</dt><dd>${profile.homePlace}</dd></div>
    <div><dt>Current place</dt><dd>${profile.currentPlace}</dd></div>
    <div><dt>Phone</dt><dd><a href="tel:${profile.phone.replace(/\s/g, "")}">${profile.phone}</a></dd></div>
    <div><dt>Email</dt><dd><a href="mailto:${profile.email}">${profile.email}</a></dd></div>
    <div><dt>Languages</dt><dd>${profile.languages.join(", ")}</dd></div>
  `;
}

function renderSkills(skills) {
  const coreList = document.getElementById("core-skills");
  coreList.innerHTML = skills.core.map((s) => `<li>${s}</li>`).join("");

  const tools = document.getElementById("tool-tags");
  tools.innerHTML = skills.tools
    .map(
      (t, i) =>
        `<span class="tool-tag" style="animation-delay: ${i * 0.08}s">${t}</span>`
    )
    .join("");
}

function renderQualifications(items) {
  const list = document.getElementById("qualifications-list");
  list.innerHTML = items
    .map(
      (q) => `
    <li class="${q.status === "current" ? "current" : ""}">
      <h3>${q.title}</h3>
      <p class="meta">${q.institution}</p>
      <span class="year-badge">${q.year}</span>
    </li>
  `
    )
    .join("");
}

function renderProjects(projects) {
  const grid = document.getElementById("projects-grid");
  grid.innerHTML = projects
    .map(
      (p, i) => `
    <article class="project-card" style="transition-delay: ${i * 0.08}s">
      <span class="card-number">${String(i + 1).padStart(2, "0")}</span>
      <h3>${p.title}</h3>
      <p class="org">${p.organization}</p>
      <p>${p.description}</p>
      <div class="project-tags">
        ${(p.tags || []).map((t) => `<span>${t}</span>`).join("")}
      </div>
    </article>
  `
    )
    .join("");
}

function renderContact(contact) {
  const info = document.getElementById("contact-info");
  info.innerHTML = `
    <div class="contact-item">
      <span class="label">Location</span>
      <p>${contact.currentPlace}</p>
    </div>
    <div class="contact-item">
      <span class="label">Phone</span>
      <p><a href="tel:${contact.phone.replace(/\s/g, "")}">${contact.phone}</a></p>
    </div>
    <div class="contact-item">
      <span class="label">Email</span>
      <p><a href="mailto:${contact.email}">${contact.email}</a></p>
    </div>
  `;
}

function initScrollReveal() {
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  reveals.forEach((el) => observer.observe(el));

  const timeline = document.querySelector(".timeline");
  if (timeline) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    timelineObserver.observe(timeline);
  }
}

function observeProjectCards() {
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  cards.forEach((card) => observer.observe(card));
}

function setupScrollProgress() {
  const bar = document.getElementById("scroll-progress");
  const header = document.querySelector(".site-header");
  const backToTop = document.getElementById("back-to-top");

  window.addEventListener(
    "scroll",
    () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

      bar.style.width = `${progress}%`;

      if (scrollTop > 60) {
        header.classList.add("scrolled");
        backToTop.classList.add("visible");
      } else {
        header.classList.remove("scrolled");
        backToTop.classList.remove("visible");
      }
    },
    { passive: true }
  );
}

function setupActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll("[data-nav]");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: "-20% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

function setupNav() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    toggle.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", open);
  });

  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    status.className = "form-status";
    submitBtn.disabled = true;

    const payload = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");

      status.textContent = data.message;
      status.className = "form-status success";
      form.reset();
    } catch {
      status.textContent =
        "Message saved locally. Deploy the backend on Render to enable API submission.";
      status.className = "form-status error";
    } finally {
      submitBtn.disabled = false;
    }
  });
}

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll(".reveal").forEach((el) => {
  if (el.closest(".hero")) el.classList.add("visible");
});

setupNav();
setupScrollProgress();
setupActiveNav();
setupContactForm();
loadPortfolio();
