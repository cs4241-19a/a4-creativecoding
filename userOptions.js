const selectEpisode = function (epNum) {
  d3.selectAll('#myEpisode').remove()

  fetch('http://api.tvmaze.com/singlesearch/shows?q=big-bang-theory&embed=episodes')
    .then(data => data.json())
    .then(jsonData => {
      d3.select('body').selectAll('p')
        .data(d3.entries(jsonData._embedded.episodes[epNum])) // Takes a JSON, outputs an array of objects, each with a key and value property
        .join('div')
        .text(d => d.key + ' : ' + d.value)
        .attr('id', 'myEpisode')
        .style('color', 'white')
        .style('border-bottom', '1px gray solid')
    })
}

const selectSeason = function (seasNum) {
  d3.selectAll('#myEpisode').remove()

  fetch('http://api.tvmaze.com/singlesearch/shows?q=big-bang-theory&embed=episodes')
    .then(data => data.json())
    .then(jsonData => {
      const episodes = {}
      for (const index in jsonData._embedded.episodes) {
        if (jsonData._embedded.episodes[index].season == seasNum) {
          const epNum = parseInt(index) + 1
          const key = 'Episode ' + epNum
          episodes[key] = jsonData._embedded.episodes[index]
        }
      }
      d3.select('body').selectAll('p')
        .data(d3.entries(episodes)) // Takes a JSON, outputs an array of objects, each with a key and value property
        .join('div')
        .text(d => d.key + ' : ' + d.value)
        .attr('id', 'myEpisode')
        .style('color', 'white')
        .style('border-bottom', '1px gray solid')
    })
}
// .style( 'background', d => {
// switch (d.value.season){ //Color based on season
//   case 1: return 'red'; break
//   case 2: return 'blue'; break
//   case 3: return 'green'; break
//   case 4: return 'yellow'; break
//   case 5: return 'orange'; break
//   case 6: return 'ingigo'; break
//   case 7: return 'pink'; break
//   case 8: return 'brown'; break
//   case 9: return 'purple'; break
//   case 10: return 'gold'; break
//   case 11: return 'gray'; break
//   case 12: return 'black'; break
// }
// colorNum = d.value.season * 10
// return `rgb( ${colorNum}, ${colorNum}, ${colorNum} )`
// })

export { selectEpisode, selectSeason }
