/* eslint-disable linebreak-style */
/* eslint-disable no-await-in-loop */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable linebreak-style */
let w = 2;
let Slowness = 25;
const wid = screen.width;
let color1 = '#bdf0df';
let color2 = '#d192bf';
let Background = '#453c32';
let Height = screen.height;

let vals = [];
const state = [];

let text;

const TheText = function () {
  this.columns = 2;
  this.Slowness = 25;
  this.color1 = '#bdf0df';
  this.color2 = '#d192bf';
  this.Background = '#453c32';
  this.Height = screen.height;
};


function setVal() {
  w = text.columns;
  Slowness = text.Slowness;
  color1 = text.color1;
  color2 = text.color2;
  Background = text.Background;
  Height = text.Height;
}

window.onload = function () {
  text = new TheText();
  setVal();
  const gui = new dat.GUI();
  gui.add(text, 'columns', 1, 50).onChange(setVal);
  gui.add(text, 'Slowness', 1, 100).onChange(setVal);
  gui.addColor(text, 'color1').onChange(setVal);
  gui.addColor(text, 'color2').onChange(setVal);
  gui.addColor(text, 'Background').onChange(setVal);
  gui.add(text, 'Height', 5, screen.height + 300).onChange(setVal);
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function partition(arr, s, e) {
  for (let i = s; i < e; i += 1) {
    state[i] = 1;
  }

  const pVal = arr[e];
  let pInd = s;

  state[pInd] = 0;
  for (let i = s; i < e; i += 1) {
    if (arr[i] < pVal) {
      await arrange(arr, i, pInd);
      state[pInd] = -1;
      pInd += 1;
      state[pInd] = 0;
    }
  }
  await arrange(arr, pInd, e);

  for (let i = s; i < e; i += 1) {
    if (i !== pInd) {
      state[i] = -1;
    }
  }

  return pInd;
}

async function quickSort(arr, s, e) {
  if (s >= e) {
    return;
  }
  const index = await partition(arr, s, e);
  state[index] = -1;

  await Promise.all([
    quickSort(arr, s, index - 1),
    quickSort(arr, index + 1, e),
  ]);
}


function setup() {
  createCanvas(windowWidth, windowHeight);

  vals = new Array(floor(wid / w));
  for (let i = 0; i < vals.length; i += 1) {
    vals[i] = random(Height);
    state[i] = -1;
  }
  quickSort(vals, 0, vals.length - 1);
}


async function arrange(arr, a, b) {
  await sleep(Slowness);
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}


function draw() {
  background(Background);

  for (let i = 0; i < vals.length; i += 1) {
    noStroke();
    if (state[i] === 1) {
      fill(color2);
    } else {
      // This is the color of the completed part
      fill(color1);
    }
    rect(i * w, Height - vals[i], w, vals[i]);
  }
}
