/* =========================================================
   SEASON 3 — RUNNERS  (your current roster + Release Manager,
   unchanged — same storage keys, so nothing you've already
   collected or marked as released is lost)
   ========================================================= */
const VARIANTS_S3 = ['normal','cube', 'gold', 'quack', 'gummy', 'galaxy', 'gem', 'holofoil'];
const VARIANT_LABEL_S3 = {
  normal: 'Normal',
  gold: 'Gold',
  gummy: 'Gummy',
  galaxy: 'Galaxy',
  holofoil: 'Holofoil',
  gem: 'Gem',
  cube: 'Cube',
  quack: 'Quack',
};

// Approximate drop chances (%) per rarity tier, sourced from fortnite.gg/sprites.
// Some values are extrapolated from the same rarity tier where an exact figure
// wasn't available — treat as a close estimate, not an official guarantee.
const DROP_RATES_S3 = {
  water:       {normal:12.83, gold:0.7,  gummy:0.28, galaxy:0.28, holofoil:0},
  earth:       {normal:12.83, gold:0.7,  gummy:0.28, galaxy:0.28, holofoil:0},
  fire:        {normal:12.83, gold:0.7,  gummy:0.28, galaxy:0.28, holofoil:0},
  fishy:       {normal:13.79, gold:0.17, gummy:0.08, galaxy:0.06, holofoil:0},
  duck:        {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02, holofoil:0},
  ghost:       {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02, holofoil:0},
  king:        {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02, holofoil:0},
  demon:       {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02, holofoil:0},
  aura:        {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02, holofoil:0},
  striker:     {normal:5.74,  gold:0.07, gummy:0.04, galaxy:0.02, holofoil:0},
  dream:       {normal:2.63,  gold:0.03, gummy:0.02, galaxy:0.01, holofoil:0},
  boss:        {normal:2.63,  gold:0.03, gummy:0.02, galaxy:0.01, holofoil:0},
  punk:        {normal:2.05,  gold:0.03, gummy:0.02, galaxy:0.01, holofoil:0},
  zeropoint:   {normal:0.000098, gold:0.0000012, gummy:0.0000006, galaxy:0.0000004, holofoil:0},
  grim:        {normal:0.000098, gold:0.0000012, gummy:0.0000006, galaxy:0.0000004, holofoil:0},
  burntpeanut: {normal:1.01},
  seven:       {normal:6.98, gold:0.31, gummy:0.23, galaxy:0.12, holofoil:0.05},
  batman:      {normal:2.23, gold:0.1, gummy:0.07, galaxy:0.04, holofoil:0.01},
};

const SPRITE_LOCATION_S3 = {
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
  batman: 'Found rarely in Sprite Chests',
};

