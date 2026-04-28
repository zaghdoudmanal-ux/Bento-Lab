// =============================================
// BENTO LAB — Full Interactive Script
// =============================================
const SUPABASE_URL = "https://erniigvhxsimopinespt.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVybmlpZ3ZoeHNpbW9waW5lc3B0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzczMjgzMDMsImV4cCI6MjA5MjkwNDMwM30.ixXFtFVf0Wi6U0CFzUXVEkXllNY7k1W_S_JrgxxkHXI";

window.supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

// ─── CAKE COLOR DATA ───────────────────────────────────────────────────────
const CAKE_COLORS = {
  blanc:  { name: 'Blanc Vanille',  hi: '#FFFFFF', base: '#FFF8F0', sh: '#DDD0C8', ring: '#EEE4DC' },
  noir:   { name: 'Noir Velours',   hi: '#5A5250', base: '#2C2422', sh: '#1A1412', ring: '#3D3330' },
  rouge:  { name: 'Rouge Velours',  hi: '#F47070', base: '#E05555', sh: '#B83535', ring: '#D04848' },
  bleu:   { name: 'Bleu Ciel',      hi: '#AED0E8', base: '#7BA7CC', sh: '#4E7AA0', ring: '#90BBD8' },
  vert:   { name: 'Vert Pistache',  hi: '#CCEEBC', base: '#8EBE84', sh: '#5A9050', ring: '#AADA9C' },
  rose:   { name: 'Rose Blush',     hi: '#FFE8E8', base: '#F9C5C5', sh: '#DE9898', ring: '#F5D5D5' },
  violet: { name: 'Violet Lavande', hi: '#EAD8FC', base: '#C4A8E8', sh: '#9270C4', ring: '#D8C0F4' },
  jaune:  { name: 'Jaune Citron',   hi: '#FFF2B0', base: '#F5D870', sh: '#C8AA30', ring: '#FFE880' },
  marron: { name: 'Chocolat Chaud', hi: '#C49870', base: '#8B6347', sh: '#5A3A20', ring: '#A87858' },
};

const GARNISH_DATA = {
  chocolat: { label: '🍫 Garniture Chocolat', drizzle: '#6B3A1F', fill: '#7B4A2F' },
  caramel:  { label: '🍯 Garniture Caramel',  drizzle: '#C4842A', fill: '#D4943A' },
  fruits:   { label: '🍓 Garniture Fruits rouges', drizzle: '#C02020', fill: '#D03030' },
};

const BAG_COLORS = {
  rose:   { base: '#F9C5C5', hi: '#FFE8E8', sh: '#DE9898' },
  blanc:  { base: '#FFF8F0', hi: '#FFFFFF',  sh: '#D0C8C0' },
  violet: { base: '#C4A8E8', hi: '#EAD8FC', sh: '#9270C4' },
  vert:   { base: '#8EBE84', hi: '#CCEEBC', sh: '#5A9050' },
  bleu:   { base: '#7BA7CC', hi: '#AED0E8', sh: '#4E7AA0' },
  jaune:  { base: '#F5D870', hi: '#FFF2B0', sh: '#C8AA30' },
  rouge:  { base: '#E05555', hi: '#F47070', sh: '#B83535' },
  marron: { base: '#8B6347', hi: '#C49870', sh: '#5A3A20' },
  noir:   { base: '#2C2422', hi: '#5A5250', sh: '#1A1412' },
};

