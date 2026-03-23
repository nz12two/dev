// ===== BUSCAR PROJETOS DO GITHUB =====
async function buscarProjetosGitHub() {
  const container = document.getElementById('projetos-caixa');
  const loading = document.getElementById('loading-projetos');
  const username = 'nz12two';

  if (!container || !loading) return;

  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=6`,
      {
        headers: {
          'Accept': 'application/vnd.github+json'
        }
      }
    );

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error('Limite da API do GitHub atingido');
      }
      throw new Error('Erro ao buscar projetos');
    }

    const repos = await response.json();

    loading.style.display = 'none';

    if (!repos.length) {
      container.innerHTML = `
        <div class="sem-projetos">
          <i class="fas fa-folder-open"></i>
          <p>Nenhum repositório público encontrado</p>
        </div>
      `;
      return;
    }

    container.innerHTML = '';

    repos.forEach(repo => {
      const linguagens = repo.language ? [repo.language] : ['Sem linguagem'];

      const card = document.createElement('div');
      card.className = 'projeto-card fade-in';

      card.innerHTML = `
        <div class="projeto-imagem-container">
          <img
            loading="lazy"
            src="https://opengraph.githubassets.com/1/${repo.full_name}"
            alt="${repo.name}"
            class="projeto-imagem"
            onerror="this.src='https://via.placeholder.com/400x200/1e293b/4f46e5?text=Projeto'"
          >

          <div class="projeto-overlay">
            <a href="${repo.html_url}" target="_blank" class="projeto-link" aria-label="Ver no GitHub">
              <i class="fab fa-github"></i>
            </a>
          </div>
        </div>

        <div class="projeto-info">
          <h3 class="projeto-titulo">${repo.name.replace(/-/g, ' ')}</h3>

          <p class="projeto-descricao">
            ${repo.description || 'Projeto desenvolvido e funcional.'}
          </p>

          <div class="projeto-tags">
            ${linguagens.map(lang => `<span>${lang}</span>`).join('')}
            ${repo.stargazers_count > 0 ? `<span>⭐ ${repo.stargazers_count}</span>` : ''}
            ${repo.forks_count > 0 ? `<span>🍴 ${repo.forks_count}</span>` : ''}
          </div>

          <div class="projeto-meta">
            <span>
              <i class="far fa-calendar-alt"></i>
              ${new Date(repo.updated_at).toLocaleDateString('pt-BR')}
            </span>

            ${repo.homepage ? `
              <a href="${repo.homepage}" target="_blank" class="projeto-btn">
                Ver Demo <i class="fas fa-external-link-alt"></i>
              </a>
            ` : ''}

            <a href="${repo.html_url}" target="_blank" class="projeto-btn">
              Ver Código <i class="fab fa-github"></i>
            </a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);

    loading.innerHTML = `
      <i class="fas fa-exclamation-triangle"></i>
      <p>Erro ao carregar projetos.</p>

      <button
        onclick="buscarProjetosGitHub()"
        class="btn btn-primary"
        style="margin-top:1rem"
      >
        <i class="fas fa-sync-alt"></i>
        Tentar novamente
      </button>
    `;
  }
}


// ===== MENU MOBILE =====
function configurarMenuMobile() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  if (!menuToggle || !menu) return;

  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
  });
}


