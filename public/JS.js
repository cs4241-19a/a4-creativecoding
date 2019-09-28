/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
import { theBall, ctx } from './modules/sampleBall.js';
import { ball2 } from './modules/sampleQuick.js';

const canvas = document.getElementById('canvas');
let raf;

ctx.font = '20px Arial';
ctx.fillText('Hello, This is the waiting room', 200, 100);


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball2.draw();
  theBall.draw();
  theBall.x += theBall.vx;
  theBall.y += theBall.vy;
  ball2.x += ball2.vx;
  ball2.y += ball2.vy;

  if (theBall.y + theBall.vy > canvas.height
    || theBall.y + theBall.vy < 0) {
    theBall.vy = -theBall.vy;
  }
  if (theBall.x + theBall.vx > canvas.width
    || theBall.x + theBall.vx < 0) {
    theBall.vx = -theBall.vx;
  }

  if (ball2.y + ball2.vy > canvas.height
    || ball2.y + ball2.vy < 0) {
    ball2.vy = -ball2.vy;
  }
  if (ball2.x + ball2.vx > canvas.width
      || ball2.x + ball2.vx < 0) {
    ball2.vx = -ball2.vx;
  }


  raf = window.requestAnimationFrame(draw);
}

canvas.addEventListener('mouseover', (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener('mouseout', (e) => {
  window.cancelAnimationFrame(raf);
});

theBall.draw();
ball2.draw();
