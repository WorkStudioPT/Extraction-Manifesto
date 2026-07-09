const VARIANTS = ['normal', 'gold', 'gummy', 'galaxy', 'holofoil', 'gem', 'cube', 'quack'];
const VARIANT_LABEL = {
  normal: 'Normal', 
  gold: 'Gold', 
  gummy: 'Gummy', 
  galaxy: 'Galaxy',
  holofoil: 'Holofoil',
  gem: 'Gem', 
  cube: 'Cube', 
  quack: 'Quack', 
};

const UNRELEASED_VARIANTS = ['gem', 'cube', 'quack'];
const UNRELEASED_SPRITES = ['air', 'seven', 'batman', 'johnwick'];

// Approximate drop chances (%) per rarity tier, sourced from fortnite.gg/sprites.
// Some values are extrapolated from the same rarity tier where an exact figure
// wasn't available — treat as a close estimate, not an official guarantee.
const DROP_RATES = {
  water:       {normal:12.83, gold:0.7,  gummy:0.28, galaxy:0.28},
  earth:       {normal:12.83, gold:0.7,  gummy:0.28, galaxy:0.28},
  fire:        {normal:12.83, gold:0.7,  gummy:0.28, galaxy:0.28},
  fishy:       {normal:13.79, gold:0.17, gummy:0.08, galaxy:0.06},
  duck:        {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02},
  ghost:       {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02},
  king:        {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02},
  demon:       {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02},
  aura:        {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02},
  striker:     {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02},
  dream:       {normal:2.63,  gold:0.03, gummy:0.02, galaxy:0.01},
  boss:        {normal:2.63,  gold:0.03, gummy:0.02, galaxy:0.01},
  punk:        {normal:2.05,  gold:0.03, gummy:0.02, galaxy:0.01},
  zeropoint:   {normal:0.000098, gold:0.0000012, gummy:0.0000006, galaxy:0.0000004},
  grim:        {normal:0.000098, gold:0.0000012, gummy:0.0000006, galaxy:0.0000004},
  burntpeanut: {normal:1.01},
};

const SPRITE_LOCATION = {
  water: 'Spotted near rivers and beaches',
  earth: 'Found wandering around forests and wooded regions',
  fire: 'Appears in cities, towns and high-traffic points of interest',
  duck: 'Found near the vaults at Sinister Strip and Frosted Flats',
  ghost: 'Can appear anywhere, but only during the nighttime cycle',
  dream: 'Found rarely in Sprite Chests',
  demon: 'Dropped from Sprite Chests and Rare Chests',
  punk: 'Found in Sprite Chests or Rare Chests',
  king: 'Found in Sprite Chests, Rare Chests, or looted from AI bots',
  burntpeanut: 'Intended source is Relic Chests',
  zeropoint: 'Found rarely in Sprite Chests and Relic Chests',
  fishy: 'Spotted near high, mountainous areas and while fishing',
  striker: 'Found in Sprite Chests around the map',
  aura: 'Found in Sprite Chests around the map',
  boss: 'Guaranteed to drop when you defeat a boss NPC',
  grim: 'Found rarely in Sprite Chests',
};