// ─── SVG GENERATORS ────────────────────────────────────────────────────────
function makeCakeSVG(colorKey, garnishKey) {
  const c = CAKE_COLORS[colorKey] || CAKE_COLORS.blanc;
  const g = GARNISH_DATA[garnishKey] || GARNISH_DATA.chocolat;
  const id = `ck_${colorKey}_${Date.now()}`;

  let garnishLayer = '';
  if (garnishKey === 'chocolat') {
    garnishLayer = `
      <path d="M80 185 Q100 175 130 185 Q160 195 185 180 Q200 173 215 180" stroke="${g.drizzle}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.85"/>
      <path d="M70 205 Q100 195 140 208 Q170 218 210 200" stroke="${g.drizzle}" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.75"/>
      <circle cx="95" cy="195" r="5" fill="${g.fill}" opacity="0.9"/>
      <circle cx="160" cy="188" r="4" fill="${g.fill}" opacity="0.9"/>
      <circle cx="195" cy="210" r="5" fill="${g.fill}" opacity="0.85"/>`;
  } else if (garnishKey === 'caramel') {
    garnishLayer = `
      <path d="M75 180 Q110 165 145 178 Q175 190 215 175" stroke="${g.drizzle}" stroke-width="7" fill="none" stroke-linecap="round" opacity="0.7"/>
      <path d="M78 198 Q115 185 150 198 Q180 210 215 195" stroke="${g.drizzle}" stroke-width="5" fill="none" stroke-linecap="round" opacity="0.6"/>
      <ellipse cx="145" cy="188" rx="30" ry="6" fill="${g.fill}" opacity="0.25"/>`;
  } else {
    garnishLayer = `
      <circle cx="100" cy="185" r="7" fill="#D03030" opacity="0.9"/>
      <circle cx="125" cy="195" r="9" fill="#E84040" opacity="0.85"/>
      <circle cx="155" cy="183" r="7" fill="#C02020" opacity="0.9"/>
      <circle cx="178" cy="196" r="8" fill="#D03030" opacity="0.85"/>
      <circle cx="200" cy="185" r="6" fill="#E84040" opacity="0.9"/>
      <circle cx="100" cy="185" r="3" fill="#801010"/>
      <circle cx="155" cy="183" r="3" fill="#801010"/>`;
  }

  return `<svg viewBox="0 0 290 310" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="top_${id}" cx="38%" cy="32%" r="62%">
      <stop offset="0%" stop-color="${c.hi}"/>
      <stop offset="45%" stop-color="${c.base}"/>
      <stop offset="100%" stop-color="${c.sh}"/>
    </radialGradient>
    <linearGradient id="side_${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${c.sh}"/>
      <stop offset="18%"  stop-color="${c.base}"/>
      <stop offset="50%"  stop-color="${c.hi}"/>
      <stop offset="82%"  stop-color="${c.base}"/>
      <stop offset="100%" stop-color="${c.sh}"/>
    </linearGradient>
    <linearGradient id="sideShd_${id}" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="rgba(0,0,0,0)"/>
      <stop offset="100%" stop-color="rgba(0,0,0,0.14)"/>
    </linearGradient>
  </defs>

  <!-- Drop shadow -->
  <ellipse cx="145" cy="298" rx="110" ry="14" fill="rgba(0,0,0,0.13)"/>

  <!-- Cake body side -->
  <rect x="35" y="165" width="220" height="120" rx="6" fill="url(#side_${id})"/>
  <rect x="35" y="165" width="220" height="120" rx="6" fill="url(#sideShd_${id})"/>

  <!-- Garnish on side -->
  ${garnishLayer}

  <!-- Top ellipse -->
  <ellipse cx="145" cy="168" rx="110" ry="42" fill="url(#top_${id})"/>

  <!-- Top ring -->
  <ellipse cx="145" cy="168" rx="110" ry="42" fill="none" stroke="${c.ring}" stroke-width="2.5" opacity="0.6"/>

  <!-- Cream rosettes on top -->
  <circle cx="110" cy="158" r="11" fill="${c.hi}" opacity="0.75"/>
  <circle cx="145" cy="152" r="10" fill="${c.hi}" opacity="0.7"/>
  <circle cx="180" cy="158" r="11" fill="${c.hi}" opacity="0.75"/>
  <circle cx="127" cy="170" r="9" fill="${c.hi}" opacity="0.65"/>
  <circle cx="163" cy="170" r="9" fill="${c.hi}" opacity="0.65"/>

  <!-- Shine -->
  <ellipse cx="105" cy="148" rx="32" ry="12" fill="rgba(255,255,255,0.28)" transform="rotate(-12,105,148)"/>
  <ellipse cx="95" cy="144" rx="12" ry="5" fill="rgba(255,255,255,0.18)"/>
</svg>`;
}

