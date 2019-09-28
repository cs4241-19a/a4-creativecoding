import selectEpisode from './selectEpisode.js'
import selectSeason from './selectSeason.js'

const displayHelp = function (display) {
  let helpString = 'Weclome! This software will allow you to view details about episodes of the TV Show "The Big Bang Theory."'
  helpString += ' Settings in the "episodes" folder will show you information about a specific episode'
  helpString += ' Settings in the "seasons" folder will show you information about all the episodes in a given season'
  helpString += ' To exit this help screen, select "Hide" from the dropdown menu. To bring it back, select "Show'

  if (display === 'show') {
    d3.selectAll('#myEpisode').remove()
    d3.selectAll('#mySeason').remove()

    d3.select('body').selectAll('p')
      .data(d3.entries({ text: helpString })) // Takes a JSON, outputs an array of objects, each with a key and value property
      .join('div')
      .text(d => d.value)
      .attr('id', 'helpScreen')
      .style('color', 'white')
      .style('border-bottom', '1px gray solid')

    // const help = document.createElement('p')
    // help.id = 'helpScreen'
    // help.innerHTML = 'Weclome! This software will allow to view details about episodes of the TV Show "The Big Bang Thoery". To exit this help screen, sekect "Hide" under the help option in the corner'
    // document.appendChild(help)
  } else {
    d3.selectAll('#helpScreen').remove()
    // const elem = document.getElementById('helpScreen')
    // elem.parentNode.removeChild(elem)
  }
}

const guiOptions = function () {
  this.help = 'show'

  this.episode = 1
  this.content = 'All'

  this.season = 1
  this.evenColor = '#000000'
  this.oddColor = '#000000'
}

const gui = new dat.GUI()
const options = new guiOptions()

const helpDisplay = gui.add(options, 'help', ['show', 'hide'])

const epsFolder = gui.addFolder('Episodes')
const episodeSelector = epsFolder.add(options, 'episode', 1, 279)
const episodeContent = epsFolder.add(options, 'content', ['All', 'Select Info'])

const seasFolder = gui.addFolder('Seasons')
const seasonSelector = seasFolder.add(options, 'season', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])
const evenSelector = seasFolder.addColor(options, 'evenColor')
const oddSelector = seasFolder.addColor(options, 'oddColor')

helpDisplay.onFinishChange(function () { displayHelp(options.help) })

episodeSelector.onFinishChange(function () {
  displayHelp('hide')
  selectEpisode(Math.trunc(options.episode), options.content)
})
episodeContent.onFinishChange(function () {
  displayHelp('hide')
  selectEpisode(Math.trunc(options.episode), options.content)
})

seasonSelector.onFinishChange(function () {
  displayHelp('hide')
  selectSeason(options.season, options.evenColor, options.oddColor)
})
evenSelector.onFinishChange(function () {
  displayHelp('hide')
  selectSeason(options.season, options.evenColor, options.oddColor)
})

oddSelector.onFinishChange(function () {
  displayHelp('hide')
  selectSeason(options.season, options.evenColor, options.oddColor)
})

window.onload = displayHelp('show')