const SPRITES_S3 = [
  {id:'johnwick',    name:'John Wick',       rarity:'legendary', ability:'Instantly reloads weapons on weapon eliminations.', variants:['normal']},
  {id:'batman',      name:'Batman',          rarity:'legendary', ability:'Gears cooldowns are significantly reduced.', variants:['normal', 'cube', 'gold', 'gummy', 'galaxy', 'holofoil']},
  {id:'water',       name:'Water',           rarity:'rare',      ability:'Regenerates shield near water.', variants:['normal', 'gold', 'quack', 'gummy', 'galaxy', 'gem', 'holofoil']},
  {id:'earth',       name:'Earth',           rarity:'rare',      ability:'Chance for extra rare loot when opening chests.', variants:['normal', 'cube', 'gold', 'quack', 'gummy', 'galaxy', 'gem']},
  {id:'fire',        name:'Fire',            rarity:'rare',      ability:'Fire explosion upon dealing enough damage.', variants:['normal', 'cube','gold', 'quack', 'gummy', 'galaxy', 'holofoil']},
  {id:'duck',        name:'Duck',            rarity:'epic',      ability:'Emotes or jamming regenerates shield.', variants:['normal', 'gold', 'gummy', 'galaxy', 'gem']},
  {id:'ghost',       name:'Ghost',           rarity:'epic',      ability:'Briefly turns invisible after reloading.', variants:['normal', 'gold', 'gummy', 'galaxy', 'holofoil']},
  {id:'dream',       name:'Dream',           rarity:'legendary', ability:'Random item per level, legendary at max level.', variants:['normal', 'cube', 'gold', 'gummy', 'galaxy']},
  {id:'demon',       name:'Demon',           rarity:'epic',      ability:'Steals health upon eliminating an opponent.', variants:['normal', 'gold', 'gummy', 'galaxy', 'gem']},
  {id:'punk',        name:'Punk',            rarity:'legendary', ability:'Mysterious effect... could be nothing or everything.', variants:['normal', 'cube', 'gold', 'gummy', 'galaxy']},
  {id:'king',        name:'King',            rarity:'epic',      ability:'More pickaxe damage.', variants:['normal', 'gold', 'gummy', 'galaxy', 'holofoil']},
  {id:'burntpeanut', name:'Burnt Peanut',    rarity:'mythic',    ability:'Chance for more loot (sometimes mythic) upon elimination.', variants:['normal']},
  {id:'vinijr',      name:'Vini Jr.',        rarity:'mythic',    ability:'Sprinting for a short time makes your slide destructive. Slidekicking enemies increases rate of fire and reload speed.', variants:['normal']},
  {id:'zeropoint',   name:'Zero Point',      rarity:'mythic',    ability:'Creates a mini shield bubble when healing.', variants:['normal', 'cube','gold', 'quack', 'gummy', 'galaxy', 'gem' ,'holofoil']},
  {id:'fishy',       name:'Fishy',           rarity:'rare',      ability:'Increased swim and sprint speed.', variants:['normal', 'cube', 'gold', 'gummy', 'galaxy']},
  {id:'striker',     name:'Striker',         rarity:'epic',      ability:'Overdrive when climbing, vaulting or wall-running.', variants:['normal', 'gold', 'gummy', 'galaxy', 'holofoil']},
  {id:'aura',        name:'Aura',            rarity:'epic',      ability:'Gains Shock Rock charge upon dealing damage.', variants:['normal', 'gold', 'gummy', 'galaxy', 'gem']},
  {id:'boss',        name:'Boss',            rarity:'legendary', ability:'Increases maximum health and shield.', variants:['normal', 'cube', 'gold', 'gummy', 'galaxy']},
  {id:'grim',        name:'Grim',            rarity:'mythic',    ability:'Marks whoever attacks you for a few seconds.', variants:['normal', 'cube','gold', 'gummy', 'galaxy', 'gem' ,'holofoil']},
  {id:'air',         name:'Air',             rarity:'rare',      ability:'Reduces fall damage and increases jump height.', variants:['normal', 'gold', 'gummy', 'galaxy', 'holofoil']},
  {id:'seven',       name:'The Seven',       rarity:'epic',      ability:'Reveals nearby chests and enemies when perfectly scanning.', variants:['normal', 'gold', 'gummy', 'galaxy', 'holofoil']},
  {id:'ironmouse',   name:'Ironmouse',       rarity:'mythic',    ability:'Regenerate health over time when low. While regenerating, gain Cloak and low gravity!', variants:['normal']},
  {id:'pollo',       name:'Pollo',           rarity:'mythic',    ability:'Upon earning an elimination, slowly replenish shield for you and nearby squad members for a duration.', variants:['normal']},
  {id:'llama',       name:'Llama',           rarity:'legendary', ability:'Opening ammo boxes has a chance to grant a weapon upgrade.', variants:['normal', 'gold', 'gummy', 'galaxy', 'gem']},
  {id:'peely',       name:'Peely',           rarity:'legendary', ability:'Emits a ping for players with rare sprites nearby, but marks you on the map.', variants:['normal', 'gold', 'gummy', 'galaxy', 'holofoil']},
];

/* =========================================================
   SEASON 4 — OVERRIDE
   Launched 20 AUG 2026. Sprites below reflect everything Epic
   confirmed at launch. Rarity tiers and exact drop-rate
   percentages have NOT been officially published yet, so the
   rarity values are provisional best guesses — tweak them
   freely once real numbers are known/datamined.
   No variant is pre-marked released here: use the Release
   Manager panel to flip on Normal/Gold/Cheat Master per sprite
   as Epic rolls them out (Normal + Gold are seeded as released
   by default below, since those were confirmed live day one).
   ========================================================= */
const VARIANTS_S4 = ['normal', 'gold', 'cheatmaster'];
const VARIANT_LABEL_S4 = {
  normal: 'Normal',
  gold: 'Gold',
  cheatmaster: 'Cheat Master',
};

// Drop rates not yet published for Override — left empty on purpose.
// formatPct() already renders '—' for any sprite/variant with no entry here.
const DROP_RATES_S4 = {};

// Location/source data not yet published for Override.
const SPRITE_LOCATION_S4 = {};

const SPRITES_S4 = [
  {id:'killswitch', name:'Killswitch',   rarity:'epic',      ability:'Improves accuracy while in Hangtime.', variants:['normal','gold','cheatmaster']},
  {id:'sonic',      name:'Sonic',        rarity:'legendary', ability:'Gotta go fast — noticeably increases sprint speed.', variants:['normal','gold','cheatmaster']},
  {id:'adventure',  name:'Adventure',    rarity:'epic',      ability:'Upgrades a random item in your inventory at each level.', variants:['normal','gold','cheatmaster']},
  {id:'jackrabbit', name:'Jackrabbit',   rarity:'rare',      ability:'Grants an extra jump while mid-air.', variants:['normal','gold','cheatmaster']},
  {id:'tails',      name:'Tails',        rarity:'legendary', ability:'Lets you hover briefly in the air.', variants:['normal','gold','cheatmaster']},
  {id:'8bit',       name:'8-Bit',        rarity:'epic',      ability:'Guarantees an 8-Bit Shotgun in your first chest, with a damage boost.', variants:['normal','gold','cheatmaster']},
  {id:'shadow',     name:'Shadow',       rarity:'epic',      ability:'Automatically reloads weapons over time, even unequipped.', variants:['normal','gold','cheatmaster']},
  {id:'jonesy',     name:'Jonesy',       rarity:'rare',      ability:'Recovers some health or shield a short while after taking damage.', variants:['normal','gold','cheatmaster']},
  {id:'crown',      name:'Crown',        rarity:'mythic',    ability:'Grants bonus Crown Wins after a Victory Royale. Only levels up by winning matches.', variants:['normal','gold','cheatmaster']},
  {id:'klombo',     name:'Klombo',       rarity:'epic',      ability:'Grants a random item at each level.', variants:['normal','gold','cheatmaster']},
  {id:'bush',       name:'Bush',         rarity:'rare',      ability:'Spawns a Bush disguise after a duration; at max level, grants one on elimination.', variants:['normal','gold','cheatmaster']},
  {id:'stormscout', name:'Storm Scout',  rarity:'legendary', ability:'Triggers Overdrive after taking enough storm damage; reveals future storm circles at max level.', variants:['normal','gold','cheatmaster']},
];

