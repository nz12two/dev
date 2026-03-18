const SUPABASE_URL = 'https://rqvmuxepmtsyczoftgjo.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJxdm11eGVwbXRzeWN6b2Z0Z2pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3OTM2NjAsImV4cCI6MjA4OTM2OTY2MH0.TsAKLFNcc9-YlxHT4U7ReYBI3vJTfUsXp7_WAllsfLE';

let supabaseClient;
try {
  if (typeof supabase !== 'undefined') {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase inicializado com sucesso!');
  } else {
    console.warn('⚠️ Supabase library not loaded - leads não serão salvos');
    supabaseClient = null;
  }
} catch (e) {
  console.error('❌ Erro ao inicializar Supabase:', e);
  supabaseClient = null;
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
  preventImageDrag();
});

// ============================================
// SMART NAVBAR
// ============================================
function initSmartNavbar() {
  const nav = document.querySelector("nav");
  if (!nav) return;

  let lastScroll = 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
          nav.classList.remove("hide");
        } else if (currentScroll > lastScroll && currentScroll > 120) {
          nav.classList.add("hide");
        } else {
          nav.classList.remove("hide");
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTyping() {
  const el = document.querySelector(".typing");
  if (!el) return;
  
  const words = ["Discord Bot Builder", "Minecraft Systems", "Automation & Tools", "Web Interfaces", "Backend Developer"];
  let i = 0, j = 0, deleting = false;
  let timeout;

  function type() {
    const word = words[i];
    
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

    timeout = setTimeout(type, speed);
  }

  type();
}

// ============================================
// PARTICLES.JS
// ============================================
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
      move: { 
        enable: true, 
        speed: 1, 
        random: true, 
        straight: false, 
        out_mode: "bounce",
        attract: { enable: false }
      }
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
}

// ============================================
// GITHUB PROJECTS COM CACHE
// ============================================
async function initProjects() {
  const container = document.getElementById("github-projects");
  if (!container) return;

  const username = "nz12two";
  const CACHE_KEY = 'github_projects';
  const CACHE_TIME_KEY = 'github_projects_time';
  const CACHE_DURATION = 3600000;

  try {
    const cached = localStorage.getItem(CACHE_KEY);
    const cachedTime = localStorage.getItem(CACHE_TIME_KEY);
    
    if (cached && cachedTime && (Date.now() - parseInt(cachedTime) < CACHE_DURATION)) {
      renderProjects(JSON.parse(cached), container);
      return;
    }
  } catch (e) {
    console.warn('Erro ao ler cache:', e);
  }

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    
    const repos = await res.json();
    
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(repos));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.warn('Erro ao salvar cache:', e);
    }
    
    renderProjects(repos, container);
    
  } catch (e) {
    console.error('Erro ao carregar projetos:', e);
    container.innerHTML = "<p style='color: #ff4444; text-align: center;'>❌ Erro ao carregar projetos do GitHub</p>";
  }
}

function renderProjects(repos, container) {
  container.innerHTML = "";
  
  repos.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    
    const imgUrl = `https://opengraph.githubassets.com/1/${r.owner.login}/${r.name}`;
    const projectName = r.name;
    const description = r.description || "Projeto disponível no GitHub";
    const htmlUrl = r.html_url;
    
    card.innerHTML = `
      <img src="${imgUrl}" alt="${projectName}" 
        onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(projectName)}'">
      <h3>${projectName}</h3>
      <p>${description}</p>
      <a href="${htmlUrl}" target="_blank" rel="noopener">
        <i class="fab fa-github"></i> Ver Projeto
      </a>
    `;
    
    card.addEventListener('click', (e) => {
      if (!e.target.closest('a')) {
        window.open(htmlUrl, '_blank', 'noopener');
      }
    });
    
    container.appendChild(card);
  });
}

// ============================================
// SECTIONS OBSERVER
// ============================================
function initSectionsObserver() {
  const sections = document.querySelectorAll("section");
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
      }
    });
  }, { 
    threshold: 0.2,
    rootMargin: '0px'
  });

  sections.forEach(s => observer.observe(s));
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const href = a.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    });
  });
}