const SPRITES = [
  {id:'water',       name:'Water',           rarity:'rare',      ability:'Regenerates shield near water.'},
  {id:'earth',       name:'Earth',           rarity:'rare',      ability:'Chance for extra rare loot when opening chests.'},
  {id:'fire',        name:'Fire',            rarity:'rare',      ability:'Fire explosion upon dealing enough damage.'},
  {id:'duck',        name:'Duck',            rarity:'epic',      ability:'Emotes or jamming regenerates shield.'},
  {id:'ghost',       name:'Ghost',           rarity:'epic',      ability:'Briefly turns invisible after reloading.'},
  {id:'dream',       name:'Dream',           rarity:'legendary', ability:'Random item per level, legendary at max level.'},
  {id:'demon',       name:'Demon',           rarity:'epic',      ability:'Steals health upon eliminating an opponent.'},
  {id:'punk',        name:'Punk',            rarity:'legendary', ability:'Mysterious effect... could be nothing or everything.'},
  {id:'king',        name:'King',            rarity:'epic',      ability:'More pickaxe damage.'},
  {id:'burntpeanut', name:'Burnt Peanut',    rarity:'mythic',    ability:'Chance for more loot (sometimes mythic) upon elimination.', variants:['normal']},
  {id:'zeropoint',   name:'Zero Point',      rarity:'mythic',    ability:'Creates a mini shield bubble when healing.'},
  {id:'fishy',       name:'Fishy',           rarity:'rare',      ability:'Increased swim and sprint speed.'},
  {id:'striker',     name:'Striker',         rarity:'epic',      ability:'Overdrive when climbing, vaulting or wall-running.'},
  {id:'aura',        name:'Aura',            rarity:'epic',      ability:'Gains Shock Rock charge upon dealing damage.'},
  {id:'boss',        name:'Boss',            rarity:'legendary', ability:'Increases maximum health and shield.'},
  {id:'grim',        name:'Grim',            rarity:'mythic',    ability:'Marks whoever attacks you for a few seconds.'},
  {id:'air',         name:'Air',             rarity:'rare',      ability:'Reduces fall damage and increases jump height.'},
  {id:'seven',       name:'The Seven',       rarity:'epic',      ability:'Reveals nearby chests and enemies when perfectly scanning.'},
  {id:'batman',      name:'Batman',          rarity:'legendary', ability:'Gears cooldowns are significantly reduced.'},
  {id:'johnwick',    name:'John Wick',       rarity:'legendary', ability:'Instantly reloads weapons on weapon eliminations.', variants:['normal']},
];

const RARITY_LABEL = {rare:'Rare', epic:'Epic', legendary:'Legendary', mythic:'Mythic'};
const STORAGE_KEY = 'spriteLockerCollectionV3';

let state = loadState();
let filter = {rarity:'all', search:'', missingOnly:false, showUnreleased:false};

