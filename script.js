const SUPABASE_URL = 'https://rqvmuxepmtsyczoftgjo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_bxk18MgK8u8bZtnpuAohww_4QmCro2a';

let supabaseClient;
if (typeof supabase !== 'undefined') {
  supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  console.log('✅ Supabase inicializado com sucesso!');
} else {
  console.error('❌ Supabase library not loaded!');
}

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
  initGlowScroll();
  initSmartNavbar();
  initChatBot();
});

function initSmartNavbar() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      nav.classList.remove("hide");
      return;
    }

    if (currentScroll > lastScroll && currentScroll > 120) {
      nav.classList.add("hide");
    } else {
      nav.classList.remove("hide");
    }

    lastScroll = currentScroll;
  });
}

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
    const particles = document.getElementById('particles-js');
    if (particles) {
      particles.style.transform = `translateY(${window.scrollY * 0.03}px)`;
    }
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
        <img src="${imgUrl}" alt="${r.name}" 
        onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(r.name)}'">
        <h3>${r.name}</h3>
        <p>${r.description || "Projeto disponível no GitHub"}</p>
        <a href="${r.html_url}" target="_blank">
        <i class="fab fa-github"></i> Ver Projeto</a>
      `;

      card.addEventListener('click', e => {
        if (!e.target.closest('a'))
          window.open(r.html_url, '_blank');
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
      if (e.isIntersecting)
        e.target.classList.add("show");
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
      if (t)
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      output.innerHTML += `<div>${cmds[cmd] || "Comando não encontrado."}</div>`;
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
  });
}

// Parallax
function initMouseParallax() {
  let mouseX = 0, mouseY = 0, targetX = 0, targetY = 0;

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

    if (profileImg)
      profileImg.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
    if (heroTitle)
      heroTitle.style.transform = `translate(${mouseX * 8}px, ${mouseY * 8}px)`;
    if (particles)
      particles.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;

    requestAnimationFrame(animate);
  }

  animate();
}

// Card Glow
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

      card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02,1.02,1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1,1,1)';
    });
  });
}

// Cursor
function enhanceTyping() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  setInterval(() => {
    cursor.style.opacity = cursor.style.opacity === '1' ? '0.3' : '1';
  }, 500);
}

// Scroll Glow
function initGlowScroll() {
  const glow = document.getElementById('glowScroll');
  if (!glow) return;

  window.addEventListener('scroll', () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent > 5) {
      glow.classList.add('show');
      glow.style.background = `linear-gradient(90deg, transparent, var(--glow-color) ${scrollPercent}%, var(--glow-color) ${scrollPercent + 10}%, transparent)`;
    } else {
      glow.classList.remove('show');
    }
  });
}

// Evitar drag em imagens
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('dragstart', (e) => e.preventDefault());
});

// ============================================
// CHAT BOT FULL IA 
// ============================================
function initChatBot() {
  const btn = document.getElementById("open-chat");
  const chat = document.getElementById("chat-bot");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("chat-send");

  if (!btn || !chat || !input || !messages) return;

  // Abrir chat
  btn.onclick = () => {
    chat.style.display = "flex";
  };

  // Fechar chat
  if (closeBtn) {
    closeBtn.onclick = () => {
      chat.style.display = "none";
    };
  }

  // Função para adicionar mensagem
  function addMessage(text, fromAI = true) {
    const div = document.createElement("div");
    div.textContent = text;
    div.className = fromAI ? "chat-bot-msg" : "chat-user-msg";
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  // Função para mostrar "digitando..."
  function showTypingIndicator() {
    const indicator = document.createElement("div");
    indicator.className = "typing-indicator";
    indicator.id = "typing-indicator";
    indicator.innerHTML = "<span></span><span></span><span></span>";
    messages.appendChild(indicator);
    messages.scrollTop = messages.scrollHeight;
  }

  // Função para remover "digitando..."
  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  // Histórico da conversa para contexto
  let conversationHistory = [];

  // Mensagem inicial 
  setTimeout(async () => {
    showTypingIndicator();

    try {
      const res = await fetch("https://rqvmuxepmtsyczoftgjo.supabase.co/functions/v1/chat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          message: "INICIAR_CONVERSA",
          history: []
        })
      });

      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

      const result = await res.json();
      removeTypingIndicator();

      const botReply = result.reply || "Olá! Sou o assistente do NZ. Como posso te ajudar hoje? 😊";
      addMessage(botReply, true);

      // Salvar no histórico
      conversationHistory.push({ role: "assistant", content: botReply });

    } catch (err) {
      console.error("Erro ao iniciar chat:", err);
      removeTypingIndicator();
      addMessage("Olá! Sou o assistente do NZ. Como posso te ajudar hoje? 😊", true);
    }
  }, 500);

  // Função para enviar mensagem
  async function sendMessage() {
    const value = input.value.trim();
    if (!value) return;

    input.value = "";
    addMessage(value, false);

    // Adicionar ao histórico
    conversationHistory.push({ role: "user", content: value });

    // Mostrar indicador de digitação
    showTypingIndicator();

    try {
      const res = await fetch("https://rqvmuxepmtsyczoftgjo.supabase.co/functions/v1/chat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: value,
          history: conversationHistory // Envia histórico completo para contexto
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();

      // Remove indicador de digitação
      removeTypingIndicator();

      const botReply = result.reply || "Desculpe, não consegui processar sua solicitação.";
      addMessage(botReply, true);

      // Adicionar resposta da IA ao histórico
      conversationHistory.push({ role: "assistant", content: botReply });

      // Salvar no Supabase se for um orçamento (identificado pela IA)
      if (result.is_lead || result.should_save) {
        try {
          // Extrair informações da conversa (a IA pode estruturar isso)
          const { error } = await supabaseClient
            .from('orcamentos')
            .insert([
              {
                nome: result.extracted_name || "Não informado",
                email: result.extracted_email || "Não informado",
                tipo: result.extracted_service || "Não especificado",
                descricao: value,
                conversa: JSON.stringify(conversationHistory),
                status: 'novo',
                created_at: new Date()
              }
            ]);

          if (error) {
            console.error("Erro ao salvar no Supabase:", error);
          } else {
            console.log("✅ Lead salvo com sucesso!");
          }
        } catch (err) {
          console.error("Erro ao salvar orçamento:", err);
        }
      }

    } catch (err) {
      console.error("Erro no chat:", err);
      removeTypingIndicator();
      addMessage("Houve um erro ao se conectar. Por favor, tente novamente ou contato direto: (71) 92227-288", true);
    }
  }

  // Event listeners
  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }
}