// ===== FORMULÁRIO DE CONTATO =====
function configurarFormulario() {
  const metodoContato = document.getElementById('metodo-contato');
  const botaoContatar = document.getElementById('botao-contatar');
  const tipoMensagem = document.getElementById('tipo-mensagem');

  if (!metodoContato || !botaoContatar) return;

  function atualizarBotaoContato() {
    const metodo = metodoContato.value;

    const textos = {
      whatsapp: 'Conversar no WhatsApp',
      email: 'Enviar E-mail'
    };

    const icons = {
      whatsapp: 'fab fa-whatsapp',
      email: 'fas fa-envelope'
    };

    const btnText = botaoContatar.querySelector('.btn-text');
    const btnIcon = botaoContatar.querySelector('.btn-icon i');

    if (btnText) btnText.textContent = textos[metodo];
    if (btnIcon) btnIcon.className = icons[metodo];
  }

  function redirecionarContato() {
    const metodo = metodoContato.value;

    const tipoIndex = tipoMensagem
      ? tipoMensagem.selectedIndex
      : 0;

    const tipoTexto = tipoMensagem
      ? tipoMensagem.options[tipoIndex].text
      : 'Orçamento de Projeto';

    const mensagem = `Olá NZ! Gostaria de conversar sobre: ${tipoTexto}`;

    if (metodo === 'whatsapp') {
      const numero = '5571992227288';

      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

      window.open(url, '_blank');

    } else {
      const email = 'nzjr123@gmail.com';
      const assunto = `Contato via Portfólio - ${tipoTexto}`;
      const corpo = `${mensagem}`;


      const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${encodeURIComponent(assunto)}&body=${encodeURIComponent(corpo)}`;


      window.open(url, '_blank');
    }
  }

  metodoContato.addEventListener('change', atualizarBotaoContato);
  botaoContatar.addEventListener('click', redirecionarContato);

  atualizarBotaoContato();
}


// ===== CONTADOR ANIMADO =====
let contadorExecutado = false;

function animateCounter() {
  if (contadorExecutado) return;
  contadorExecutado = true;
  const counters = document.querySelectorAll('.stat-number');
  counters.forEach(counter => {
    const target = +counter.getAttribute('data-count');
    let count = 0;
    const increment = target / 100;
    const update = () => {
      count += increment;
      if (count < target) {
        counter.innerText = Math.ceil(count);
        requestAnimationFrame(update);
      } else {
        counter.innerText = target;
      }
    };

    update();
  });
}


// ===== OBSERVER PARA ANIMAÇÕES =====
function configurarObserver() {
  const elementos = document.querySelectorAll(
    `
    .projeto-card,
    .servico-card,
    .diferencial-item,
    .processo-item,
    .depoimento-card,
    .faq-item,
    .contato-link,
    .sobre-stats
    `
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        if (entry.target.classList.contains('sobre-stats')) {
          animateCounter();
        }
        entry.target.classList.add('animate');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  elementos.forEach(el => {
    el.style.transitionDelay = '0s';
    observer.observe(el);
  });
}


// ===== BOTÃO VOLTAR AO TOPO =====
function configurarBackToTop() {
  const backToTop = document.getElementById('back-to-top');

  if (!backToTop) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}


// ===== SCROLL SUAVE =====
function configurarScrollSuave() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });

      const menu = document.querySelector('.menu');
      if (menu) menu.classList.remove('active');
    });
  });
}

// ===== FAQ ACCORDION =====
function configurarFAQ() {
  const itens = document.querySelectorAll('.faq-item');

  itens.forEach(item => {
    const pergunta = item.querySelector('.faq-pergunta');
    pergunta.addEventListener('click', () => {
      const ativo = item.classList.contains('active');
      itens.forEach(i => i.classList.remove('active'));
      if (!ativo) {
        item.classList.add('active');
      }

    });
  });
}

// ===== TOOLTIP =====
function configurarTooltips() {
  document.querySelectorAll('[data-tooltip]').forEach(element => {
    let tooltip = null;
    element.addEventListener('mouseenter', function () {
      tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.textContent = this.getAttribute('data-tooltip');
      document.body.appendChild(tooltip);
      const rect = this.getBoundingClientRect();
      tooltip.style.top =
        rect.top - tooltip.offsetHeight - 10 + window.scrollY + 'px';
      tooltip.style.left =
        rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';

    });

    element.addEventListener('mouseleave', function () {

      if (tooltip) {
        tooltip.remove();
        tooltip = null;
      }

    });
  });
}


// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  buscarProjetosGitHub();
  configurarMenuMobile();
  configurarFormulario();
  configurarObserver();
  configurarBackToTop();
  configurarScrollSuave();
  configurarTooltips();
  configurarFAQ();
});
