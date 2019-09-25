const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const warrior = {
  height: 25,
  width: 25,
  x: 25,
  y: 25,
  draw: function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.height, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
  },
};
warrior.draw();
warrior.draw();
warrior.draw();
export default warrior;
