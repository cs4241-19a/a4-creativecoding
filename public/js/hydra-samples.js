export let hydra_samples = {
    'spiraltrap': 'shape(2).scale(0.1).modulate(noise(3,1)).rotate(0,0.2)\n' +
        '.modulateRotate(osc(2),Math.sin(1*time)).modulateScale(osc(3,0.5)\n' +
        '.rotate(0,0.5),-0.8).modulateRotate(src(o0),-1).rotate(0,0.5)\n' +
        '.blend(src(o0),1.9).diff(o0,0.5).rotate(0,-0.1).luma(0.2).out()',
    'creepy': 'voronoi(5,1,5).brightness(()=>Math.random()*0.15)\n' +
        '.modulatePixelate(noise(20,1),100)\n' +
        '.out()',
    'wavelength': 'src(o0)\n' +
        ' .modulate(o0, 0.0001)\n' +
        ' .layer(shape(3, 0.3, 0).diff(shape()).rotate(0, 0.1).repeat([1, 1], 1).scale([0.1, 0.2, 0.5, 1, 2].fast()).scrollX(0, 0).luma(0.6).invert(() => Math.sin(time)))\n' +
        ' .modulateRotate(osc(10, 0.1, 0.2), -0.01)\n' +
        ' .scrollX(-0.001)\n' +
        ' .out()',
    'flowery': 'osc(10,0.2,0.8).repeat(2,2).modulate(noise(5),0.001)\n' +
        '  .pixelate(10,10)\n' +
        '  .modulatePixelate(noise(0.9).kaleid(3).modulate(o0,0.09),10,0.9).contrast(1.6)\n' +
        '  .out()',
    'split': 'gradient(1).color([1,0,0,1,0],[0,1,0,1,0],[0,0,1,1,0])\n' +
        '.add(osc(2, 0.2, 2).rotate(2, -1).pixelate(-2))\n' +
        '.out()',
    'pixels': 'noise(100, 0.4)\n' +
        '  .pixelate(40,40)\n' +
        '  .mult(osc(1000, 0.001, 0.8).rotate(Math.PI * 0.5))\n' +
        '  .mult(osc(100, () => (time / 0.005) % 0.005, 0.5).color(0.5, 4, 4))\n' +
        '  .kaleid(2)\n' +
        '  .out()\n',
    'disc': 'noise()\n' +
        '  .mult(osc(10,0.25,1))\n' +
        '  .scrollY(1,0.25)\n' +
        '  .pixelate([100,40,20,70].fast(0.25))\n' +
        '  .modulateRotate(src(o0).scale(0.5),0.5)\n' +
        '  .diff(src(o0).rotate([-0.05,0.05].fast(0.5)))\n' +
        '  .out(o0)',
    'chocolate': 'voronoi()\n' +
        '  .color(0.9,0.25,0.15)\n' +
        '  .rotate(({time})=>(time%360)/2)\n' +
        '  .modulate(osc(25,0.1,0.5)\n' +
        '            .kaleid(50)\n' +
        '            .scale(({time})=>Math.sin(time*1)*0.5+1)\n' +
        '            .modulate(noise(0.6,0.5)),\n' +
        '            0.5)\n' +
        '  .out(o0)',
    'algae': 'osc(10,-0.25,1).color(0,0,1).saturate(2).kaleid(50)\n' +
        '  .mask(noise(25,2).modulateScale(noise(0.25,0.05)))\n' +
        '  .modulateScale(osc(6,-0.5,2).kaleid(50))\n' +
        '  .mult(osc(3,-0.25,2).kaleid(50))\n' +
        '  .scale(0.5,0.5,0.75)\n' +
        '  .out()',
    'acid': 'osc(8, 0.1, 1.5)\n' +
        '.modulate(src(o0).rotate(0.5, 0.1))\n' +
        '.modulate(src(o0).rotate(0.3, 0.1))\n' +
        '.repeat()\n' +
        '.modulateRotate(noise(5, 0.1, 100))\n' +
        '.out()',
    'camera_trip': 's0.initCam()\n' +
        'osc(8, 0.1, 1.5)\n' +
        '.modulate(src(o0).rotate(0.5, 0.1))\n' +
        '.modulate(src(o0).rotate(0.3, 0.1))\n' +
        '.repeat()\n' +
        '.modulateRotate(noise(5, 0.1, 100))\n' +
        '.diff(src(s0).repeat().kaleid())\n' +
        '.diff(src(s0).rotate(0.2, 0.5).diff(src(s0).rotate(-0.2, 0.5)))\n' +
        '.diff(shape(2).rotate(1, -0.3).scale(({time}) => Math.sin(time)))\n' +
        '.out()'
};