function makeBagSVG(colorKey) {
  const c = BAG_COLORS[colorKey] || BAG_COLORS.rose;
  const id = `bag_${colorKey}_${Math.random().toString(36).slice(2,6)}`;
  return `<svg viewBox="0 0 60 140" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stop-color="${c.sh}"/>
      <stop offset="40%"  stop-color="${c.base}"/>
      <stop offset="70%"  stop-color="${c.hi}"/>
      <stop offset="100%" stop-color="${c.sh}"/>
    </linearGradient>
  </defs>
  <!-- Bag body -->
  <path d="M8 28 L52 28 L38 118 L22 118 Z" fill="url(#${id})" rx="4"/>
  <!-- Knot at top -->
  <path d="M8 30 Q30 42 52 30 Q30 18 8 30 Z" fill="${c.sh}" opacity="0.9"/>
  <!-- Top opening -->
  <ellipse cx="30" cy="28" rx="22" ry="8" fill="${c.base}" opacity="0.5"/>
  <!-- Texture lines -->
  <line x1="18" y1="45" x2="15" y2="100" stroke="rgba(255,255,255,0.3)" stroke-width="2.5" stroke-linecap="round"/>
  <line x1="27" y1="40" x2="25" y2="108" stroke="rgba(255,255,255,0.2)" stroke-width="1.5" stroke-linecap="round"/>
  <!-- Highlight dot -->
  <circle cx="20" cy="48" r="5" fill="rgba(255,255,255,0.35)"/>
  <!-- Metal tip -->
  <path d="M22 118 L24 136 L36 136 L38 118 Z" fill="#B0BAC8"/>
  <path d="M24 136 Q30 143 36 136" fill="#8890A0"/>
  <ellipse cx="30" cy="119" rx="8" ry="3" fill="${c.sh}" opacity="0.6"/>
</svg>`;
}

// ─── STATE ──────────────────────────────────────────────────────────────────
const state = {
  color: 'blanc',
  garnish: 'chocolat',
  bags: 2,
  bagColors: ['rose', 'rose'],  // one color per bag
  extras: { bougie: true, carte: false },
  isPack: false,
  packSize: 0,
  packCakes: [],
};

function calcPrice() {
  const extra = Math.max(0, state.bags - 2) * 10;
  return 140 + extra;
}

// ─── RENDER FUNCTIONS ────────────────────────────────────────────────────────
function renderCake() {
  const mount = document.getElementById('cake-svg-mount');
  if (!mount) return;
  mount.innerHTML = makeCakeSVG(state.color, state.garnish);
}

function renderBags() {
  const stage = document.getElementById('bags-stage');
  if (!stage) return;
  stage.innerHTML = '';
  for (let i = 0; i < state.bags; i++) {
    const col = state.bagColors[i] || 'rose';
    const wrap = document.createElement('div');
    wrap.className = 'bag-svg-item';
    wrap.innerHTML = makeBagSVG(col);
    stage.appendChild(wrap);
  }
}

// ── COLOR LABEL MAP ─────────────────────────────────────────────────────────
const COLOR_HEX_MAP = {
  rose: '#F9C5C5', blanc: '#FFF8F0', violet: '#C4A8E8', vert: '#8EBE84',
  bleu: '#7BA7CC', jaune: '#F5D870', rouge: '#E05555', marron: '#8B6347', noir: '#2C2422'
};
const COLOR_NAMES_FR = {
  rose: 'Rose', blanc: 'Blanc', violet: 'Violet', vert: 'Vert',
  bleu: 'Bleu', jaune: 'Jaune', rouge: 'Rouge', marron: 'Marron', noir: 'Noir'
};

function renderPerBagPickers() {
  const container = document.getElementById('per-bag-pickers');
  if (!container) return;
  container.innerHTML = '';

  for (let i = 0; i < state.bags; i++) {
    const currentColor = state.bagColors[i] || 'rose';
    const row = document.createElement('div');
    row.className = 'per-bag-row';
    row.innerHTML = `
      <div class="per-bag-label">
        <span class="per-bag-icon">${makeBagSVG(currentColor)}</span>
        <span class="per-bag-num">Poche ${i + 1}</span>
      </div>
      <div class="per-bag-swatches" data-bag-idx="${i}">
        ${Object.entries(BAG_COLORS).map(([k]) => `
          <button
            class="bag-swatch${currentColor === k ? ' selected' : ''}"
            data-bag-idx="${i}"
            data-bag-color="${k}"
            title="${COLOR_NAMES_FR[k] || k}"
            style="background:${COLOR_HEX_MAP[k]}${k === 'blanc' ? ';border-color:#CCC' : ''}"
          ></button>
        `).join('')}
      </div>
    `;
    container.appendChild(row);
  }

  // Attach click events
  container.querySelectorAll('.bag-swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.bagIdx);
      const color = btn.dataset.bagColor;
      state.bagColors[idx] = color;
      renderBags();
      renderPerBagPickers(); // re-render to update selections
      renderSelectedBagColors();
    });
  });
}

