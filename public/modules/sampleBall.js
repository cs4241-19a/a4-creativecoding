/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
const ctx = canvas.getContext('2d');

const theBall = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 55,
  color: 'red',
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};


export { theBall, ctx };
