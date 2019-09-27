let canvas = document.getElementById('board');
let ctx;
if (canvas.getContext) {
    ctx = canvas.getContext('2d');
}

const redGradient = ['#cc0000', '#ff6600', '#ff6699', '#ff66ff', '#dba9c9', '#e8d8eb'];
const rainbow = ['#a128ed', '#FF0000', '#0033cc', '#ffff00', '#00ff00', '#eda528', '#2f302f'];
const blueGradient = ['#02031f', '#003399', '#6600cc', '#0099ff', '#9999ff', '#89e0df', '#cce3e3'];
const greyScale = ['#000000', '#595959', '#999999', '#d9d9d9', '#f0f7f7', '#f0f7f7', '#f0f7f7'];

function createCircles(ctx, x, y, fill) {
    ctx.beginPath();
    let radius = 3; // Arc radius
    let startAngle = 0; // Starting point on circle
    let endAngle = 2 * Math.PI; // End point on circle
    ctx.arc(x, y, radius, startAngle, endAngle, false);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.stroke();
}

function pickColor(x, scale) {
    let color;
    if (x < 400) {
        color = scale[0];
    } else if (x >= 400 && x < 800) {
        color = scale[1];
    } else if (x >= 800 && x < 1200) {
        color = scale[2];
    } else if (x >= 1200 && x <= 1600) {
        color = scale[3];
    }
    return color;
}

export {createCircles, canvas, ctx, redGradient, rainbow, blueGradient, greyScale, pickColor};