// ============================================
// TERMINAL
// ============================================
function initTerminal() {
  const input = document.getElementById("terminal-command");
  const output = document.getElementById("terminal-output");

  if (!input || !output) return;

  const commands = {
    help: `📋 COMANDOS DISPONÍVEIS:
  help     → mostra esta mensagem
  about    → sobre mim
  skills   → minhas tecnologias
  projects → meus projetos
  github   → link do GitHub
  contact  → informações de contato
  whoami   → quem sou eu
  clear    → limpa o terminal
  date     → mostra data e hora`,

    about: "👨‍💻 Desenvolvedor focado em automação, bots e Minecraft. Sempre aprendendo novas tecnologias e buscando soluções inovadoras.",
    
    skills: "🛠️ TECNOLOGIAS:\n  • Python\n  • JavaScript/Node.js\n  • HTML5/CSS3\n  • Banco de Dados (SQL/NoSQL)\n  • Discord Bots\n  • Minecraft Systems\n  • Git & Linux\n  • DevOps Básico",
    
    projects: "🚀 PROJETOS:\n  • Discord Bots\n  • Sistemas Minecraft\n  • APIs REST\n  • Dashboards interativos\n  • Automações diversas",
    
    github: "🔗 https://github.com/nz12two",
    
    contact: "📫 CONTATO:\n  • Email: nzjr123@gmail.com\n  • GitHub: @nz12two\n  • Discord: link na seção Contato\n  • WhatsApp: (71) 92227-288",
    
    whoami: "> NZ - Desenvolvedor Full Stack | Especialista em Automação",
    
    date: () => {
      const now = new Date();
      return `📅 ${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR')}`;
    }
  };

  input.addEventListener('keydown', (e) => {
    if (e.key !== "Enter") return;
    
    const cmd = input.value.trim().toLowerCase();
    if (!cmd) return;

    output.innerHTML += `<div style="color:#4da6ff; margin-top: 8px;">$ ${input.value}</div>`;

    if (cmd === "clear") {
      output.innerHTML = "";
    } else if (commands[cmd]) {
      const response = typeof commands[cmd] === 'function' ? commands[cmd]() : commands[cmd];
      output.innerHTML += `<div style="color:#fff; margin: 4px 0 8px 12px; white-space: pre-line;">${response}</div>`;
    } else {
      output.innerHTML += `<div style="color:#ff4444; margin: 4px 0 8px 12px;">❌ Comando não encontrado. Digite 'help' para ver os comandos disponíveis.</div>`;
    }

    input.value = "";
    output.scrollTop = output.scrollHeight;
  });
}

// ============================================
// MOUSE PARALLAX
// ============================================
function initMouseParallax() {
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let rafId = null;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  function animate() {
    mouseX += (targetX - mouseX) * 0.05;
    mouseY += (targetY - mouseY) * 0.05;

    const profileImg = document.querySelector('.profile-img');
    const heroTitle = document.querySelector('.hero h1');

    if (profileImg) {
      profileImg.style.transform = `translate(${mouseX * 15}px, ${mouseY * 15}px)`;
    }
    
    if (heroTitle) {
      heroTitle.style.transform = `translate(${mouseX * 8}px, ${mouseY * 8}px)`;
    }

    rafId = requestAnimationFrame(animate);
  }

  animate();
}

// ============================================
// CARD GLOW 3D EFFECT
// ============================================
function initCardGlow() {
  const cards = document.querySelectorAll('.card, .stack div');

  cards.forEach(card => {
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let rafId = null;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      targetX = (y - centerY) / 20;
      targetY = (centerX - x) / 20;
    });

    card.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    });

    function animate() {
      mouseX += (targetX - mouseX) * 0.1;
      mouseY += (targetY - mouseY) * 0.1;
      
      card.style.transform = `perspective(1000px) rotateX(${mouseX}deg) rotateY(${mouseY}deg) scale3d(1.02,1.02,1.02)`;
      
      rafId = requestAnimationFrame(animate);
    }

    animate();
  });
}

