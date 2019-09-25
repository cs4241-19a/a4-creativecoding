const createInstructions = function () {
  $('#instructionsPage').removeClass('active').addClass('active')
  $('#customPage').removeClass('active')
  $('#examplePage').removeClass('active')
  $('svg').remove()
  $('.main').remove()
  $('#customForm').empty()
  $('#instructions').empty().append('<div class="card-body">\n' +
        '            <h5 class="card-title">Instructions</h5>\n' +
        '            <h6 class="card-subtitle mb-2 text-muted">everything there is to know about using this application</h6>\n' +
        '            <p class="card-text">The application is separated in the three areas Instructions, an example family tree\n' +
        '                and the custom family tree option. <br>\n' +
        '                When you are working with a family tree you can zoom and move it around and use the controls gui to\n' +
        '                change colors or the width and height of the tree nodes.<br>\n' +
        '                In the custom tree form you first have to add the name of one starting person and can then add a spouse.\n' +
        "                Only after a spouse was added it's possible to also add children. It's also possible to add a second\n" +
        '                spouse and different children.<br>\n' +
        '                Currently only one generation is supported in the custom family tree option.</p>\n' +
        '        </div>')
}
const createGUI = function () {
  const adjustableValues = {
    strokeColor: '#000000',
    marriageStrokeColor: '#006400',
    nodeBackground: '#ffffff',
    fontColor: '#000000',
    width: 100,
    height: 100
  }
  const gui = new dat.GUI()
  const colors = gui.addFolder('Colors')
  colors.addColor(adjustableValues, 'strokeColor').onChange(function (newValue) {
    $('.linage').css({ stroke: newValue })
  })
  colors.addColor(adjustableValues, 'marriageStrokeColor').onChange(function (newValue) {
    $('.marriage').css({ stroke: newValue })
  })
  colors.addColor(adjustableValues, 'nodeBackground').onChange(function (newValue) {
    $('.node').css({ 'background-color': newValue })
  })
  colors.addColor(adjustableValues, 'fontColor').onChange(function (newValue) {
    $('.nodeText').css({ color: newValue })
  })
  gui.add(adjustableValues, 'width', 50, 100).onChange(function (newValue) {
    $('.node').css({ width: newValue + '%' })
  })
  gui.add(adjustableValues, 'height', 50, 100).onChange(function (newValue) {
    $('.node').css({ height: newValue + '%' })
  })
}
export { createInstructions, createGUI }