function renderSelectedBagColors() {
  const dotsHtml = state.bagColors.slice(0, state.bags).map(c =>
    `<span class="sel-dot" title="${COLOR_NAMES_FR[c] || c}" style="background:${COLOR_HEX_MAP[c] || '#ccc'}${c==='blanc'?';border:2px solid #CCC':''}"></span>`
  ).join('');

  // Update order card dots
  const cardDots = document.getElementById('oline-bag-colors-dots');
  if (cardDots) cardDots.innerHTML = dotsHtml;
}


function renderPrice() {
  const price = calcPrice();
  const el = document.getElementById('total-price');
  if (el) {
    el.textContent = price + ' Dh';
    el.classList.remove('bump');
    void el.offsetWidth;
    el.classList.add('bump');
    setTimeout(() => el.classList.remove('bump'), 350);
  }
  const extraLine = document.getElementById('oline-extra-bags');
  if (extraLine) {
    const extra = state.bags - 2;
    if (extra > 0) {
      extraLine.style.display = 'flex';
      document.getElementById('oline-extra-bags-lbl').textContent = `Poches supplémentaires (×${extra})`;
      document.getElementById('oline-extra-bags-price').textContent = `+${extra * 10} Dh`;
    } else {
      extraLine.style.display = 'none';
    }
  }
  // Update checkout total if open
  const cfp = document.getElementById('checkout-final-price');
  if (cfp) cfp.textContent = price + ' Dh';
}

function renderBagsCount() {
  const el = document.getElementById('bags-count');
  if (el) el.textContent = state.bags;
  const badge = document.getElementById('bags-extra-badge');
  if (badge) {
    const extra = state.bags - 2;
    if (extra > 0) {
      badge.style.display = 'inline-block';
      badge.textContent = `+${extra * 10} Dh`;
    } else {
      badge.style.display = 'none';
    }
  }
}

function renderLabels() {
  const gl = document.getElementById('garnish-label-text');
  if (gl) gl.textContent = GARNISH_DATA[state.garnish]?.label || '';
  const cl = document.getElementById('color-label-text');
  if (cl) cl.textContent = 'Crème ' + (CAKE_COLORS[state.color]?.name || '');
}

function renderAll() {
  renderCake();
  renderBags();
  renderPerBagPickers();
  renderPrice();
  renderBagsCount();
  renderLabels();
  renderSelectedBagColors();
}

