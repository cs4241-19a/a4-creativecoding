export default function iss(meteorites, zoom_layer, projection) {
    d3.json("http://api.open-notify.org/iss-now.json").then(async function(data) {
        await meteorites;
        const json = [data]
        // d3.xml('data/international-space-station.svg').then(function(icon) {
            // document.body.append(icon.documentElement)
        zoom_layer.selectAll(".iss")
            .data(json)
            .enter()
            .append('circle')
            .attr('r', 5)
            .style('fill', 'yellow')
            .attr('transform', function(d) {
                return "translate(" + projection([d.iss_position.longitude, d.iss_position.latitude]) + ")";
            })		
    })
}