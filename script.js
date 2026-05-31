document.addEventListener('DOMContentLoaded', function () {

  // ===================================================================
  // CUSTOM CURSOR
  // ===================================================================
  var cursorGlow = document.querySelector('.cursor-glow')
  var cursorDot = document.querySelector('.cursor-dot')
  var cursorTrail = document.querySelector('.cursor-trail')
  var trailX = 0, trailY = 0
  var mouseX = 0, mouseY = 0

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX
    mouseY = e.clientY
    if (cursorGlow) {
      cursorGlow.style.left = mouseX + 'px'
      cursorGlow.style.top = mouseY + 'px'
    }
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px'
      cursorDot.style.top = mouseY + 'px'
    }
  })

  // Smooth trail following cursor
  function trailLoop() {
    trailX += (mouseX - trailX) * 0.08
    trailY += (mouseY - trailY) * 0.08
    if (cursorTrail) {
      cursorTrail.style.left = trailX + 'px'
      cursorTrail.style.top = trailY + 'px'
    }
    requestAnimationFrame(trailLoop)
  }
  trailLoop()

  // Hover effect on interactive elements
  var hoverTargets = document.querySelectorAll('a, button, .btn, .faq-q, .skill, .nav-link')
  hoverTargets.forEach(function (el) {
    el.addEventListener('mouseenter', function () {
      if (cursorDot) cursorDot.classList.add('hovering')
    })
    el.addEventListener('mouseleave', function () {
      if (cursorDot) cursorDot.classList.remove('hovering')
    })
  })

  // ===================================================================
  // NAV
  // ===================================================================
  var nav = document.querySelector('.nav')
  var navProgress = document.querySelector('.nav-progress')
  var navToggle = document.querySelector('.nav-toggle')
  var navMenu = document.querySelector('.nav-menu')
  var navLinks = document.querySelectorAll('.nav-link')

  window.addEventListener('scroll', function () {
    var y = window.scrollY
    if (nav) nav.classList.toggle('scrolled', y > 60)
    if (navProgress) {
      var max = document.documentElement.scrollHeight - window.innerHeight
      navProgress.style.width = (y / max) * 100 + '%'
    }
    var current = ''
    document.querySelectorAll('section[id]').forEach(function (sec) {
      if (y >= sec.offsetTop - 120) current = sec.id
    })
    navLinks.forEach(function (link) {
      if (link) link.classList.toggle('active', link.getAttribute('href') === '#' + current)
    })
  })

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active')
      navMenu.classList.toggle('active')
    })
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      if (navToggle) navToggle.classList.remove('active')
      if (navMenu) navMenu.classList.remove('active')
    })
  })

  // ===================================================================
  // TEXT SCRAMBLE EFFECT
  // ===================================================================
  function scrambleText(el) {
    if (!el) return
    var originalText = el.getAttribute('data-text') || el.textContent
    var chars = '!@#$%&?+*ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    var frame = 0
    var totalFrames = 20
    var interval = 50

    function shuffle() {
      var result = ''
      var progress = frame / totalFrames
      var revealCount = Math.floor(originalText.length * progress)

      for (var i = 0; i < originalText.length; i++) {
        if (i < revealCount) {
          result += originalText[i]
        } else if (originalText[i] === ' ') {
          result += ' '
        } else {
          result += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      el.textContent = result
      frame++

      if (frame <= totalFrames) {
        setTimeout(shuffle, interval - (frame * 1.5))
      } else {
        el.textContent = originalText
      }
    }

    shuffle()
  }

  // Scramble hero text on page load
  var scrambleEls = document.querySelectorAll('.scramble')
  scrambleEls.forEach(function (el) {
    setTimeout(function () { scrambleText(el) }, 300)
  })

  // Scramble section titles when they scroll into view
  var titleScrambled = {}
  var titleObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var scrambleTargets = entry.target.querySelectorAll('.gtext')
        scrambleTargets.forEach(function (el) {
          var key = el.textContent.trim()
          if (!titleScrambled[key]) {
            titleScrambled[key] = true
            scrambleText(el)
          }
        })
        titleObs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.3 })

  document.querySelectorAll('.sec-head').forEach(function (head) {
    titleObs.observe(head)
  })

  // ===================================================================
  // MAGNETIC BUTTONS
  // ===================================================================
  var magnetBtns = document.querySelectorAll('.magnet-btn')

  magnetBtns.forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect()
      var x = e.clientX - rect.left - rect.width / 2
      var y = e.clientY - rect.top - rect.height / 2
      var strength = parseInt(btn.getAttribute('data-strength')) || 10
      btn.style.transform = 'translate(' + (x / strength) + 'px, ' + (y / strength) + 'px)'
    })

    btn.addEventListener('mouseleave', function () {
      btn.style.transform = 'translate(0, 0)'
    })
  })

  // ===================================================================
  // HERO MOUSE PARALLAX
  // ===================================================================
  var layers = document.querySelectorAll('.layer')

  if (layers.length) {
    document.querySelector('.hero').addEventListener('mousemove', function (e) {
      var rect = this.getBoundingClientRect()
      var x = (e.clientX - rect.left) / rect.width - 0.5
      var y = (e.clientY - rect.top) / rect.height - 0.5

      layers.forEach(function (layer) {
        var depth = parseFloat(layer.getAttribute('data-depth')) || 0.04
        layer.style.transform = 'translate(' + (x * depth * 100) + 'px, ' + (y * depth * 100) + 'px)'
      })
    })
  }

  // ===================================================================
  // BLOP MORPH - UPDATE SVG PATH
  // ===================================================================
  var blobPath = document.querySelector('.blob-path')
  if (blobPath) {
    var points = []

    function generateBlob() {
      var cx = 300, cy = 300, r = 200
      var numPoints = 8
      var path = ''
      for (var i = 0; i < numPoints; i++) {
        var angle = (i / numPoints) * Math.PI * 2
        var variance = (Math.random() - 0.5) * 80
        var px = cx + Math.cos(angle) * (r + variance)
        var py = cy + Math.sin(angle) * (r + variance)
        if (i === 0) {
          path += 'M' + px + ',' + py
        } else {
          var prevAngle = ((i - 1) / numPoints) * Math.PI * 2
          var prevVariance = (Math.random() - 0.5) * 80
          var cpx1 = cx + Math.cos(prevAngle + 0.3) * (r + prevVariance)
          var cpy1 = cy + Math.sin(prevAngle + 0.3) * (r + prevVariance)
          var cpx2 = cx + Math.cos(angle - 0.3) * (r + variance)
          var cpy2 = cy + Math.sin(angle - 0.3) * (r + variance)
          path += 'C' + cpx1 + ',' + cpy1 + ' ' + cpx2 + ',' + cpy2 + ' ' + px + ',' + py
        }
      }
      path += 'Z'
      blobPath.setAttribute('d', path)
    }

    generateBlob()
    setInterval(generateBlob, 4000)
  }

  // ===================================================================
  // GITHUB PROJECTS
  // ===================================================================
  var grid = document.getElementById('proj-grid')
  var loading = document.getElementById('proj-loading')

  if (grid) {
    fetch('https://api.github.com/users/nz12two/repos?sort=updated&per_page=6&type=owner')
      .then(function (r) {
        if (!r.ok) throw new Error('GitHub error')
        return r.json()
      })
      .then(function (repos) {
        if (loading) loading.style.display = 'none'
        if (!repos || repos.length === 0) {
          grid.innerHTML = '<div class="proj-loading"><i class="fas fa-folder-open"></i><p>Nenhum projeto publico encontrado.</p></div>'
          return
        }
        var html = ''
        for (var i = 0; i < repos.length; i++) {
          var r = repos[i]
          var desc = r.description || 'Sem descricao disponivel.'
          var tags = []
          if (r.language) tags.push(r.language)
          if (r.topics) {
            for (var t = 0; t < r.topics.length && t < 3; t++) {
              if (r.topics[t] !== r.language) tags.push(r.topics[t])
            }
          }
          var date = new Date(r.updated_at).toLocaleDateString('pt-BR')
          var name = r.name.replace(/-/g, ' ').replace(/_/g, ' ')
          var tagHtml = ''
          if (tags.length > 0) {
            tagHtml += '<div class="proj-tags">'
            for (var t = 0; t < tags.length; t++) {
              tagHtml += '<span>' + tags[t] + '</span>'
            }
            tagHtml += '</div>'
          }
          html += '<div class="proj-card">'
          html += '<div class="proj-img-wrap">'
          html += '<div class="proj-img" style="background:linear-gradient(135deg,#141b38,#070b17);display:flex;align-items:center;justify-content:center;font-size:38px;color:#4a5a80;"><i class="fab fa-github"></i></div>'
          html += '<div class="proj-overlay"><a href="' + r.html_url + '" target="_blank" class="proj-link"><i class="fas fa-external-link-alt"></i></a></div>'
          html += '</div>'
          html += '<div class="proj-info">'
          html += '<h3 class="proj-title">' + name + '</h3>'
          html += '<p class="proj-desc">' + desc + '</p>'
          html += tagHtml
          html += '<div class="proj-meta">'
          html += '<span><i class="fas fa-star"></i> ' + r.stargazers_count + '</span>'
          html += '<span><i class="fas fa-code-fork"></i> ' + r.forks_count + '</span>'
          html += '<span><i class="fas fa-calendar-alt"></i> ' + date + '</span>'
          html += '</div></div></div>'
        }
        grid.innerHTML = html
      })
      .catch(function () {
        if (loading) loading.style.display = 'none'
        grid.innerHTML = '<div class="proj-loading"><i class="fas fa-exclamation-triangle"></i><p>Erro ao carregar projetos.</p></div>'
      })
  }

  // ===================================================================
  // FAQ
  // ===================================================================
  var faqItems = document.querySelectorAll('.faq-item')
  for (var i = 0; i < faqItems.length; i++) {
    ;(function (item) {
      var q = item.querySelector('.faq-q')
      if (q) {
        q.addEventListener('click', function () {
          var active = item.classList.contains('active')
          for (var j = 0; j < faqItems.length; j++) {
            faqItems[j].classList.remove('active')
          }
          if (!active) item.classList.add('active')
        })
      }
    })(faqItems[i])
  }

  // ===================================================================
  // STAT COUNTER
  // ===================================================================
  var statEls = document.querySelectorAll('.stat-num[data-num]')
  for (var i = 0; i < statEls.length; i++) {
    ;(function (el) {
      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          obs.unobserve(el)
          var target = parseInt(el.getAttribute('data-num')) || 0
          var cur = 0
          var step = Math.max(1, Math.floor(target / 40))
          function countUp() {
            cur += step
            if (cur >= target) {
              el.textContent = target + '+'
              return
            }
            el.textContent = cur
            requestAnimationFrame(function () { setTimeout(countUp, 16) })
          }
          countUp()
        }
      }, { threshold: 0.5 })
      obs.observe(el)
    })(statEls[i])
  }

  // ===================================================================
  // SCROLL REVEAL
  // ===================================================================
  var revealEls = document.querySelectorAll('.reveal-on-scroll')

  for (var i = 0; i < revealEls.length; i++) {
    ;(function (el) {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px)'
      el.style.transition = 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)'

      var obs = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
          obs.unobserve(el)
        }
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' })
      obs.observe(el)

      // Fallback
      var revealed = false
      function checkScroll() {
        if (!revealed) {
          var rect = el.getBoundingClientRect()
          if (rect.top < window.innerHeight - 60) {
            el.style.opacity = '1'
            el.style.transform = 'translateY(0)'
            revealed = true
          }
        }
      }
      window.addEventListener('scroll', checkScroll)
      setTimeout(checkScroll, 3000)
    })(revealEls[i])
  }

  // ===================================================================
  // BACK TO TOP
  // ===================================================================
  var backTop = document.getElementById('back-top')
  if (backTop) {
    window.addEventListener('scroll', function () {
      backTop.classList.toggle('visible', window.scrollY > 400)
    })
    backTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }

  // ===================================================================
  // 3D TILT CARDS
  // ===================================================================
  var tiltCards = document.querySelectorAll('[data-tilt]')
  for (var i = 0; i < tiltCards.length; i++) {
    (function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect()
        var x = (e.clientX - rect.left) / rect.width
        var y = (e.clientY - rect.top) / rect.height
        var tiltX = (y - 0.5) * 12
        var tiltY = (x - 0.5) * -12
        card.style.transform = 'perspective(800px) rotateX(' + tiltX + 'deg) rotateY(' + tiltY + 'deg) scale3d(1.02,1.02,1.02)'
      })
      card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
      })
    })(tiltCards[i])
  }

  // ===================================================================
  // BG ORBS MOUSE PARALLAX
  // ===================================================================
  var orbs = document.querySelectorAll('.bg-orb')
  var orbSpeeds = [0.012, 0.02, 0.008, 0.025, 0.015]
  if (orbs.length) {
    document.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - 0.5) * 2
      var y = (e.clientY / window.innerHeight - 0.5) * 2
      for (var i = 0; i < orbs.length; i++) {
        var speed = orbSpeeds[i % orbSpeeds.length]
        orbs[i].style.setProperty('--px', (x * speed * 120) + 'px')
        orbs[i].style.setProperty('--py', (y * speed * 120) + 'px')
      }
    })
  }

  // ===================================================================
  // CONTACT
  // ===================================================================
  var cttBtn = document.getElementById('ctt-btn')
  if (cttBtn) {
    cttBtn.addEventListener('click', function () {
      var method = document.getElementById('ctt-method')
      var purpose = document.getElementById('ctt-purpose')
      if (!method || !purpose) return
      var m = method.value
      var p = purpose.value
      var msgs = {
        orcamento: 'Ola! Gostaria de solicitar um orcamento para um projeto.',
        duvida: 'Ola! Tenho uma duvida tecnica.',
        proposta: 'Ola! Gostaria de fazer uma proposta de trabalho.',
        reuniao: 'Ola! Gostaria de agendar uma reuniao.',
        outro: 'Ola! Gostaria de conversar sobre outro assunto.'
      }
      var text = msgs[p] || msgs.outro
      if (m === 'whatsapp') {
        window.open('https://wa.me/5571992227288?text=' + encodeURIComponent(text), '_blank')
      } else {
        window.open(
          'https://mail.google.com/mail/?view=cm&fs=1&to=nzjr123@gmail.com&su=Contato%20-%20Portfolio&body=' + encodeURIComponent(text),
          '_blank'
        )
      }
    })
  }

})