const width = 960,
    height = 500;

const svg = d3.select("svg")
                .on("mousedown", mousedown);

d3.select(window)
    .on("mousemove", mousemove)
    .on("mouseup", mouseup)

const proj = d3.geoOrthographic()
    .translate([width / 2, height / 2])
    .clipAngle(90)
    .scale(220);

const path = d3.geoPath().projection(proj).pointRadius(2);

const graticule = d3.geoGraticule()

const drawMap = function(err, world) {
    if (err) throw err

    svg.append("path")
      .datum(graticule)
      .attr("class", "graticule")
      .attr("d", path);

    svg.append("path")
      .datum(graticule.outline)
      .attr("class", "foreground")
      .attr("d", path);

    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(world, world.objects.countries).features)
      .enter().append("path")
      .attr("d", path);
  }

  d3.json("https://unpkg.com/world-atlas@1.1.4/world/110m.json", drawMap)

  var m0, o0;
  function mousedown() {
    m0 = [d3.event.pageX, d3.event.pageY];
    o0 = proj.rotate();
    d3.event.preventDefault();
  }

  function refresh() {
    svg.selectAll(".land").attr("d", path);
    svg.selectAll(".point").attr("d", path);
  }

  function mousemove() {
    if (m0) {
      var m1 = [d3.event.pageX, d3.event.pageY]
        , o1 = [o0[0] + (m1[0] - m0[0]) / 6, o0[1] + (m0[1] - m1[1]) / 6];
      o1[1] = o1[1] > 30  ? 30  :
              o1[1] < -30 ? -30 :
              o1[1];
      proj.rotate(o1);
      refresh();
    }
  }
  function mouseup() {
    if (m0) {
      mousemove();
      m0 = null;
    }
  }