// var ui = require('./dat.js')
// import ui from './dat.js'
import iss from './iss.js'
// import * as dat from 'dat.gui'

var zoom_layer;
var projection;
var w = 1800;
var h = 700;
var cats;
var colorscale

function baseMap() {



	var svg = d3.select("#tol_svg")
		.attr("preserveAspectRatio", "xMinYMin meet") //necessary for vw/vh attributes
		.attr("viewBox", "0 0 " + w + " " + h)
		.classed("svg-content", true);

	projection = d3.geoNaturalEarth1()
		.translate([w / 2, h / 2])
		.scale(245)
		.center([0, 0]);

	var path = d3.geoPath().projection(projection);

	//zoomable layer so data moves with zoom/pan
	zoom_layer = svg.append('g');

	const zoom = d3.zoom()
		.scaleExtent([1, 30])
		.on('zoom', zoomed);

	svg.call(zoom);

	function zoomed() {
		svg.selectAll('path')
		zoom_layer.attr('transform', d3.event.transform)
	}

	d3.select('body').append('div')
		.attr('class', 'tooltip')
		.style('opacity', 0);

	//reset view after zoom on button press
	d3.select('.center_btn')
		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 " + 116 + " " + 29)
		.attr('value', 'Center map')
		.on('click', function (d) {
			svg.call(zoom.transform, d3.zoomIdentity)
		})

	//load in geojson world map
	const map = d3.json('data/CNTR_RG_10M_2016_4326.geojson').then(function (world) {

		//the projection outline
		zoom_layer.append('path')
			.datum({ type: "Sphere" })
			.attr('class', 'globe_path')
			.attr('d', path)
			// .style('fill', "#c9e8fd") //c9e8fd
			.style('fill', "#3153F1")
			.style('stroke', '#09101d')

		//emissions map, per capita map transparent underneath
		zoom_layer.selectAll(".country_path")
			.data(world.features)
			.enter()
			.append("path")
			.attr('class', 'country_path')
			// .attr('fill', '#fff')
			.attr('fill', '#0B7033')
			// .attr('fill', d => {
			// 	return ['red', 'white', 'blue', 'green'][Math.round(Math.random() * 3)]
			// })
			.attr("d", path)
			.style('stroke', '#09101d')
			.style('stroke-width', '0.5px')
			.raise();

	})

	const meteorites = d3.json("data/meteorites.json").then(async function (data) {
		await map;
		// timeSlider(data, meteoriteMap)
		meteoriteMap(data)

		var legend = svg.selectAll('.legend')
			.data(colorscale.domain())
			.enter().append('g')
			.attr('class', 'legend')
			.attr('transform', function (d, i) { return 'translate(0,' + ((i * 30) + 150) + ')' })

		let x = 0;
		legend.append('circle')
			.data(colorscale.range())
			.attr('cx', w - 150)
			.attr('r', 10)
			.style('opacity', 0.5)
			.style('fill', d => d)
			.each(d => {
				console.log(d)
				console.log(cats[x])
				d3.select(this)
					.attr('class', cats[x])
				x++;
			})
			.on('mouseover', function (d, i) {
				d3.select(this);
				var currentclass = this.getAttribute('class');
				console.log(currentclass)
			})

		legend.append('text')
			.attr('x', w - 130)
			.attr('dy', '0.35em')
			.attr('font-size', 12)
			.style('text-anchor', 'start')
			.text(d => d)
	})



	setInterval(function () {
		iss(meteorites, zoom_layer, projection)
	}, 1000)


}

function meteoriteMap(data) {
	// const meteorites = d3.json("data/meteorites.json").then(async function(data) {

	//wait for map to load before data

	let max = Math.max(...data.map(d => {
		if (d.mass === undefined) return 1
		else return parseFloat(d.mass)
	}))
	let min = Math.min(...data.map(d => {
		if (d.mass === undefined) return 1
		else return parseFloat(d.mass)
	}))

	//condense classifications into 7 categories
	data.forEach(d => {
		if (d.recclass.includes("Lodranite") ||
			d.recclass.includes("Acapulcoite") ||
			d.recclass.includes("Winonaite")) {
			d.recclass = "Achrondite: primitive"
		} else if (d.recclass.includes("Diogenite") ||
			d.recclass.includes("Eucrite") ||
			d.recclass.includes("Howardite") ||
			d.recclass.includes("Martian") ||
			d.recclass.includes("Aubrite") ||
			d.recclass.includes("Angrite") ||
			d.recclass.includes("Ureilite") ||
			d.recclass.includes("Achondrite")) {
			d.recclass = "Achrondite"
		} else if (d.recclass.includes("Iron")) {
			d.recclass = "Iron"
		} else if (d.recclass.includes("Pallasite") ||
			d.recclass.includes("Mesosiderite") ||
			d.recclass.includes("Stone")) {
			d.recclass = "Stony-iron"
		} else if (d.recclass.startsWith("H") ||
			d.recclass.startsWith("L")) {
			d.recclass = "Chrondite: ordinary"
		} else if (d.recclass.startsWith("C")) {
			d.recclass = "Chrondite: carbonaceous"
		} else {
			d.recclass = "Other"
		}
	})

	cats = ["Achrondite: primitive", "Achrondite", "Iron", "Stony-iron", "Chrondite: ordinary", "Chrondite: carbonaceous", "Other"]; //meteorite classification categories
	data.forEach(d => {
		if (!cats.includes(d.recclass)) cats.push(d.recclass)
	})

	console.log(min, max)
	console.log(cats)

	var rscale = d3.scaleSymlog()
		.domain([min, max])
		.constant(10000)
		.range([1, 10])

	colorscale = d3.scaleOrdinal()
		.domain(cats)
		.range(["#073b4c", "#ffd166", "#ef476f", "#118ab2", "#06d0a0", "#FF6700", "#031A6B"])

	var div = d3.select('.tooltip');

	zoom_layer.selectAll(".meteorite_layer")
		.data(data)
		.enter()
		.append('circle')
		.attr('r', d => rscale(d.mass))
		.attr("transform", function (d) {
			if (d.reclat !== undefined && d.reclong !== undefined)
				return "translate(" + projection([d.reclong, d.reclat]) + ")";
		})
		.style('fill', d => colorscale(d.recclass))
		.style('opacity', 0.75)
		.style('stroke', "black")
		.style("stroke-width", "0.5px")
		.on('mouseover', function (d) {
			div.transition()
				.duration(200)
				.style('opacity', 0.9)
			div.text('Name: ' + d.name + '<br>Mass: ' + d.mass + '<br>Year: ' + d.year)
				.style('left', (d3.event.pageX) + 'px')
				.style('top', (d3.event.pageY - 48) + 'px')
		})
		.on('mousemove', function (d) {
			let date = new Date(d.year)
			console.log(date)
			div.html('Name: ' + d.name + '<br>Mass: ' + d.mass + '<br>Year: ' + date)
				.style('left', (d3.event.pageX) + 'px')
				.style('top', (d3.event.pageY - 48) + 'px')
		})
		.on('mouseout', function () {
			div.transition()
				.duration(200)
				.style('opacity', 0)
		})
	// })
}

window.onload = function () {
	alert("This is a visualization of meteorite impacts on Earth. The size of each point \
	represents the mass of the meteorite. The visualization also includes \
	the real time location of the ISS, represented by the yellow dot. You xan zoom into \
	the map with the scroll wheel and pan around by clicking and dragging. Recent the map \
	with the button on the top left. Mouse over any \
	point on the map for additional information about the impact. You can also mouseover \
	the legend items on the right to highlight that class of meteorite. ")
	baseMap();
}