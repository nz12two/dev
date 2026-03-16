// Inicializa tudo
document.addEventListener("DOMContentLoaded", () => {
  initTyping();
  initParticles();
  initProjects();
  initSectionsObserver();
  initTerminal();
  initSmoothScroll();
  initMouseParallax();
  initCardGlow();
  enhanceTyping();
  createWaveEffect();
  initTextReveal();
  initGlowScroll();
});

// Typing effect
function initTyping() {
  const el = document.querySelector(".typing");
  if (!el) return;
  const words = ["Discord Bot Builder", "Minecraft Systems", "Automation & Tools", "Web Interfaces", "Backend Developer"];
  let i = 0, j = 0, deleting = false;

  function type() {
    let word = words[i];
    if (deleting) {
      j--;
      el.textContent = word.substring(0, j);
    } else {
      j++;
      el.textContent = word.substring(0, j);
    }

    let speed = deleting ? 50 : 100;

    if (!deleting && j === word.length) {
      deleting = true;
      speed = 2000;
    } else if (deleting && j === 0) {
      deleting = false;
      i = (i + 1) % words.length;
      speed = 500;
    }

    setTimeout(type, speed);
  }

  type();
}

// Particles.js
function initParticles() {
  if (typeof particlesJS === 'undefined') return;

  particlesJS("particles-js", {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 800 } },
      color: { value: "#4da6ff" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1 } },
      size: { value: 3, random: true, anim: { enable: true, speed: 2, size_min: 0.1 } },
      line_linked: { enable: true, distance: 150, color: "#4da6ff", opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1, random: true, straight: false, out_mode: "bounce" }
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" }
      },
      modes: {
        grab: { distance: 200, line_linked: { opacity: 0.5 } },
        bubble: { distance: 200, size: 6, duration: 0.3, opacity: 0.5 },
        push: { particles_nb: 3 }
      }
    },
    retina_detect: true
  });

  window.addEventListener('scroll', () => {
    document.getElementById('particles-js').style.transform = `translateY(${window.scrollY * 0.03}px)`;
  });
}

// GitHub Projects
async function initProjects() {
  const container = document.getElementById("github-projects");
  if (!container) return;

  const username = "nz12two";

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error(res.status);

    const repos = await res.json();
    container.innerHTML = "";

    repos.forEach(r => {
      const card = document.createElement("div");
      card.className = "card";
      const imgUrl = `https://opengraph.githubassets.com/1/${username}/${r.name}`;

      card.innerHTML = `
        <img src="${imgUrl}" alt="${r.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(r.name)}'">
        <h3>${r.name}</h3>
        <p>${r.description || "Projeto disponível no GitHub"}</p>
        <a href="${r.html_url}" target="_blank"><i class="fab fa-github"></i> Ver Projeto</a>
      `;

      card.addEventListener('click', e => {
        if (!e.target.closest('a')) window.open(r.html_url, '_blank');
      });

      container.appendChild(card);
    });
  } catch (e) {
    console.error(e);
    container.innerHTML = "<p>Erro ao carregar projetos.</p>";
  }
}

// Sections Observer
function initSectionsObserver() {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("show");
    });
  }, { threshold: 0.2 });

  sections.forEach(s => observer.observe(s));
}

// Smooth Scroll
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// Terminal
function initTerminal() {
  const input = document.getElementById("terminal-command");
  const output = document.getElementById("terminal-output");

  if (!input || !output) return;

  const cmds = {
    help: `help → comandos disponíveis
    about → sobre mim
    skills → tecnologias
    projects → projetos
    github → GitHub
    contato → contato
    whoami → quem sou eu
    clear → limpa terminal`,
    about: "Desenvolvedor focado em automação, bots e Minecraft. Sempre aprendendo novas tecnologias.",
    skills: "Python, JS/Node.js, HTML, CSS, Banco de Dados, Discord Bots, Minecraft Systems, Git & Linux",
    projects: "Discord Bots, Sistemas Minecraft, APIs REST, Dashboards interativos",
    github: "https://github.com/nz12two",
    contato: "Email: nzjr123@gmail.com | GitHub: @nz12two",
    whoami: "> NZ - Desenvolvedor Full Stack"
};

  input.addEventListener('keydown', e => {
    if (e.key !== "Enter") return;

    const cmd = input.value.toLowerCase().trim();
    if (!cmd) return;

    output.innerHTML += `<div style="color:#4da6ff;">$ ${input.value}</div>`;

    if (cmd === "clear") {
      output.innerHTML = "";
    } else {
      output.innerHTML += `<div>${cmds[cmd] || "Comando não encontrado. Digite 'help' para ver os comandos disponíveis."}</div>`;
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
  });
}

// Efeito de parallax suave no mouse
function initMouseParallax() {
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    const profileImg = document.querySelector('.profile-img');
    const heroTitle = document.querySelector('.hero h1');
    const particles = document.getElementById('particles-js');

    if (profileImg) {
      profileImg.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
    }

    if (heroTitle) {
      heroTitle.style.transform = `translate(${mouseX * 8}px, ${mouseY * 8}px)`;
    }

    if (particles) {
      particles.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// Efeito de brilho nos cards ao passar o mouse
function initCardGlow() {
  const cards = document.querySelectorAll('.card, .stack div');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const angleX = (y - centerY) / 25;
      const angleY = (centerX - x) / 25;

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });
}

// Efeito de digitação com cursor mais elaborado
function enhanceTyping() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '1' ? '0.3' : '1';
  }, 500);
}

// Efeito de ondas no fundo (já implementado no CSS)
function createWaveEffect() {
  // Já implementado no CSS com #particles-js::after
}

// Efeito de revelação de texto nas seções
function initTextReveal() {
  const titles = document.querySelectorAll('section h2');

  titles.forEach(title => {
    const text = title.textContent;
    title.innerHTML = '';

    [...text].forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      span.style.display = 'inline-block';
      span.style.transition = `all 0.3s ease ${i * 0.05}s`;
      title.appendChild(span);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('span').forEach(span => {
            span.style.opacity = '1';
            span.style.transform = 'translateY(0)';
          });
        }
      });
    }, { threshold: 0.5 });

    observer.observe(title);
  });
}

// Efeito de brilho no scroll
function initGlowScroll() {
  const glow = document.getElementById('glowScroll');
  if (!glow) return;

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent > 5) {
      glow.classList.add('show');
      glow.style.background = `linear-gradient(90deg, 
        transparent, 
        var(--glow-color) ${scrollPercent}%, 
        var(--glow-color) ${scrollPercent + 10}%, 
        transparent)`;
    } else {
      glow.classList.remove('show');
    }
  });
}

// Efeito de loading suave para imagens
document.addEventListener('load', function (e) {
  if (e.target.tagName === 'IMG') {
    e.target.style.opacity = '1';
  }
}, true);

// Previne comportamento padrão de arrastar imagens
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});
