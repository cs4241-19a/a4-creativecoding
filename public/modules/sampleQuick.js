/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
const ctx = canvas.getContext('2d');

const ball2 = {
  x: 200,
  y: 200,
  vx: 20,
  vy: 20,
  radius: 35,
  color: 'blue',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

export { ball2 };