/* =========================================================
   SEASON REGISTRY
   ========================================================= */
const SEASONS = {
  s3: {
    id: 's3',
    label: 'Chapter 7',
    subtitle: 'Runners',
    tempTag: 'CH.7 · TEMP.3',
    updated: '25 JUN 2026',
    storageKey: 'spriteLockerCollectionV3',
    releaseKey: 'spriteLockerReleaseV4',
    assetPath: 'assets/runners',
    ratesNote: 'Drop rates are approximate community-sourced figures and may shift with in-game hotfixes or seasonal events.',
    variants: VARIANTS_S3,
    variantLabels: VARIANT_LABEL_S3,
    dropRates: DROP_RATES_S3,
    spriteLocation: SPRITE_LOCATION_S3,
    sprites: SPRITES_S3,
    theme: 'paper',
  },
  s4: {
    id: 's4',
    label: 'Chapter 7',
    subtitle: 'Override',
    tempTag: 'CH.7 · TEMP.4',
    updated: '20 AUG 2026',
    storageKey: 'spriteLockerCollectionV3_s4',
    releaseKey: 'spriteLockerReleaseV4_s4',
    assetPath: 'assets/override',
    ratesNote: 'Drop rates and rarity tiers for Override sprites have not been officially published yet — figures shown are provisional and will be updated as real data becomes available.',
    variants: VARIANTS_S4,
    variantLabels: VARIANT_LABEL_S4,
    dropRates: DROP_RATES_S4,
    spriteLocation: SPRITE_LOCATION_S4,
    sprites: SPRITES_S4,
    theme: 'override',
  },
};

const ACTIVE_SEASON_KEY = 'spriteLockerActiveSeason';
const RARITY_LABEL = {rare:'Rare', epic:'Epic', legendary:'Legendary', mythic:'Mythic'};

let currentSeasonId = localStorage.getItem(ACTIVE_SEASON_KEY) || 's4';
if (!SEASONS[currentSeasonId]) currentSeasonId = 's4';

function season(){ return SEASONS[currentSeasonId]; }

let state = loadState();
let releaseState = loadReleaseState();
let filter = {rarity:'all', search:'', missingOnly:false, showUnreleased:false, viewMode:'grouped'};

