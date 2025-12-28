/* =========================================
   1. BUBBLE SORT ALGORITHM
   ========================================= */
const arraySize = 40;
let array = [];
let sorting = false;

function randomArray() {
  array = Array.from({length: arraySize}, () => Math.floor(Math.random() * 220) + 30);
  renderArray();
}

function renderArray(activeIndices = [], sortedIndex = -1) {
  const arrayDiv = document.getElementById('array');
  if(!arrayDiv) return; // Guard clause if element missing
  arrayDiv.innerHTML = '';
  array.forEach((value, idx) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = value + 'px';
    if (activeIndices.includes(idx)) bar.classList.add('active');
    if (idx >= sortedIndex) bar.classList.add('sorted');
    arrayDiv.appendChild(bar);
  });
}

async function bubbleSort() {
  sorting = true;
  document.getElementById('sortBtn').disabled = true;
  document.getElementById('shuffleBtn').disabled = true;
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      renderArray([j, j+1], n - i);
      await sleep(15);
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        renderArray([j, j+1], n - i);
        await sleep(15);
      }
    }
  }
  renderArray([], 0);
  sorting = false;
  document.getElementById('sortBtn').disabled = false;
  document.getElementById('shuffleBtn').disabled = false;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const shuffleBtn = document.getElementById('shuffleBtn');
const sortBtn = document.getElementById('sortBtn');

if(shuffleBtn) {
    shuffleBtn.onclick = () => {
    if (!sorting) randomArray();
    };
}
if(sortBtn) {
    sortBtn.onclick = () => {
    if (!sorting) bubbleSort();
    };
}

// Initialize Array
randomArray();


/* =========================================
   2. TYPEWRITER EFFECT
   ========================================= */
const textToType = "Mechanical & Aerospace Engineering Student";
const typeWriterElement = document.getElementById('typewriter');
let charIndex = 0;

function typeWriter() {
  if (typeWriterElement && charIndex < textToType.length) {
    typeWriterElement.innerHTML += textToType.charAt(charIndex);
    charIndex++;
    setTimeout(typeWriter, 50); 
  }
}

window.onload = typeWriter;


/* =========================================
   3. SCROLL REVEAL ANIMATION
   ========================================= */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
    }
  });
});

const hiddenElements = document.querySelectorAll('.reveal');
hiddenElements.forEach((el) => observer.observe(el));


/* =========================================
   4. ROCKET BACK-TO-TOP BUTTON
   ========================================= */
const rocketBtn = document.getElementById("rocketBtn");

window.onscroll = function() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    if(rocketBtn) rocketBtn.style.display = "block";
  } else {
    if(rocketBtn) {
        rocketBtn.style.display = "none";
        rocketBtn.classList.remove("fly-away");
    }
  }
};

function scrollToTop() {
  if(rocketBtn) rocketBtn.classList.add("fly-away");
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/* =========================================
   5. BOUNCE ANIMATION
   ========================================= */
const bounceingText = document.getElementById('bounce');
if(bounceingText) {
    bounceingText.addEventListener('click', function(){
    bounceingText.classList.add('bounce');
    setTimeout(function(){
        bounceingText.classList.remove('bounce');
    }, 1000);
    });
}

/* =========================================
   6. CUSTOM CURSOR & HOVER EFFECTS
   ========================================= */
const cursor = document.getElementById('cursor');
const hoverTargets = document.querySelectorAll('a, button, .card');

// Move cursor with mouse
document.addEventListener('mousemove', (e) => {
  if(cursor) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  }
});

// Add "hovering" class to body when over interactive elements
hoverTargets.forEach(target => {
  target.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
  target.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
});


/* =========================================
   7. 3D TILT EFFECT (Framer Style)
   ========================================= */
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // Mouse X inside card
    const y = e.clientY - rect.top;  // Mouse Y inside card
    
    // Calculate rotation (max 10 degrees)
    const xPct = x / rect.width;
    const yPct = y / rect.height;
    
    const xRotation = (yPct - 0.5) * 20; // Rotate X axis (up/down tilt)
    const yRotation = (xPct - 0.5) * -20; // Rotate Y axis (left/right tilt)
    
    // Apply the transform
    card.style.transform = `rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.02)`;
  });

  // Reset when mouse leaves
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0) rotateY(0) scale(1)';
  });
});