function loadState(){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveState(){
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function key(spriteId, variant){ return spriteId + ':' + variant; }
function levelKey(spriteId, variant){ return spriteId + ':' + variant + ':_level'; }
function masterKey(spriteId, variant){ return spriteId + ':' + variant + ':_mastered'; }

function relevantSlots(){
  const slots = [];
  SPRITES.forEach(s => {
    if(!filter.showUnreleased && UNRELEASED_SPRITES.includes(s.id)) return;
    const vs = s.variants || VARIANTS;
    vs.forEach(v => {
      if(!filter.showUnreleased && UNRELEASED_VARIANTS.includes(v)) return;
      slots.push({spriteId: s.id, variant: v});
    });
  });
  return slots;
}
function totalSlots(){
  return relevantSlots().length;
}
function collectedSlots(){
  return relevantSlots().filter(s => state[key(s.spriteId, s.variant)]).length;
}
function masteredSlots(){
  return relevantSlots().filter(s => state[masterKey(s.spriteId, s.variant)]).length;
}

function renderProgress(){
  const total = totalSlots();
  const got = collectedSlots();
  const mastered = masteredSlots();
  const percentage = total > 0 ? (got / total) * 100 : 0;

  document.getElementById('countText').innerHTML = got + '<span>/ ' + total + ' Extracted</span>';
  document.getElementById('masteredCountText').innerHTML = mastered + '<span>/ ' + total + ' Mastered</span>';
  document.getElementById('pctText').textContent = Math.round(percentage) + '%';
  document.getElementById('totalMeta').textContent = total;
  
  const fill = document.getElementById('trackFill');
  if (fill) {
    fill.style.width = percentage + '%';
  }
}

function formatPct(n){
  if(n === undefined || n === null) return '—';
  if(n === 0) return '0%';
  if(n < 0.001) return n.toFixed(6).replace(/0+$/,'').replace(/\.$/,'') + '%';
  if(n < 1) return n.toFixed(2) + '%';
  return n.toFixed(2).replace(/\.?0+$/,'') + '%';
}

function openSpriteModal(sprite){
  const overlay = document.getElementById('spriteModalOverlay');
  const card = document.getElementById('spriteModalCard');
  const vs = sprite.variants || VARIANTS;
  const rates = DROP_RATES[sprite.id] || {};
  const location = SPRITE_LOCATION[sprite.id];

  const variantRows = vs.map(v => {
    const isUnreleased = UNRELEASED_VARIANTS.includes(v) || UNRELEASED_SPRITES.includes(sprite.id);
    const pct = isUnreleased ? 0 : rates[v];
    return `
      <div class="modal-variant-row${isUnreleased ? ' unreleased' : ''}">
        <img class="modal-variant-thumb" src="assets/${sprite.id}-${v}.webp" onerror="this.style.visibility='hidden'">
        <div class="modal-variant-name">${VARIANT_LABEL[v]}</div>
        <div class="modal-variant-pct">${isUnreleased ? 'Unreleased' : formatPct(pct)}</div>
      </div>
    `;
  }).join('');

  card.innerHTML = `
    <button class="modal-close" id="modalCloseBtn">&times;</button>
    <div class="modal-head">
      <img class="modal-icon" src="assets/${sprite.id}-normal.webp" alt="${sprite.name}" onerror="this.style.visibility='hidden'">
      <div>
        <div class="modal-title">${sprite.name}</div>
        <div class="rarity-tag ${sprite.rarity}" style="display:inline-block;margin-bottom:8px;">${RARITY_LABEL[sprite.rarity]}</div>
        <div class="modal-ability">${sprite.ability}</div>
        ${location ? `<div class="modal-meta"><div>LOCATION: <b>${location}</b></div></div>` : ''}
      </div>
    </div>
    <div class="modal-variants-title">Variant Drop Chances</div>
    ${variantRows}
    <div class="modal-note">Drop rates are approximate community-sourced figures and may shift with in-game hotfixes or seasonal events.</div>
  `;

  overlay.classList.add('open');
  document.getElementById('modalCloseBtn').addEventListener('click', closeSpriteModal);
}

function closeSpriteModal(){
  document.getElementById('spriteModalOverlay').classList.remove('open');
}

document.getElementById('spriteModalOverlay').addEventListener('click', (e) => {
  if(e.target.id === 'spriteModalOverlay') closeSpriteModal();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeSpriteModal();
});

function spriteCollectedCount(sprite){
  const vs = sprite.variants || VARIANTS;
  return vs.filter(v => state[key(sprite.id,v)]).length;
}

function renderGrid(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  
  SPRITES.forEach(sprite=>{
    const vs = sprite.variants || VARIANTS;
    const matchesRarity = filter.rarity==='all' || sprite.rarity===filter.rarity;
    const matchesSearch = sprite.name.toLowerCase().includes(filter.search.toLowerCase());
    const spriteIsUnreleased = UNRELEASED_SPRITES.includes(sprite.id);
    const matchesUnreleased = filter.showUnreleased || !spriteIsUnreleased;
    
    const card = document.createElement('div');
    card.className = 'card' + ((matchesRarity && matchesSearch && matchesUnreleased) ? '' : ' hidden');

    const img = document.createElement('img');
    img.className = 'icon';
    img.src = `assets/${sprite.id}-normal.webp`;
    img.alt = sprite.name;
    img.dataset.stage = '0';
    img.onerror = function(){
      if(this.dataset.stage === '0'){
        this.dataset.stage = '1';
        this.src = `assets/${sprite.id}-normal.webp`;
      } else {
        this.style.opacity = '0.3';
      }
    };
    img.addEventListener('click', () => openSpriteModal(sprite));
    card.appendChild(img);

    const main = document.createElement('div');
    main.className = 'card-main';

    const top = document.createElement('div');
    top.className = 'card-top';
    top.innerHTML = `<div class="card-name">${sprite.name}</div><div class="rarity-tag ${sprite.rarity}">${RARITY_LABEL[sprite.rarity]}</div>`;
    main.appendChild(top);

    const ability = document.createElement('div');
    ability.className = 'ability';
    ability.textContent = sprite.ability;
    main.appendChild(ability);

    const variantsRow = document.createElement('div');
    variantsRow.className = 'variants';
    
    vs.forEach(v=>{
      const isCollected = !!state[key(sprite.id,v)];
      if(filter.missingOnly && isCollected) return; 
      
      const isUnreleased = UNRELEASED_VARIANTS.includes(v) || UNRELEASED_SPRITES.includes(sprite.id);
      if(isUnreleased && !filter.showUnreleased) return;

      const chip = document.createElement('div');
      const currentLevel = state[levelKey(sprite.id, v)] || '1';
      const isMastered = !!state[masterKey(sprite.id, v)];
      
      // CONDIÇÃO PREMIUM COM EXCEÇÃO PARA GUMMY:
      // Se for gummy: basta estar Extracted + Mastered.
      // Outras variantes: Extracted + LVL 5 + Mastered.
      let isPremium = false;
      if (sprite.id === 'dream') { 
        isPremium = isCollected && isMastered;
      } else {
        isPremium = isCollected && currentLevel === '5' && isMastered;
      }

      chip.className = 'chip' + (isCollected ? ' on' : '') + (isUnreleased ? ' unreleased' : '') + (isPremium ? ' premium-complete' : '');
      
      const badge = isUnreleased ? '<span class="chip-badge">Soon</span>' : '';
      const premiumLabel = isPremium ? '<span class="premium-badge">Done</span>' : '';

      chip.innerHTML = `
        ${premiumLabel}
        <img class="chip-thumb" src="assets/${sprite.id}-${v}.webp" onerror="if(this.dataset.s!=='1'){this.dataset.s='1';this.src='assets/temp-${sprite.id}-cube.webp';}else{this.style.visibility='hidden';}">
        <div>${VARIANT_LABEL[v]}</div>
        ${badge}
        <div class="chip-controls" onclick="event.stopPropagation()">
          <label class="ctrl-row">
            <span class="ctrl-label">LVL</span>
            <select class="v-lvl" data-sprite="${sprite.id}" data-var="${v}">
              ${[1,2,3,4,5].map(l => `<option value="${l}" ${currentLevel == l ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
          </label>
          <label class="ctrl-row">
            <span class="ctrl-label">Mastered</span>
            <input type="checkbox" class="v-mast" data-sprite="${sprite.id}" data-var="${v}" ${isMastered ? 'checked' : ''}>
          </label>
        </div>
      `;
      
      chip.addEventListener('click', () => {
        const k = key(sprite.id,v);
        state[k] = !state[k];
        saveState();
        renderGrid();
        renderProgress();
      });

      chip.querySelector('.v-lvl').addEventListener('change', (e) => {
        state[levelKey(sprite.id, v)] = e.target.value;
        const k = key(sprite.id, v);
        if (!state[k]) {
          state[k] = true;
        }
        saveState();
        renderGrid(); 
        renderProgress();
      });
      
      chip.querySelector('.v-mast').addEventListener('change', (e) => {
        state[masterKey(sprite.id, v)] = e.target.checked;
        if (e.target.checked) {
          const k = key(sprite.id, v);
          if (!state[k]) {
            state[k] = true;
          }
        }
        saveState();
        renderGrid();
        renderProgress();
      });

      variantsRow.appendChild(chip);
    });
    
    main.appendChild(variantsRow);
    card.appendChild(main);
    grid.appendChild(card);
  });
}

document.querySelectorAll('.pill[data-rarity]').forEach(pill=>{
  pill.addEventListener('click', ()=>{
    document.querySelectorAll('.pill[data-rarity]').forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
    filter.rarity = pill.dataset.rarity;
    renderGrid();
  });
});
document.getElementById('missingOnly').addEventListener('click', function(){
  filter.missingOnly = !filter.missingOnly;
  this.classList.toggle('active', filter.missingOnly);
  renderGrid();
});
document.getElementById('showUnreleased').addEventListener('click', function(){
  filter.showUnreleased = !filter.showUnreleased;
  this.classList.toggle('active', filter.showUnreleased);
  renderGrid();
  renderProgress();
});
document.getElementById('search').addEventListener('input', (e)=>{
  filter.search = e.target.value;
  renderGrid();
});
document.getElementById('resetBtn').addEventListener('click', ()=>{
  if(confirm('Reset all saved progress?')){
    state = {};
    saveState();
    renderGrid();
    renderProgress();
  }
});
document.getElementById('pdfBtn').addEventListener('click', generatePDFReport);

function imageToPNGDataURL(imgSrc){
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try{
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || 64;
        canvas.height = img.naturalHeight || 64;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/png'));
      }catch(e){ resolve(null); }
    };
    img.onerror = () => resolve(null);
    img.src = imgSrc;
  });
}

// Tries fetch()+blob first (avoids canvas "tainted" errors some browsers throw
// when converting file:// -loaded <img> elements), falls back to direct Image load.
async function loadImageAsPNGDataURL(src){
  try{
    const res = await fetch(src);
    if(res.ok){
      const blob = await res.blob();
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
      const pngUrl = await imageToPNGDataURL(dataUrl);
      if(pngUrl) return pngUrl;
    }
  }catch(e){ /* fall through to direct Image attempt */ }
  return imageToPNGDataURL(src);
}

async function preloadSpriteImages(){
  const cache = {};
  const tasks = [];
  SPRITES.forEach(sprite => {
    if(UNRELEASED_SPRITES.includes(sprite.id)) return;
    const vs = (sprite.variants || VARIANTS).filter(v => !UNRELEASED_VARIANTS.includes(v));
    vs.forEach(v => {
      const path = `assets/${sprite.id}-${v}.webp`;
      tasks.push(
        loadImageAsPNGDataURL(path).then(data => { cache[`${sprite.id}:${v}`] = data; })
      );
    });
  });
  await Promise.all(tasks);
  return cache;
}

async function generatePDFReport(){
  const btn = document.getElementById('pdfBtn');
  const originalLabel = btn.textContent;
  btn.textContent = 'Generating...';
  btn.disabled = true;

  try{
    const [imageCache, bgImage, checkIcon] = await Promise.all([
      preloadSpriteImages(),
      loadImageAsPNGDataURL('assets/back.png'),
      loadImageAsPNGDataURL('assets/check-icon.svg')
    ]);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt', format:'a4', orientation:'landscape'});
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    function drawBackground(){
      if(bgImage){
        try{ doc.addImage(bgImage, 'PNG', 0, 0, pageWidth, pageHeight); }catch(e){}
      }
    }

    // Only released sprites / variants get printed
    const releasedSprites = SPRITES.filter(s => !UNRELEASED_SPRITES.includes(s.id));

    // Layout config — single centered column, one row per sprite
    const marginTop = 30;
    const marginBottom = 30;
    const iconSize = 64;
    const cellW = 84;
    const checkSize = 18;
    const rowGap = 22;
    const rowHeight = iconSize + 6 + checkSize + rowGap;

    const rowsPerPage = Math.max(1, Math.floor((pageHeight - marginTop - marginBottom) / rowHeight));
    const pageCount = Math.max(1, Math.ceil(releasedSprites.length / rowsPerPage));

    for(let p = 0; p < pageCount; p++){
      if(p > 0) doc.addPage();
      drawBackground();

      const pageSprites = releasedSprites.slice(p*rowsPerPage, p*rowsPerPage + rowsPerPage);
      const contentHeight = pageSprites.length * rowHeight;
      const startY = marginTop + Math.max(0, (pageHeight - marginTop - marginBottom - contentHeight) / 2);

      let cursorY = startY;

      pageSprites.forEach(sprite => {
        const vs = (sprite.variants || VARIANTS).filter(v => !UNRELEASED_VARIANTS.includes(v));
        const rowWidth = vs.length * cellW;
        const startX = (pageWidth - rowWidth) / 2 + (cellW - iconSize) / 2;

        let cellX = startX;

        vs.forEach(v => {
          const isCollected = !!state[key(sprite.id, v)];
          const imgData = imageCache[`${sprite.id}:${v}`];

          if(imgData){
            try{
              doc.addImage(imgData, 'PNG', cellX, cursorY, iconSize, iconSize);
            }catch(e){}
          }

          if(isCollected && checkIcon){
            const checkX = cellX + (iconSize - checkSize)/2;
            const checkY = cursorY + iconSize + 6;
            try{
              doc.addImage(checkIcon, 'PNG', checkX, checkY, checkSize, checkSize);
            }catch(e){}
          }

          cellX += cellW;
        });

        cursorY += rowHeight;
      });
    }

    doc.save('extraction-manifesto-report.pdf');
  }catch(err){
    alert('Erro ao gerar o PDF: ' + err.message);
  }finally{
    btn.textContent = originalLabel;
    btn.disabled = false;
  }
}

document.getElementById('exportBtn').addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(state,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'sprite-locker-backup.json';
  a.click();
  URL.revokeObjectURL(url);
});
document.getElementById('importBtn').addEventListener('click', ()=>{
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'application/json';
  input.addEventListener('change', (e)=>{
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = ()=>{
      try{
        const imported = JSON.parse(reader.result);
        state = imported;
        saveState();
        renderGrid();
        renderProgress();
      }catch(err){
        alert('Invalid file format.');
      }
    };
    reader.readAsText(file);
  });
  input.click();
});

renderGrid();
renderProgress();