function loadState(){
  try{
    const raw = localStorage.getItem(season().storageKey);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveState(){
  localStorage.setItem(season().storageKey, JSON.stringify(state));
}

function loadReleaseState(){
  try{
    const raw = localStorage.getItem(season().releaseKey);
    return raw ? JSON.parse(raw) : {};
  }catch(e){ return {}; }
}
function saveReleaseState(){
  localStorage.setItem(season().releaseKey, JSON.stringify(releaseState));
}

function isReleased(spriteId, variant){
  const k = spriteId + ':' + variant;
  return releaseState[k] === true;
}
function setReleased(spriteId, variant, released){
  const k = spriteId + ':' + variant;
  if (released) {
    releaseState[k] = true;
  } else {
    delete releaseState[k];
  }
  saveReleaseState();
}

// Season 4 has nothing released by default until you touch the Release
// Manager. Since Normal + Gold were confirmed live at launch, seed those
// as released the first time Override's release state is ever loaded
// (only runs once — after that your own toggles are respected).
function seedSeasonDefaults(){
  const s = season();
  if (s.id === 's4' && Object.keys(releaseState).length === 0) {
    s.sprites.forEach(sprite => {
      const vs = sprite.variants || s.variants;
      vs.forEach(v => {
        if (v !== 'cheatmaster') releaseState[sprite.id + ':' + v] = true;
      });
    });
    saveReleaseState();
  }
}
seedSeasonDefaults();

function key(spriteId, variant){ return spriteId + ':' + variant; }
function levelKey(spriteId, variant){ return spriteId + ':' + variant + ':_level'; }
function masterKey(spriteId, variant){ return spriteId + ':' + variant + ':_mastered'; }

function relevantSlots(){
  const s = season();
  const slots = [];
  s.sprites.forEach(sp => {
    const vs = sp.variants || s.variants;
    vs.forEach(v => {
      if(!filter.showUnreleased && !isReleased(sp.id, v)) return;
      slots.push({spriteId: sp.id, variant: v});
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
  const s = season();
  const overlay = document.getElementById('spriteModalOverlay');
  const card = document.getElementById('spriteModalCard');
  const vs = sprite.variants || s.variants;
  const rates = s.dropRates[sprite.id] || {};
  const location = s.spriteLocation[sprite.id];

  const variantRows = vs.map(v => {
    const isUnreleased = !isReleased(sprite.id, v);
    const pct = isUnreleased ? 0 : rates[v];
    return `
      <div class="modal-variant-row${isUnreleased ? ' unreleased' : ''}">
        <img class="modal-variant-thumb" src="${s.assetPath}/${sprite.id}-${v}.webp" onerror="this.style.visibility='hidden'">
        <div class="modal-variant-name">${s.variantLabels[v]}</div>
        <div class="modal-variant-pct">${isUnreleased ? 'Unreleased' : formatPct(pct)}</div>
      </div>
    `;
  }).join('');

  card.innerHTML = `
    <button class="modal-close" id="modalCloseBtn">&times;</button>
    <div class="modal-head">
      <img class="modal-icon" src="${s.assetPath}/${sprite.id}-normal.webp" alt="${sprite.name}" onerror="this.style.visibility='hidden'">
      <div>
        <div class="modal-title">${sprite.name}</div>
        <div class="rarity-tag ${sprite.rarity}" style="display:inline-block;margin-bottom:8px;">${RARITY_LABEL[sprite.rarity]}</div>
        <div class="modal-ability">${sprite.ability}</div>
        ${location ? `<div class="modal-meta"><div>LOCATION: <b>${location}</b></div></div>` : ''}
      </div>
    </div>
    <div class="modal-variants-title">Variant Drop Chances</div>
    ${variantRows}
    <div class="modal-note">${s.ratesNote}</div>
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
  const vs = sprite.variants || season().variants;
  return vs.filter(v => state[key(sprite.id,v)]).length;
}

function renderGrid(){
  const grid = document.getElementById('grid');

  if(filter.viewMode === 'individual'){
    grid.classList.add('individual-view');
    renderGridIndividual();
    return;
  }
  grid.classList.remove('individual-view');

  const s = season();
  grid.innerHTML = '';

  s.sprites.forEach(sprite=>{
    const vs = sprite.variants || s.variants;
    const matchesRarity = filter.rarity==='all' || sprite.rarity===filter.rarity;
    const matchesSearch = sprite.name.toLowerCase().includes(filter.search.toLowerCase());

    const hasReleasedVariant = vs.some(v => isReleased(sprite.id, v));
    const matchesUnreleased = filter.showUnreleased || hasReleasedVariant;

    const card = document.createElement('div');
    card.className = 'card' + ((matchesRarity && matchesSearch && matchesUnreleased) ? '' : ' hidden');

    const img = document.createElement('img');
    img.className = 'icon';
    img.src = `${s.assetPath}/${sprite.id}-normal.webp`;
    img.alt = sprite.name;
    img.dataset.stage = '0';
    img.onerror = function(){
      if(this.dataset.stage === '0'){
        this.dataset.stage = '1';
        this.src = `${s.assetPath}/${sprite.id}-normal.webp`;
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

      const isUnreleased = !isReleased(sprite.id, v);
      if(isUnreleased && !filter.showUnreleased) return;

      const chip = document.createElement('div');
      const currentLevel = state[levelKey(sprite.id, v)] || '1';
      const isMastered = !!state[masterKey(sprite.id, v)];

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
        <img class="chip-thumb" src="${s.assetPath}/${sprite.id}-${v}.webp" onerror="if(this.dataset.s!=='1'){this.dataset.s='1';this.src='${s.assetPath}/temp-${sprite.id}-cube.webp';}else{this.style.visibility='hidden';}">
        <div>${s.variantLabels[v]}</div>
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

function renderGridIndividual(){
  const s = season();
  const grid = document.getElementById('grid');
  grid.innerHTML = '';

  s.sprites.forEach(sprite=>{
    const vs = sprite.variants || s.variants;
    const matchesRarity = filter.rarity==='all' || sprite.rarity===filter.rarity;
    const matchesSearch = sprite.name.toLowerCase().includes(filter.search.toLowerCase());
    if(!matchesRarity || !matchesSearch) return;

    vs.forEach(v=>{
      const isCollected = !!state[key(sprite.id,v)];
      if(filter.missingOnly && isCollected) return;

      const isUnreleased = !isReleased(sprite.id, v);
      if(isUnreleased && !filter.showUnreleased) return;

      const currentLevel = state[levelKey(sprite.id, v)] || '1';
      const isMastered = !!state[masterKey(sprite.id, v)];

      let isPremium = false;
      if (sprite.id === 'dream') {
        isPremium = isCollected && isMastered;
      } else {
        isPremium = isCollected && currentLevel === '5' && isMastered;
      }

      const chip = document.createElement('div');
      chip.className = 'chip solo-card' + (isCollected ? ' on' : '') + (isUnreleased ? ' unreleased' : '') + (isPremium ? ' premium-complete' : '');

      const badge = isUnreleased ? '<span class="chip-badge">Soon</span>' : '';
      const premiumLabel = isPremium ? '<span class="premium-badge">Done</span>' : '';

      chip.innerHTML = `
        ${premiumLabel}
        <div class="solo-top">
          <div class="solo-name">${sprite.name}</div>
          <div class="rarity-tag ${sprite.rarity}">${RARITY_LABEL[sprite.rarity]}</div>
        </div>
        <div class="solo-variant">${s.variantLabels[v]}</div>
        <img class="chip-thumb solo-thumb" src="${s.assetPath}/${sprite.id}-${v}.webp" onerror="if(this.dataset.s!=='1'){this.dataset.s='1';this.src='${s.assetPath}/temp-${sprite.id}-cube.webp';}else{this.style.visibility='hidden';}">
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

      grid.appendChild(chip);
    });
  });
}

/* ================= RELEASE MANAGER ================= */
function renderReleaseManager(){
  const s = season();
  const grid = document.getElementById('releaseGrid');
  grid.innerHTML = '';

  s.sprites.forEach(sprite => {
    const vs = sprite.variants || s.variants;
    const group = document.createElement('div');
    group.className = 'release-sprite-group';

    const allReleased = vs.every(v => isReleased(sprite.id, v));

    const nameDiv = document.createElement('div');
    nameDiv.className = 'release-sprite-name';
    nameDiv.innerHTML = `${sprite.name} <span class="toggle-all" data-sprite="${sprite.id}">${allReleased ? 'Unmark All' : 'Mark All'}</span>`;
    group.appendChild(nameDiv);

    const variantList = document.createElement('div');
    variantList.className = 'release-variant-list';

    vs.forEach(v => {
      const chip = document.createElement('div');
      const released = isReleased(sprite.id, v);
      chip.className = 'release-variant-chip' + (released ? ' released' : '');
      chip.textContent = s.variantLabels[v];
      chip.dataset.sprite = sprite.id;
      chip.dataset.variant = v;
      chip.addEventListener('click', () => {
        setReleased(sprite.id, v, !released);
        renderReleaseManager();
        renderGrid();
        renderProgress();
      });
      variantList.appendChild(chip);
    });

    group.appendChild(variantList);
    grid.appendChild(group);
  });

  // Toggle All for a specific sprite
  grid.querySelectorAll('.toggle-all').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const spriteId = btn.dataset.sprite;
      const curSeason = season();
      const sprite = curSeason.sprites.find(sp => sp.id === spriteId);
      const vs = sprite.variants || curSeason.variants;
      const allReleased = vs.every(v => isReleased(spriteId, v));

      vs.forEach(v => {
        setReleased(spriteId, v, !allReleased);
      });
      renderReleaseManager();
      renderGrid();
      renderProgress();
    });
  });
}

