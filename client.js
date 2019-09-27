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