// ─── CONFIGURATOR EVENTS ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {

  // Sticky nav
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hero image parallax
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    heroImg.onload = () => heroImg.classList.add('loaded');
    if (heroImg.complete) heroImg.classList.add('loaded');
  }

  // Hamburger
  const hamburger = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger?.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  document.querySelectorAll('.mobile-link,.mobile-cta').forEach(l =>
    l.addEventListener('click', () => mobileMenu.classList.remove('open'))
  );

  // Scroll reveal
  const scrollEls = document.querySelectorAll('.animate-on-scroll');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const sibs = entry.target.parentElement.querySelectorAll('.animate-on-scroll');
        let delay = 0;
        sibs.forEach((s, idx) => { if (s === entry.target) delay = idx * 80; });
        setTimeout(() => entry.target.classList.add('visible'), delay);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  scrollEls.forEach(el => obs.observe(el));

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' }); }
    });
  });

  // Parallax hero
  window.addEventListener('scroll', () => {
    const bg = document.querySelector('.hero-bg img');
    if (bg && scrollY < innerHeight) bg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }, { passive: true });

  // Pills pause
  const pills = document.querySelector('.pills-track');
  if (pills) {
    pills.addEventListener('mouseenter', () => pills.style.animationPlayState = 'paused');
    pills.addEventListener('mouseleave', () => pills.style.animationPlayState = 'running');
  }

  // ── Cake color buttons
  document.querySelectorAll('.pal-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pal-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.color = btn.dataset.color;
      renderCake();
      renderLabels();
    });
  });

  // ── Garnish buttons
  document.querySelectorAll('.garnish-opt').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.garnish-opt').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      state.garnish = btn.dataset.garnish;
      renderCake();
      renderLabels();
    });
  });

  // ── Bag qty
  document.getElementById('bags-minus')?.addEventListener('click', () => {
    if (state.bags > 2) {
      state.bags--;
      state.bagColors = state.bagColors.slice(0, state.bags);
      renderBags();
      renderPerBagPickers();
      renderBagsCount();
      renderPrice();
      renderSelectedBagColors();
    }
  });
  document.getElementById('bags-plus')?.addEventListener('click', () => {
    if (state.bags < 8) {
      state.bags++;
      // Inherit last color for new bag
      if (!state.bagColors[state.bags - 1]) {
        state.bagColors[state.bags - 1] = state.bagColors[state.bags - 2] || 'rose';
      }
      renderBags();
      renderPerBagPickers();
      renderBagsCount();
      renderPrice();
      renderSelectedBagColors();
    }
  });


  // ── Extras
  ['extra-bougie', 'extra-carte'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', e => {
      const key = id === 'extra-bougie' ? 'bougie' : 'carte';
      state.extras[key] = e.target.checked;
    });
  });

  // ── "Créer mon Bento" → checkout
  document.getElementById('btn-create-single')?.addEventListener('click', () => {
    state.isPack = false;
    openCheckout([{
      color: state.color, garnish: state.garnish,
      bags: state.bags, bagColors: state.bagColors.slice(0, state.bags),
      price: calcPrice(), label: 'Mon Bento Cake'
    }]);
  });

  // ─── PACK BUTTONS ─────────────────────────────────────────────────────────
  [3, 4, 6].forEach(n => {
    document.getElementById(`btn-pack-${n}`)?.addEventListener('click', () => openPackModal(n));
  });

  document.getElementById('pack-modal-close')?.addEventListener('click', closePackModal);
  document.getElementById('pack-modal')?.addEventListener('click', e => {
    if (e.target === document.getElementById('pack-modal')) closePackModal();
  });

  document.getElementById('btn-pack-order')?.addEventListener('click', () => {
    closePackModal();
    openCheckout(state.packCakes);
  });

  // ─── CHECKOUT ─────────────────────────────────────────────────────────────
  document.getElementById('checkout-close')?.addEventListener('click', closeCheckout);
  document.getElementById('btn-whatsapp-order')?.addEventListener('click', sendWhatsApp);

  // Init render
  renderAll();
});

// ─── PACK MODAL ──────────────────────────────────────────────────────────────
function openPackModal(n) {
  const modal = document.getElementById('pack-modal');
  const title = document.getElementById('pack-modal-title');
  const grid  = document.getElementById('pack-cakes-grid');
  if (!modal) return;

  state.packSize = n;
  state.packCakes = Array.from({ length: n }, (_, i) => ({
    color: 'blanc', garnish: 'chocolat', bags: 2, bagColor: 'rose',
    price: 140, label: `Gâteau ${i + 1}`
  }));

  title.textContent = `Personnalise ton Pack ${n} Bento`;
  grid.innerHTML = '';

  state.packCakes.forEach((cake, idx) => {
    const card = document.createElement('div');
    card.className = 'mini-cake-card';
    card.innerHTML = `
      <div class="mini-cake-label">🎂 Gâteau ${idx + 1}</div>
      <div class="mini-cake-preview" id="mini-preview-${idx}"></div>
      <div style="font-size:.75rem;color:var(--light-text);margin-bottom:8px;">Couleur crème :</div>
      <div class="mini-color-grid">
        ${Object.entries(CAKE_COLORS).map(([k, v]) =>
          `<button class="mini-col-btn${k === 'blanc' ? ' selected' : ''}" data-idx="${idx}" data-color="${k}" title="${v.name}"
            style="background:${v.base}; border-color:${k==='blanc'?'var(--dark)':'transparent'}"></button>`
        ).join('')}
      </div>
      <select class="mini-garn-sel" data-idx="${idx}">
        <option value="chocolat">🍫 Chocolat</option>
        <option value="caramel">🍯 Caramel</option>
        <option value="fruits">🍓 Fruits rouges</option>
      </select>`;
    grid.appendChild(card);
    renderMiniCake(idx);
  });

  // Events for mini cakes
  grid.querySelectorAll('.mini-col-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.idx);
      grid.querySelectorAll(`.mini-col-btn[data-idx="${idx}"]`).forEach(b => {
        b.classList.remove('selected');
        b.style.borderColor = 'transparent';
      });
      btn.classList.add('selected');
      btn.style.borderColor = 'var(--dark)';
      state.packCakes[idx].color = btn.dataset.color;
      renderMiniCake(idx);
    });
  });
  grid.querySelectorAll('.mini-garn-sel').forEach(sel => {
    sel.addEventListener('change', () => {
      const idx = parseInt(sel.dataset.idx);
      state.packCakes[idx].garnish = sel.value;
      renderMiniCake(idx);
    });
  });

  updatePackTotal();
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function renderMiniCake(idx) {
  const el = document.getElementById(`mini-preview-${idx}`);
  if (!el) return;
  const cake = state.packCakes[idx];
  el.innerHTML = makeCakeSVG(cake.color, cake.garnish);
}