// Release Manager buttons
document.getElementById('releaseManagerBtn').addEventListener('click', () => {
  const panel = document.getElementById('releasePanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
  if (panel.style.display === 'block') {
    renderReleaseManager();
  }
});

document.getElementById('closeReleasePanel').addEventListener('click', () => {
  document.getElementById('releasePanel').style.display = 'none';
});

document.getElementById('toggleAllReleased').addEventListener('click', () => {
  season().sprites.forEach(sprite => {
    const vs = sprite.variants || season().variants;
    vs.forEach(v => setReleased(sprite.id, v, true));
  });
  renderReleaseManager();
  renderGrid();
  renderProgress();
});

document.getElementById('toggleAllUnreleased').addEventListener('click', () => {
  season().sprites.forEach(sprite => {
    const vs = sprite.variants || season().variants;
    vs.forEach(v => setReleased(sprite.id, v, false));
  });
  renderReleaseManager();
  renderGrid();
  renderProgress();
});

/* =========================================================
   SEASON SWITCHING
   ========================================================= */
function renderHeader(){
  const s = season();
  document.getElementById('seasonSubtitle').textContent = s.subtitle;
  document.getElementById('seasonUpdated').textContent = s.updated;
  document.getElementById('tapeLabel').textContent = s.tempTag;
  document.getElementById('footerTempTag').textContent = s.tempTag;
  document.title = `Sprite Tracker — ${s.subtitle} Season`;
  if (currentView === 'sprites') {
    document.body.setAttribute('data-season', s.theme);
  }

  document.querySelectorAll('.season-tab[data-season]').forEach(tab=>{
    tab.classList.toggle('active', currentView === 'sprites' && tab.dataset.season === currentSeasonId);
  });
}

function switchSeason(id){
  if(!SEASONS[id]) return;
  currentSeasonId = id;
  localStorage.setItem(ACTIVE_SEASON_KEY, id);
  filter = {rarity:'all', search:'', missingOnly:false, showUnreleased:false, viewMode:'grouped'};
  document.getElementById('search').value = '';
  document.querySelectorAll('.pill[data-rarity]').forEach(p=>p.classList.toggle('active', p.dataset.rarity==='all'));
  document.getElementById('missingOnly').classList.remove('active');
  document.getElementById('showUnreleased').classList.remove('active');
  document.getElementById('individualView').classList.remove('active');
  document.getElementById('grid').classList.remove('individual-view');

  state = loadState();
  releaseState = loadReleaseState();
  seedSeasonDefaults();

  renderHeader();
  renderGrid();
  renderProgress();

  const panel = document.getElementById('releasePanel');
  if (panel.style.display === 'block') {
    renderReleaseManager();
  }
}

/* =========================================================
   TOP-LEVEL VIEW SWITCHING (XP Pace Tracker vs Sprites)
   ========================================================= */
const ACTIVE_VIEW_KEY = 'spriteLockerActiveView';
let currentView = localStorage.getItem(ACTIVE_VIEW_KEY) || 'xp';

function switchView(view, seasonId){
  currentView = view;
  localStorage.setItem(ACTIVE_VIEW_KEY, view);

  document.getElementById('xpView').classList.toggle('active', view === 'xp');
  document.getElementById('spritesView').classList.toggle('active', view === 'sprites');

  document.querySelectorAll('.season-tab').forEach(tab=>{
    const isActive = view === 'xp' ? tab.dataset.view === 'xp' : tab.dataset.season === seasonId;
    tab.classList.toggle('active', isActive);
  });

  if (view === 'xp') {
    // XP tracker always uses the Override (hacking) look, as requested.
    document.body.setAttribute('data-season', 'override');
  } else {
    switchSeason(seasonId);
  }
}

document.querySelectorAll('.season-tab').forEach(tab=>{
  tab.addEventListener('click', () => {
    if (tab.dataset.view === 'xp') {
      switchView('xp');
    } else {
      switchView('sprites', tab.dataset.season);
    }
  });
});

/* ================= FILTERS ================= */
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
document.getElementById('individualView').addEventListener('click', function(){
  filter.viewMode = filter.viewMode === 'individual' ? 'grouped' : 'individual';
  this.classList.toggle('active', filter.viewMode === 'individual');
  renderGrid();
});
document.getElementById('search').addEventListener('input', (e)=>{
  filter.search = e.target.value;
  renderGrid();
});
document.getElementById('resetBtn').addEventListener('click', ()=>{
  if(confirm(`Reset all saved progress for ${season().subtitle}?`)){
    state = {};
    saveState();
    renderGrid();
    renderProgress();
  }
});
document.getElementById('pdfBtn').addEventListener('click', generatePDFReport);

function imageToDataURL(imgSrc, opts, label){
  const { maxDim = null, format = 'png', quality = 0.85 } = opts || {};
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try{
        let w = img.naturalWidth || 64;
        let h = img.naturalHeight || 64;
        if(maxDim && Math.max(w, h) > maxDim){
          const scale = maxDim / Math.max(w, h);
          w = Math.max(1, Math.round(w * scale));
          h = Math.max(1, Math.round(h * scale));
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        if(format === 'jpeg'){
          // JPEG has no alpha channel — flatten onto white first, otherwise
          // transparent PNGs/SVGs turn solid black when exported as JPEG.
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
        }
        ctx.drawImage(img, 0, 0, w, h);
        const mime = format === 'jpeg' ? 'image/jpeg' : 'image/png';
        resolve(canvas.toDataURL(mime, quality));
      }catch(e){
        console.warn('[PDF] failed to encode image', label || imgSrc, e);
        resolve(null);
      }
    };
    img.onerror = () => {
      console.warn('[PDF] failed to load image', label || imgSrc);
      resolve(null);
    };
    img.src = imgSrc;
  });
}

