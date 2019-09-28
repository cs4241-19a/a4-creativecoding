export default {clearChart, chart, clamp}

// This clears the svg so the re-mixed chart can be added
function clearChart(){
  d3.select("svg").selectAll("*").remove()
}

// This builds the bubble chart
function chart(data, color, getText, minFontSize, maxFontSize){

  const root = pack(data)

  const leaf = d3.select( 'svg' ).selectAll( 'circle' )
  .data(  root.leaves() )
  .join( 'g' )

  leaf.append( 'circle')
      .attr( 'fill', color)
      .attr( 'r', d => d.r )
      .attr( 'cx', d => d.x)
      .attr( 'cy', d => d.y)

  leaf.append( 'text' )
      .attr( 'fill', 'black' )
      .attr('text-anchor', 'middle')
      .attr( 'x', d => d.x)
      .attr( 'y', d => d.y)
      .attr('font-size', d => clamp(d.r,minFontSize,maxFontSize))
      .text( d => getText(d))
} 

// This is used for making sure things don't get too big when they're being adjusted by how many values there are. (some have 400, and others have 4,000)
function clamp(x, min, max){
    return Math.max(min, Math.min(x, max))
}

// This is used by the chart method to chose a root for the chart and build the bubbles in a certain orientation
function pack(data){
   const hierarchy = d3.hierarchy({children: data})
   .sum(d => d.count)
   const packedData = d3.pack()
    .size([getWidth() - 6, getHeight() - 6])
    .padding(9)
  (hierarchy)
  return packedData
}

// Variables used by pack
const width = 300
const height = 150

//Getters and Setters
function getWidth(){
  return width
}

function setWidth(widthCallback){
  width = widthCallback
}

function getHeight(){
  return height
}

function setHeight(heightCallback){
  height = heightCallback
}
