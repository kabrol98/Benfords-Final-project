<template>
  <div id = "vizualizatiion">
    <script src="https://d3js.org/d3.v4.min.js"></script>
    <md-button class="md-button-raised">Generate Visualization </md-button>
    <svg id="viz" width="960" height="500"/>
  </div>
</template>
<script>
export default {
  name: 'DataViz',
  data () {
    return {
    }
  },
  computed: {
    points () {
      return this.dat.reduce((d, prev) => {
        prev.push( {x : d[this.xcol], y : d[this.ycol]})
        return prev
      }, [])
    }
  },
  props: ['dat', 'xcol', 'ycol'],
  created () {
    let svg = d3.select("svg"),
    margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = +svg.attr("width") - margin.left - margin.right,
    height = +svg.attr("height") - margin.top - margin.bottom;

    let x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
        y = d3.scaleLinear().rangeRound([height, 0]);

    let g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let data = this.points
    
    x.domain(data.map(function(d) { return d.x; }));
    y.domain([0, d3.max(data, function(d) { return d.y; })]);

    g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(y).ticks(10, "%"))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Frequency");

    g.selectAll(".bar")
      .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("y", function(d) { return y(d.frequency); })
        .attr("width", x.bandwidth())
        .attr("height", function(d) { return height - y(d.frequency); });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
</style>
