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

const UNRELEASED_VARIANTS = ['gem', 'holofoil', 'cube', 'quack'];
const UNRELEASED_SPRITES = ['air', 'seven', 'batman', 'johnwick'];

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
let filter = {rarity:'all', search:'', missingOnly:false};

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

function totalSlots(){
  return SPRITES.reduce((acc,s)=> acc + (s.variants || VARIANTS).length, 0);
}
function collectedSlots(){
  return Object.keys(state).filter(k => !k.includes(':_') && state[k]).length;
}
function masteredSlots(){
  return Object.keys(state).filter(k => k.includes(':_mastered') && state[k]).length;
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

function spriteCollectedCount(sprite){
  const vs = sprite.variants || VARIANTS;
  return vs.filter(v => state[key(sprite.id,v)]).length;
}

function renderGrid(){
  const grid = document.getElementById('grid');
  grid.innerHTML = '';
  
  SPRITES.forEach(sprite=>{
    const vs = sprite.variants || VARIANTS;
    const got = spriteCollectedCount(sprite);
    const complete = got === vs.length;
    const matchesRarity = filter.rarity==='all' || sprite.rarity===filter.rarity;
    const matchesSearch = sprite.name.toLowerCase().includes(filter.search.toLowerCase());
    
    const card = document.createElement('div');
    card.className = 'card' + ((matchesRarity && matchesSearch) ? '' : ' hidden');

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
      
      const chip = document.createElement('div');
      const isUnreleased = UNRELEASED_VARIANTS.includes(v) || UNRELEASED_SPRITES.includes(sprite.id);
      
      chip.className = 'chip' + (isCollected ? ' on' : '') + (isUnreleased ? ' unreleased' : '');
      const badge = isUnreleased ? '<span class="chip-badge">Soon</span>' : '';
      
      const currentLevel = state[levelKey(sprite.id, v)] || '1';
      const isMastered = !!state[masterKey(sprite.id, v)];

      chip.innerHTML = `
        <img class="chip-thumb" src="assets/${sprite.id}-${v}.webp" onerror="if(this.dataset.s!=='1'){this.dataset.s='1';this.src='assets/temp-${sprite.id}-cube.webp';}else{this.style.visibility='hidden';}">
        <div>${VARIANT_LABEL[v]}</div>
        ${badge}
        <div class="chip-controls" onclick="event.stopPropagation()">
          <label>LVL:
            <select class="v-lvl" data-sprite="${sprite.id}" data-var="${v}">
              ${[1,2,3,4,5].map(l => `<option value="${l}" ${currentLevel == l ? 'selected' : ''}>${l}</option>`).join('')}
            </select>
          </label>
          <label>
            <span>Mastered</span>
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
          renderGrid(); 
        }
        saveState();
        renderProgress();
      });
      
      chip.querySelector('.v-mast').addEventListener('change', (e) => {
        state[masterKey(sprite.id, v)] = e.target.checked;
        if (e.target.checked) {
          const k = key(sprite.id, v);
          if (!state[k]) {
            state[k] = true;
            renderGrid();
          }
        }
        saveState();
        renderProgress();
      });

      variantsRow.appendChild(chip);
    });
    
    main.appendChild(variantsRow);
    card.appendChild(main);

    if(complete){
      const stamp = document.createElement('div');
      stamp.className = 'stamp-overlay';
      stamp.textContent = 'Extracted';
      card.appendChild(stamp);
    }

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