// Tries fetch()+blob first (avoids canvas "tainted" errors some browsers throw
// when converting file:// -loaded <img> elements), falls back to direct Image load.
// opts: { maxDim, format: 'png'|'jpeg', quality } — used to downscale/compress
// images before embedding them in the PDF, keeping report size manageable.
async function loadImageAsDataURL(src, opts){
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
      const out = await imageToDataURL(dataUrl, opts, src);
      if(out) return out;
    } else {
      console.warn('[PDF] asset not found (' + res.status + '):', src);
    }
  }catch(e){
    console.warn('[PDF] fetch failed, falling back to direct load:', src, e);
  }
  return imageToDataURL(src, opts, src);
}

async function preloadSpriteImages(){
  const s = season();
  const cache = {};
  const tasks = [];
  s.sprites.forEach(sprite => {
    const vs = (sprite.variants || s.variants).filter(v => isReleased(sprite.id, v));
    vs.forEach(v => {
      const path = `${s.assetPath}/${sprite.id}-${v}.webp`;
      // Icons are drawn at 64pt in the PDF — 200px (~2x for print sharpness)
      // is plenty; keeping the source's native resolution was the main
      // reason past reports ballooned in size.
      tasks.push(
        loadImageAsDataURL(path, {maxDim: 200, format: 'png'}).then(data => { cache[`${sprite.id}:${v}`] = data; })
      );
    });
  });
  await Promise.all(tasks);
  return cache;
}

