/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
let color1 = '#5e4c1d';
let color2 = '#c8cee2';
let Height = screen.height;

let val = [];

let i = 0;


let text;

// This is where we set the starting values it seems
const TheText = function () {
  this.Slowness = 25;
  this.color1 = '#5e4c1d';
  this.color2 = '#c8cee2';
  this.Background = '#453c32';
  this.Height = screen.height;
};

function setVal() {
  color1 = text.color1;
  color2 = text.color2;
  Height = text.Height;
}

window.onload = function () {
  text = new TheText();
  setVal();
  const gui = new dat.GUI();
  gui.addColor(text, 'color1').onChange(setVal);
  gui.addColor(text, 'color2').onChange(setVal);
  gui.add(text, 'Height', 5, screen.height + 300).onChange(setVal);
};


function setup() {
  createCanvas(windowWidth, windowHeight);
  val = new Array(floor(width));
  for (let ind = 0; ind < val.length; ind += 1) {
    val[ind] = random(Height);
  }
}

function arrange(arr, alpha, g) {
  const temp = arr[alpha];
  arr[alpha] = arr[g];
  arr[g] = temp;
}

function draw() {
  background(color2);

  if (i < val.length) {
    for (let h = 0; h < val.length - i - 1; h += 1) {
      const alpha = val[h];
      const k = val[h + 1];
      if (alpha > k) {
        arrange(val, h, h + 1);
      }
    }
  } else {
    noLoop();
  }

  i += 1;

  for (let index = 0; index < val.length; index += 1) {
    stroke(color1);

    line(index, Height, index, Height - val[index]);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
