const selectEpisode = function (epNum, content) {
  d3.selectAll('#myEpisode').remove()

  fetch('http://api.tvmaze.com/singlesearch/shows?q=big-bang-theory&embed=episodes')
    .then(data => data.json())
    .then(jsonData => {
      let displayInfo = jsonData._embedded.episodes[epNum - 1]
      if (content === 'Select Info') {
        displayInfo = {
          name: displayInfo.name,
          season: displayInfo.season,
          number: displayInfo.number,
          airdate: displayInfo.airdate,
          summary: displayInfo.summary
        }
      }
      d3.select('body').selectAll('p')
        .data(d3.entries(displayInfo)) // Takes a JSON, outputs an array of objects, each with a key and value property
        .join('div')
        .text(d => d.key + ' : ' + d.value)
        .attr('id', 'myEpisode')
        .style('color', 'white')
        .style('border-bottom', '1px gray solid')
    })
}

export default selectEpisode
