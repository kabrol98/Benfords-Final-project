<template>
  <div id="viz" >
    <div v-show='activate'>
    <svg :id='id' height='50'></svg>
    <h2><b>{{xlabel}}</b></h2>
    </div>
    <!-- <div class='tooltip' id='tip' style='visibility: hidden'></div> -->
  </div>
</template>
<script>
import * as d3 from 'd3'
export default {
  name: 'DataViz',
  data () {
    return {
      height: 500
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
  props: {
    data: Array,
    xcol: String,
    ycol: String,
    id: String,
    activate: {
      type: Boolean,
      default () { return false }
    },
    xlabel: {
      default () { return 'Leading Digit' }
    }
  },
  created () {
    window.addEventListener('resize', this.refreshViz)
  },
  watch: {
    data () {
      if (this.activate) {
        this.refreshViz()
      }
    },
    activate (val) {
      if (val === true) this.refreshViz()
    }
  },
  methods: {
    refreshViz () {
      let svg = d3.select('#' + this.id)
      svg.selectAll('*').remove()
      svg.attr('height', this.height)
      this.generateViz()
    },
    generateViz () {
      // Set variable width
      let bod = document.getElementsByTagName('body')[0]
      // console.log(bod.clientWidth)
      let factor = 0.75
      let divWidth = parseInt(bod.clientWidth * factor)

      let svg = d3.select('#' + this.id)
      svg.attr('height', this.height)
      svg.attr('width', divWidth)
      let margin = {top: 20, right: 20, bottom: 20, left: 40}
      let width = +svg.attr('width') - margin.left - margin.right
      let height = +svg.attr('height') - margin.top - margin.bottom
      // console.log('width = ' + svg.attr('width'))

      // Define the div for the tooltip
      let div = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0)
        .text('AAA')
      // let div = d3.select('#tip')
      // console.log(div)

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
        .attr('fill', 'steelblue')
        .attr('width', x.bandwidth())
        .attr('height', function (d) { return height - y(d.y) })
        .on('mouseover', function (d) {
          div.style('opacity', 1)
            .style('visibility', 'visible')
            .style('left', (d3.event.pageX) + 'px')
            .style('top', (d3.event.pageY - 28) + 'px')
          // console.log(div.style('opacity'))
          return div
        })
        // .on('mouseout', function (d) {
        //   div.style('opacity', 0)
        //   return div
        // })
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

div.tooltip {
    position: absolute;
    text-align: center;
    width: 60px;
    height: 28px;
    padding: 2px;
    font: 12px sans-serif;
    background: lightsteelblue;
    border: 0px;
}
</style>