function updatePackTotal() {
  const total = state.packCakes.reduce((s, c) => s + c.price, 0);
  const el = document.getElementById('pack-total-price');
  if (el) el.textContent = total + ' Dh';
}

function closePackModal() {
  const modal = document.getElementById('pack-modal');
  if (modal) modal.style.display = 'none';
  document.body.style.overflow = '';
}

// ─── CHECKOUT ────────────────────────────────────────────────────────────────
let checkoutCakes = [];

// Build the checkout order display (cake thumbnails + total)
function buildCheckoutDisplay(cakes) {
  const display = document.getElementById('checkout-order-display');
  if (!display) return 0;
  let total = 0;
  display.innerHTML = cakes.map(c => {
    total += c.price;
    return `<div class="checkout-cake-item">
      <div class="checkout-cake-thumb">${makeCakeSVG(c.color, c.garnish)}</div>
      <div class="checkout-cake-details">
        <div class="checkout-cake-name">${c.label}</div>
        <div class="checkout-cake-info">
          Crème ${CAKE_COLORS[c.color]?.name || c.color}<br/>
          ${GARNISH_DATA[c.garnish]?.label || ''}<br/>
          ${c.bags} poche${c.bags > 1 ? 's' : ''} à douille (${(c.bagColors || [c.bagColor || 'rose']).join(', ')}) · <strong>${c.price} Dh</strong>
        </div>
      </div>
    </div>`;
  }).join('') + `<div class="checkout-grand-total"><span>Total</span><span>${total} Dh</span></div>`;
  return total;
}

function openCheckout(cakes) {
  checkoutCakes = cakes;
  const overlay = document.getElementById('checkout-overlay');
  if (!overlay) return;

  // Reset to form view (hide confirmation if previously shown)
  showCheckoutForm();

  // Build cake display
  const total = buildCheckoutDisplay(cakes);
  const cfp = document.getElementById('checkout-final-price');
  if (cfp) cfp.textContent = total + ' Dh';

  overlay.style.display = 'block';
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;
}

function closeCheckout() {
  const overlay = document.getElementById('checkout-overlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function showCheckoutForm() {
  const form = document.getElementById('checkout-form');
  const conf = document.getElementById('order-confirmation');
  if (form) form.style.display = 'flex';
  if (conf) conf.style.display = 'none';
  // Reset button state
  const btn = document.getElementById('btn-submit-order');
  if (btn) { btn.textContent = '✅ Confirmer ma commande'; btn.disabled = false; }
}

// ─── SUBMIT ORDER TO API ─────────────────────────────────────────────────────
async function submitOrder() {
  const name    = document.getElementById('f-name')?.value.trim();
  const phone   = document.getElementById('f-phone')?.value.trim();
  const address = document.getElementById('f-address')?.value.trim();
  const city    = document.getElementById('f-city')?.value;
  const notes   = document.getElementById('f-notes')?.value.trim();

  if (!name || !phone || !address || !city) {
    // Shake invalid fields
    ['f-name','f-phone','f-address','f-city'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) {
        el.style.borderColor = '#E05555';
        el.classList.add('field-shake');
        setTimeout(() => { el.style.borderColor = ''; el.classList.remove('field-shake'); }, 800);
      }
    });
    return;
  }

  const btn = document.getElementById('btn-submit-order');
  if (btn) { btn.textContent = '⏳ Envoi en cours…'; btn.disabled = true; }

  // Build order payload (handle single or pack)
  const totalPrice = checkoutCakes.reduce((s, c) => s + c.price, 0);
  const firstCake = checkoutCakes[0] || {};

  const payload = {
    customer: name,
    phone,
    address,
    city,
    notes,
    color: firstCake.color || state.color,
    garnish: firstCake.garnish || state.garnish,
    bags: firstCake.bags || state.bags,
    bagColors: firstCake.bagColors || state.bagColors,
    extras: state.extras,
    price: totalPrice,
    packSize: checkoutCakes.length > 1 ? checkoutCakes.length : null,
    cakes: checkoutCakes.length > 1 ? checkoutCakes : null,
  };

  try {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Erreur serveur');
    }

    const { order } = await res.json();
    showConfirmation(order, name, totalPrice);

  } catch (err) {
    if (btn) { btn.textContent = '✅ Confirmer ma commande'; btn.disabled = false; }
    alert('Une erreur est survenue : ' + err.message);
  }
}

