const selectSeason = function (seasNum, evenColor, oddColor) {
  d3.selectAll('#myEpisode').remove()

  fetch('http://api.tvmaze.com/singlesearch/shows?q=big-bang-theory&embed=episodes')
    .then(data => data.json())
    .then(jsonData => {
      const episodes = {}
      let epNum = 0
      for (const index in jsonData._embedded.episodes) {
        if (jsonData._embedded.episodes[index].season == seasNum) {
          epNum++
          const label = 'Season ' + seasNum + ', Episode ' + epNum
          episodes[label] = jsonData._embedded.episodes[index]
        }
      }
      d3.select('body').selectAll('p')
        .data(d3.entries(episodes)) // Takes a JSON, outputs an array of objects, each with a key and value property
        .join('div')
        .text(d => d.key + ' : ' + d.value.summary.replace('<p>', '').replace('</p>', ''))
        .attr('id', 'myEpisode')
        .style('color', 'white')
        .style('border-bottom', '1px gray solid')
        .style('background', d => {
          epNum = d.key.charAt(d.key.length - 1) // Last character in key is episode number
          if (epNum % 2 == 0) return evenColor
          else return oddColor
        })
    })
}

export default selectSeason