async function generatePDFReport(){
  const s = season();
  const btn = document.getElementById('pdfBtn');
  const originalLabel = btn.textContent;
  btn.textContent = 'Generating...';
  btn.disabled = true;

  try{
    const [imageCache, bgImage, checkIcon] = await Promise.all([
      preloadSpriteImages(),
      // Background and check-icon now live alongside each season's sprites
      // (assets/<season>/back.png, assets/<season>/check-icon.svg) so each
      // season can ship its own report background.
      // Background has no transparency, so JPEG at a decent quality — plus
      // capping its resolution to what an A4 page actually needs at print
      // DPI — is the other big win for file size vs. lossless full-res PNG.
      loadImageAsDataURL(`${s.assetPath}/back.png`, {maxDim: 1800, format: 'jpeg', quality: 0.8}),
      loadImageAsDataURL(`${s.assetPath}/check-icon.svg`, {maxDim: 64, format: 'png'})
    ]);

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({unit:'pt', format:'a4', orientation:'landscape', compress:true});
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    function drawBackground(){
      if(bgImage){
        try{ doc.addImage(bgImage, 'JPEG', 0, 0, pageWidth, pageHeight); }catch(e){}
      }
    }

    // Only released sprites / variants get printed
    const releasedSprites = s.sprites.filter(sp => {
      const vs = sp.variants || s.variants;
      return vs.some(v => isReleased(sp.id, v));
    });

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
        const vs = (sprite.variants || s.variants).filter(v => isReleased(sprite.id, v));
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

    doc.save(`extraction-manifesto-report-${s.id}.pdf`);
  }catch(err){
    alert('Erro ao gerar o PDF: ' + err.message);
  }finally{
    btn.textContent = originalLabel;
    btn.disabled = false;
  }
}

