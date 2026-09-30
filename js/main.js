(() => {
  const storage = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch { /* 저장 불가 환경은 무시 */ } },
  };
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---------- 섹션 전환 ----------
  const aside = document.getElementById('aside');
  const sections = [...document.querySelectorAll('.section')];
  const navLinks = [...document.querySelectorAll('.nav a')];

  const show = (id, push = true) => {
    const target = document.getElementById(id) || sections[0];
    sections.forEach((s) => s.classList.toggle('active', s === target));
    navLinks.forEach((a) => a.classList.toggle('active', a.dataset.nav === target.id));
    target.scrollTop = 0;
    aside.classList.remove('open');
    if (push && location.hash !== `#${target.id}`) history.pushState(null, '', `#${target.id}`);
    if (target.id === 'home') startTyping();
  };
  document.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => { e.preventDefault(); show(el.dataset.nav); });
  });
  window.addEventListener('popstate', () => show(location.hash.slice(1) || 'home', false));

  // 모바일 메뉴
  document.querySelector('.nav-toggler').addEventListener('click', () => aside.classList.toggle('open'));

  // ---------- 타이핑 효과 ----------
  const typingEl = document.querySelector('.typing');
  const words = ['UX/UI Design', 'Branding', 'Product Design', 'Vibe Coding'];
  let typingTimer = null;
  function startTyping() {
    if (typingTimer) return;
    if (reduceMotion) { typingEl.textContent = words[0]; return; }
    let w = 0, i = 0, deleting = false;
    const tick = () => {
      const word = words[w];
      i += deleting ? -1 : 1;
      typingEl.textContent = word.slice(0, i);
      let delay = deleting ? 45 : 95;
      if (!deleting && i === word.length) { deleting = true; delay = 1400; }
      else if (deleting && i === 0) { deleting = false; w = (w + 1) % words.length; delay = 300; }
      typingTimer = setTimeout(tick, delay);
    };
    tick();
  }

  // ---------- 테마 색상 · 다크모드 ----------
  const switcher = document.querySelector('.style-switcher');
  document.querySelector('.style-switcher-toggler').addEventListener('click', () => switcher.classList.toggle('open'));
  const colorBtns = [...document.querySelectorAll('.colors button')];
  const setColor = (c) => {
    document.documentElement.style.setProperty('--skin', c);
    colorBtns.forEach((b) => b.classList.toggle('is-active', b.dataset.color === c));
    storage.set('skin', c);
  };
  colorBtns.forEach((b) => b.addEventListener('click', () => setColor(b.dataset.color)));
  setColor(storage.get('skin') || colorBtns[0].dataset.color);

  const dayNight = document.querySelector('.day-night');
  const SUN_ICON = '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true">'
    + '<circle cx="12" cy="12" r="4.6" />'
    + '<path d="M12 2.2v2.6M12 19.2v2.6M2.2 12h2.6M19.2 12h2.6M5.07 5.07l1.84 1.84M17.09 17.09l1.84 1.84M5.07 18.93l1.84-1.84M17.09 6.91l1.84-1.84" />'
    + '</svg>';
  const setDark = (on) => {
    document.body.classList.toggle('dark', on);
    // 다크모드일 때는 라이트모드로 바꾸는 해 아이콘(원 + 짧은 빛줄기), 라이트모드일 때는 달 아이콘
    dayNight.innerHTML = on ? SUN_ICON : '<i class="fa-solid fa-moon"></i>';
    dayNight.setAttribute('aria-label', on ? '라이트모드로 전환' : '다크모드로 전환');
    storage.set('dark', on ? '1' : '0');
  };
  dayNight.addEventListener('click', () => setDark(!document.body.classList.contains('dark')));
  // 첫 방문 기본값은 다크모드, 직접 바꾼 경우에만 저장된 값을 따름
  setDark(storage.get('dark') !== '0');
  window.addEventListener('scroll', () => switcher.classList.remove('open'), { passive: true });

  // ---------- 포트폴리오 필터 ----------
  const filterBtns = [...document.querySelectorAll('.filters button')];
  const items = [...document.querySelectorAll('.portfolio-item')];
  filterBtns.forEach((btn) => btn.addEventListener('click', () => {
    filterBtns.forEach((b) => b.classList.toggle('active', b === btn));
    items.forEach((it) => it.classList.toggle('is-hidden', btn.dataset.filter !== 'all' && it.dataset.cat !== btn.dataset.filter));
  }));
  // 아직 링크가 없는 프로젝트는 이동하지 않음
  items.forEach((it) => {
    if (it.getAttribute('href') === '#') it.addEventListener('click', (e) => e.preventDefault());
  });

  // ---------- 메일 문의: 작성 내용으로 메일 앱 열기 ----------
  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const body = `${f.message.value}\n\n— ${f.name.value} (${f.email.value})`;
    location.href = `mailto:lbaikal1742@gmail.com?subject=${encodeURIComponent(f.subject.value)}&body=${encodeURIComponent(body)}`;
  });

  // 첫 진입: 주소의 #섹션으로
  show(location.hash.slice(1) || 'home', false);
})();