function showConfirmation(order, name, total) {
  const form = document.getElementById('checkout-form');
  const conf = document.getElementById('order-confirmation');
  if (!conf) return;

  if (form) form.style.display = 'none';

  // Fill confirmation details
  document.getElementById('conf-order-number').textContent = order.orderNumber;
  document.getElementById('conf-name').textContent = name;
  document.getElementById('conf-total').textContent = total + ' Dh';
  document.getElementById('conf-cake-preview').innerHTML = makeCakeSVG(order.color, order.garnish);

  conf.style.display = 'flex';

  // Confetti burst
  launchConfetti();
}

// Simple canvas confetti
function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  canvas.style.display = 'block';
  const ctx = canvas.getContext('2d');
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  const colors = ['#F9C5C5','#C4A8E8','#F5D870','#8EBE84','#7BA7CC','#FFFFFF'];
  const particles = Array.from({ length: 80 }, () => ({
    x: Math.random() * canvas.width,
    y: -20,
    w: Math.random() * 10 + 4,
    h: Math.random() * 6 + 3,
    color: colors[Math.floor(Math.random() * colors.length)],
    vy: Math.random() * 3 + 2,
    vx: (Math.random() - 0.5) * 2,
    angle: Math.random() * 360,
    va: (Math.random() - 0.5) * 4,
  }));
  let frame = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.save();
      ctx.translate(p.x + p.w/2, p.y + p.h/2);
      ctx.rotate(p.angle * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
      ctx.restore();
      p.y += p.vy; p.x += p.vx; p.angle += p.va;
    });
    frame++;
    if (frame < 140) requestAnimationFrame(draw);
    else { ctx.clearRect(0, 0, canvas.width, canvas.height); canvas.style.display = 'none'; }
  }
  draw();
}
// ─── SYSTÈME COMMANDE SUPABASE ─────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("btn-submit-order");

  if (!btn) return;

  btn.addEventListener("click", submitOrder);
});

async function submitOrder() {
  const name = document.getElementById("f-name")?.value.trim();
  const phone = document.getElementById("f-phone")?.value.trim();
  const address = document.getElementById("f-address")?.value.trim();
  const city = document.getElementById("f-city")?.value;
  const notes = document.getElementById("f-notes")?.value.trim() || "";

  if (!name || !phone || !address || !city) {
    alert("Merci de remplir tous les champs obligatoires.");
    return;
  }

  const btn = document.getElementById("btn-submit-order");

  if (btn) {
    btn.disabled = true;
    btn.textContent = "⏳ Envoi...";
  }

  try {
  const firstCake = checkoutCakes?.[0] || {};

  const { error } = await window.supabaseClient
    .from("Orders")
    .insert([
      {
        customer: name,
        phone,
        address,
        city,
        notes,

        color: firstCake.color || state.color,
        garnish: firstCake.garnish || state.garnish,
        bags: firstCake.bags || state.bags,
        bagColors: firstCake.bagColors || state.bagColors,

        extras: state.extras,
        price: totalPrice,

        packSize: checkoutCakes.length > 1 ? checkoutCakes.length : null,
        cakes: checkoutCakes.length > 1 ? checkoutCakes : null,
      }
    ]);

  if (error) {
    console.error("SUPABASE ERROR:", error);
  }

} catch (err) {
  console.error("CATCH ERROR:", err);
}
      ]);

    if (error) throw error;

    alert("✅ Commande envoyée avec succès !");

    document.getElementById("f-name").value = "";
    document.getElementById("f-phone").value = "";
    document.getElementById("f-address").value = "";
    document.getElementById("f-city").value = "";
    if (document.getElementById("f-notes")) {
      document.getElementById("f-notes").value = "";
    }

  } catch (err) {
  console.log("SUPABASE ERROR FULL:", err);
  alert(err.message);
}

  if (btn) {
    btn.disabled = false;
    btn.textContent = "✅ Confirmer ma commande";
  }
}