document.getElementById('exportBtn').addEventListener('click', ()=>{
  const exportData = {
    season: season().id,
    state: state,
    releaseState: releaseState,
    exportedAt: new Date().toISOString()
  };
  const blob = new Blob([JSON.stringify(exportData,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `sprite-locker-backup-${season().id}.json`;
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
        if (imported.state) {
          state = imported.state;
          saveState();
        }
        if (imported.releaseState) {
          releaseState = imported.releaseState;
          saveReleaseState();
        }
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

/* =========================================================
   XP PACE TRACKER
   ========================================================= */
const xpEl = {
  nivelAtual: document.getElementById('nivelAtual'),
  xpDentroNivel: document.getElementById('xpDentroNivel'),
  nivelAlvo: document.getElementById('nivelAlvo'),
  xpMedioNivel: document.getElementById('xpMedioNivel'),
  dataInicio: document.getElementById('dataInicio'),
  dataFim: document.getElementById('dataFim'),
};

document.querySelectorAll('.pill[data-xptab]').forEach(pill=>{
  pill.addEventListener('click', ()=>{
    document.querySelectorAll('.pill[data-xptab]').forEach(p=>p.classList.remove('active'));
    pill.classList.add('active');
    document.querySelectorAll('.xp-tab-content').forEach(c=>c.classList.remove('active'));
    document.getElementById(pill.dataset.xptab).classList.add('active');
  });
});

xpEl.dataInicio.addEventListener('click', function(){ try{ this.showPicker(); }catch(e){} });
xpEl.dataFim.addEventListener('click', function(){ try{ this.showPicker(); }catch(e){} });

function calcularXP(){
  const nivelAtual = parseInt(xpEl.nivelAtual.value) || 0;
  const xpDentro = parseInt(xpEl.xpDentroNivel.value) || 0;
  const nivelAlvo = parseInt(xpEl.nivelAlvo.value) || 200;
  const xpPorNivel = parseInt(xpEl.xpMedioNivel.value) || 80000;

  const dataInicio = new Date(xpEl.dataInicio.value);
  const dataFim = new Date(xpEl.dataFim.value);
  const hoje = new Date();

  const totalDiasEpoca = Math.max(1, Math.ceil((dataFim - dataInicio) / 86400000));
  const diasPassados = Math.max(0, Math.ceil((hoje - dataInicio) / 86400000));
  const diasRestantes = Math.max(1, Math.ceil((dataFim - hoje) / 86400000));
  const pctEpoca = Math.min(100, Math.max(0, Math.round((diasPassados / totalDiasEpoca) * 100)));

  document.getElementById('statDaysLeft').textContent = diasRestantes;
  document.getElementById('statSeasonPct').textContent = pctEpoca + '%';
  document.getElementById('xpDaysLeft').textContent = diasRestantes;
  document.getElementById('xpSeasonPct').textContent = pctEpoca + '%';

  const bpPct = Math.min(100, Math.max(0, (nivelAtual / 100) * 100));
  document.getElementById('bpProgressBar').style.width = bpPct + '%';
  document.getElementById('bpPctText').textContent = Math.round(bpPct) + '%';

  const bonusPct = Math.min(100, Math.max(0, (nivelAtual / 200) * 100));
  document.getElementById('bonusProgressBar').style.width = bonusPct + '%';
  document.getElementById('bonusPctText').textContent = Math.round(bonusPct) + '%';

  const xpTotalAtual = (nivelAtual * xpPorNivel) + xpDentro;
  const xpTotalAlvo = nivelAlvo * xpPorNivel;
  const xpEmFalta = Math.max(0, xpTotalAlvo - xpTotalAtual);
  const xpPorDia = Math.round(xpEmFalta / diasRestantes);

  document.getElementById('xpEmFaltaDisplay').textContent = xpEmFalta.toLocaleString('pt-PT');
  document.getElementById('xpPorDiaDisplay').textContent = xpPorDia.toLocaleString('pt-PT') + ' XP/day';
  document.getElementById('statXpDay').textContent = xpPorDia.toLocaleString('pt-PT');
  document.getElementById('xpDayNeededMeta').textContent = xpPorDia.toLocaleString('pt-PT');

  const nivelEsperado100 = Math.min(100, Math.round((100 / totalDiasEpoca) * diasPassados));
  const nivelEsperado200 = Math.min(200, Math.round((200 / totalDiasEpoca) * diasPassados));
  document.getElementById('statLevel100').textContent = nivelEsperado100;
  document.getElementById('statLevel200').textContent = nivelEsperado200;

  gerarTabelaPaceXP(dataInicio, totalDiasEpoca, xpPorNivel);
}

function gerarTabelaPaceXP(dataInicio, totalDias, xpPorNivel){
  const tbody = document.getElementById('paceTableBody');
  tbody.innerHTML = '';
  for(let i = 1; i <= totalDias; i++){
    const dataCorrente = new Date(dataInicio);
    dataCorrente.setDate(dataCorrente.getDate() + (i - 1));

    const nivel100Meta = Math.min(100, Math.round((100 / totalDias) * i));
    const xp100Meta = Math.round(nivel100Meta * xpPorNivel);
    const nivel200Meta = Math.min(200, Math.round((200 / totalDias) * i));
    const xp200Meta = Math.round(nivel200Meta * xpPorNivel);

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${dataCorrente.toLocaleDateString('pt-PT')}</td>
      <td>${i}</td>
      <td>${nivel100Meta}</td>
      <td>${xp100Meta.toLocaleString('pt-PT')}</td>
      <td>${nivel200Meta}</td>
      <td>${xp200Meta.toLocaleString('pt-PT')}</td>
    `;
    tbody.appendChild(tr);
  }
}

function guardarXP(){
  localStorage.setItem('xp_nivelAtual', xpEl.nivelAtual.value);
  localStorage.setItem('xp_xpDentro', xpEl.xpDentroNivel.value);
  localStorage.setItem('xp_nivelAlvo', xpEl.nivelAlvo.value);
  localStorage.setItem('xp_xpMedio', xpEl.xpMedioNivel.value);
  localStorage.setItem('xp_dataInicio', xpEl.dataInicio.value);
  localStorage.setItem('xp_dataFim', xpEl.dataFim.value);
  calcularXP();
}

function carregarXP(){
  xpEl.nivelAtual.value = localStorage.getItem('xp_nivelAtual') || '0';
  xpEl.xpDentroNivel.value = localStorage.getItem('xp_xpDentro') || '0';
  xpEl.nivelAlvo.value = localStorage.getItem('xp_nivelAlvo') || '200';
  xpEl.xpMedioNivel.value = localStorage.getItem('xp_xpMedio') || '80000';
  xpEl.dataInicio.value = localStorage.getItem('xp_dataInicio') || '2026-08-20';
  xpEl.dataFim.value = localStorage.getItem('xp_dataFim') || '2026-10-31';
  calcularXP();
}

document.getElementById('btnGuardar').addEventListener('click', guardarXP);
document.getElementById('btnGuardarEpoca').addEventListener('click', guardarXP);
document.getElementById('btnReset').addEventListener('click', ()=>{
  if(confirm('Reset all saved XP tracker progress?')){
    ['xp_nivelAtual','xp_xpDentro','xp_nivelAlvo','xp_xpMedio','xp_dataInicio','xp_dataFim'].forEach(k=>localStorage.removeItem(k));
    carregarXP();
  }
});
[xpEl.nivelAtual, xpEl.xpDentroNivel, xpEl.nivelAlvo, xpEl.xpMedioNivel, xpEl.dataInicio, xpEl.dataFim].forEach(el=>{
  el.addEventListener('input', calcularXP);
});

carregarXP();

/* =========================================================
   INITIAL RENDER
   ========================================================= */
renderHeader();
renderGrid();
renderProgress();

if (currentView === 'sprites') {
  switchView('sprites', SEASONS[currentSeasonId] ? currentSeasonId : 's4');
} else {
  switchView('xp');
}
