<template>
  <div id = 'vizualizatiion'>
    <md-button class='md-raised' @click="activate = !activate">Toggle Visualization </md-button>
    <br/>
    <svg :id="id" width='90' height='50'></svg>
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name: 'DataViz',
  data () {
    return {
      width: 960,
      height: 500,
      activate: false
    }
  },
  computed: {
    points () {
      // console.log(this.data)
      let dat = Array.from(this.data)
      return dat.reduce((prev, d) => {
        prev.push({x: d[this.xcol], y: parseInt(d[this.ycol])})
        return prev
      }, [])
    }
  },
  props: ['data', 'xcol', 'ycol', 'id'],
  watch: {
    data () {
      if (this.activate) {
        let svg = d3.select('#' + this.id)
        svg.selectAll('*').remove()
        this.generateViz()
      }
    },
    activate (val) {
      if (val === true) this.generateViz()
      else {
        let svg = d3.select('#' + this.id)
        svg.selectAll('*').remove()
        svg.attr('width', 0)
        svg.attr('height', 0)
      }
    }
  },
  methods: {
    checkDat () {
      console.log(this.data)
    },
    generateViz () {
      let svg = d3.select('#' + this.id)
      svg.attr('width', this.width)
      svg.attr('height', this.height)
      let margin = {top: 20, right: 20, bottom: 30, left: 40}
      let width = +svg.attr('width') - margin.left - margin.right
      let height = +svg.attr('height') - margin.top - margin.bottom
      // console.log('height = '+svg.attr('height'))

      let x = d3.scaleBand().rangeRound([0, width]).padding(0.1)
      let y = d3.scaleLinear().rangeRound([height, 0])

      let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      let data = this.points
      // console.log(data)

      x.domain(data.map(function (d) { return d.x }))
      y.domain([0, d3.max(data, function (d) { return d.y })])

      g.append('g')
        .attr('class', 'axis axis--x')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x))

      g.append('g')
        .attr('class', 'axis axis--y')
        .call(d3.axisLeft(y).ticks(10))
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '0.71em')
        .attr('text-anchor', 'end')
        .text('Frequency')

      g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', function (d) { return x(d.x) })
        .attr('y', function (d) { return y(d.y) })
        .attr('width', x.bandwidth())
        .attr('height', function (d) { return height - y(d.y) })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
.axis {
  font: 10px sans-serif;
}

.axis path,
.axis line {
  fill: none;
  stroke: #000;
  shape-rendering: crispEdges;
}

.bar {
  fill: steelblue;
}

.bar:hover {
  fill: brown;
}
</style>
