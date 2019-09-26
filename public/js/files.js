/* downloads the image */
function saveImage () {
  var link = document.getElementById('link');
  link.setAttribute('download', 'webwaredrawing.png');
  link.setAttribute('href', document.getElementById('canvasArea').toDataURL('image/png').replace('image/png', 'image/octet-stream'));
  link.click();
}

/* clicks the hidden file selector */
function triggerClick () {
  document.getElementById('file').click();
}

export { saveImage, triggerClick };
