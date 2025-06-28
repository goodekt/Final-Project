
const arraySize = 40;
let array = [];
let sorting = false;

function randomArray() {
  array = Array.from({length: arraySize}, () => Math.floor(Math.random() * 220) + 30);
  renderArray();
}

function renderArray(activeIndices = [], sortedIndex = -1) {
  const arrayDiv = document.getElementById('array');
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
document.getElementById('shuffleBtn').onclick = () => {
  if (!sorting) randomArray();
};
document.getElementById('sortBtn').onclick = () => {
  if (!sorting) bubbleSort();
};

randomArray();

const bounceingText = document.getElementById('bounce');

bounceingText.addEventListener('click',  function(){
  bounceingText.classList.add('bounce');
  setTimeout(function(){
    bounceingText.classList.remove('bounce');
  },1000);
});