// ============================================
// CURSOR EFFECT
// ============================================
function enhanceTyping() {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  let visible = true;
  setInterval(() => {
    visible = !visible;
    cursor.style.opacity = visible ? '1' : '0.3';
  }, 500);
}

// ============================================
// GLOW SCROLL EFFECT
// ============================================
function initGlowScroll() {
  const glow = document.getElementById('glowScroll');
  if (!glow) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent > 5) {
          glow.classList.add('show');
          glow.style.background = `linear-gradient(90deg, transparent, var(--glow-color) ${scrollPercent}%, var(--glow-color) ${scrollPercent + 10}%, transparent)`;
        } else {
          glow.classList.remove('show');
        }
        
        ticking = false;
      });
      ticking = true;
    }
  });
}

// ============================================
// PREVENT IMAGE DRAG
// ============================================
function preventImageDrag() {
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

// ============================================
// CHAT BOT 
// ============================================
function initChatBot() {
  const btn = document.getElementById("open-chat");
  const chat = document.getElementById("chat-bot");
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");
  const closeBtn = document.getElementById("close-chat");
  const sendBtn = document.getElementById("chat-send");

  if (!btn || !chat || !input || !messages) return;

  let sessionId = localStorage.getItem('chat_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID ? crypto.randomUUID() : 'session-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chat_session_id', sessionId);
  }

  btn.onclick = () => {
    chat.style.display = "flex";
    input.focus();
  };

  if (closeBtn) {
    closeBtn.onclick = () => {
      chat.style.display = "none";
    };
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function addMessage(text, fromAI = true) {
    const wrapper = document.createElement("div");
    wrapper.className = `message-wrapper ${fromAI ? 'bot' : 'user'}`;
    
    const time = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    const escapedText = escapeHtml(text);
    
    if (fromAI) {
      wrapper.innerHTML = `
        <div class="bot-avatar-small">NZ</div>
        <div class="message-content">
          <div class="bot-name-tag">NZ Assistant</div>
          <div class="message-bubble" style="word-break: break-word; white-space: pre-wrap;">${escapedText}</div>
          <div class="message-time">${time}</div>
        </div>
      `;
    } else {
      wrapper.innerHTML = `
        <div class="message-content">
          <div class="message-bubble" style="word-break: break-word; white-space: pre-wrap;">${escapedText}</div>
          <div class="message-time">${time}</div>
        </div>
      `;
    }
    
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTypingIndicator() {
    const wrapper = document.createElement("div");
    wrapper.className = "message-wrapper bot";
    wrapper.id = "typing-indicator";
    
    wrapper.innerHTML = `
      <div class="bot-avatar-small">NZ</div>
      <div class="message-content">
        <div class="bot-name-tag">NZ Assistant</div>
        <div class="typing-indicator">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = document.getElementById("typing-indicator");
    if (indicator) {
      indicator.remove();
    }
  }

  function showSaveNotification(message, isSuccess = true) {
    const notification = document.createElement('div');
    notification.className = 'save-notification';
    notification.innerHTML = `<i class="fas ${isSuccess ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 3000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function isValidPhone(phone) {
    return /^\(?[1-9]{2}\)? ?9?[0-9]{4}-?[0-9]{4}$/.test(phone.replace(/\D/g, ''));
  }

  let conversationHistory = [];

  setTimeout(async () => {
    showTypingIndicator();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      const res = await fetch("https://rqvmuxepmtsyczoftgjo.supabase.co/functions/v1/chat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          message: "INICIAR_CONVERSA",
          history: [],
          session_id: sessionId,
          user_agent: navigator.userAgent
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      removeTypingIndicator();

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result = await res.json();
      const botReply = result.reply || "Olá! Sou o assistente do NZ. Como posso te ajudar hoje? 😊";
      
      addMessage(botReply, true);
      conversationHistory.push({ role: "assistant", content: botReply });

    } catch (err) {
      console.error("Erro ao iniciar chat:", err);
      removeTypingIndicator();
      addMessage("Olá! Sou o assistente do NZ. Como posso te ajudar hoje? 😊", true);
    }
  }, 500);

  async function sendMessage() {
    const value = input.value.trim();
    if (!value) return;

    input.value = "";
    addMessage(value, false);
    conversationHistory.push({ role: "user", content: value });
    
    showTypingIndicator();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 20000);

    try {
      const res = await fetch("https://rqvmuxepmtsyczoftgjo.supabase.co/functions/v1/chat-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${SUPABASE_ANON_KEY}`
        },
        body: JSON.stringify({
          message: value,
          history: conversationHistory,
          session_id: sessionId,
          user_agent: navigator.userAgent
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      removeTypingIndicator();

      if (res.status === 429) {
        addMessage("⚠️ Muitas requisições. Aguarde um momento antes de enviar nova mensagem.", true);
        return;
      }

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const result = await res.json();
      const botReply = result.reply || "Desculpe, não consegui processar sua solicitação.";
      
      addMessage(botReply, true);
      conversationHistory.push({ role: "assistant", content: botReply });

      if (result.is_lead || result.should_save) {
        await saveLead(result, value);
      }

    } catch (err) {
      clearTimeout(timeoutId);
      removeTypingIndicator();
      
      if (err.name === 'AbortError') {
        addMessage("⏰ A resposta está demorando. Por favor, tente novamente ou chame NZ no WhatsApp (71) 92227-288", true);
      } else {
        addMessage("❌ Houve um erro ao se conectar. Por favor, tente novamente ou contato direto: (71) 92227-288", true);
      }
    }
  }

  async function saveLead(result, lastMessage) {
    if (!supabaseClient) {
      console.warn('Supabase não disponível - lead não salvo');
      return;
    }

    try {
      const leadData = {
        session_id: sessionId,
        name: result.extracted_name || null,
        email: result.extracted_email || null,
        phone: result.extracted_phone || null,
        service_interest: result.service_interest || result.extracted_service || null,
        estimated_price: result.estimated_price || null,
        first_interaction: new Date(),
        last_interaction: new Date(),
        interaction_count: 1,
        status: result.red_flag ? 'red_flag' : 'new',
        source: 'chat',
        notes: `Conversa: ${conversationHistory.length} mensagens`
      };

      if (leadData.email && !isValidEmail(leadData.email)) {
        console.warn('Email inválido, não salvando');
        return;
      }

      if (leadData.phone && !isValidPhone(leadData.phone)) {
        console.warn('Telefone inválido, não salvando');
        return;
      }

      let existingLead = null;
      
      if (leadData.email) {
        const { data } = await supabaseClient
          .from('leads')
          .select('id, interaction_count')
          .eq('email', leadData.email)
          .maybeSingle();
        
        existingLead = data;
      }

      if (existingLead) {
        const { error } = await supabaseClient
          .from('leads')
          .update({
            last_interaction: new Date(),
            interaction_count: existingLead.interaction_count + 1,
            last_message: lastMessage,
            session_id: sessionId,
            phone: leadData.phone || undefined,
            service_interest: leadData.service_interest || undefined
          })
          .eq('id', existingLead.id);

        if (error) throw error;
        
        console.log("✅ Lead atualizado!");
        showSaveNotification('✅ Informações atualizadas!', true);
        
      } else {
        const { error } = await supabaseClient
          .from('leads')
          .insert([leadData]);

        if (error) throw error;
        
        console.log("✅ Novo lead salvo!");
        showSaveNotification('✅ Informações salvas! Entraremos em contato.', true);
      }

    } catch (err) {
      console.error("Erro ao salvar lead:", err);
      showSaveNotification('❌ Erro ao salvar informações', false);
    }
  }

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener("click", sendMessage);
  }
}
