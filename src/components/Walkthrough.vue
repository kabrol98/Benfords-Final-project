<template>
  <md-steppers>
    <md-step id="first" md-label="Introduction">
      <p>Benford’s law is about a frequency distribution of numbers that span multiple orders of magnitude.
      Specifically, it concerns the leading or most significant digit in such a distribution.
      For example, the leading digit of 392 is 3, that of 1042 is 1, and so on.
      in the following datasets, I'm going to plot the leading digits of certain values to demonstrate how this works.
      I will use the following formula to do this:</p>
      <p>If x is the population, we take FLOOR(x/POWER(10, FLOOR(LOG(x,10)))) to get this.
      Taking the log base 10 of a number x gives the exact exponent of 10 needed to reach x. Raising 10 to the
      floor of that logarithm will give the highest power of 10 lower than x. Dividing x by this number gives a
      decimal less than 10, and taking the floor of that number gives the leading digit. We will turn discrete quantitative
      values into a discrete nominal value (1,2,3,4,5,6,7,8 or 9), and plot the frequency of items that fall in each value on a bar graph.</p>
      <p>Though you might expect a bunch of random numbers to have an equal chance of getting any given leading digit, about 11.1%,
      Benford’s law states that this is far from the case. There’s around a 30% chance of getting 1 and 5% chance of getting 9, and
      the graph, in general, follows a logarithmic scale (the logarithmic scale is also the reason for this law). This lawis, of course,
      subject to many things, among them the number of entries, the values they span and the variataion in distribution. Let's find out how they work.</p>
    </md-step>
    <md-step id="second" md-label="Black Friday Sales">
      <black-friday :elems="elems" />
    </md-step>
    <md-step id="third" md-label="Census State Populationss">
      <state-populations :elems="elems" />
    </md-step>
  </md-steppers>
</template>

<script>
import DataViz from './DataViz'
import BlackFriday from './BlackFriday'
import StatePopulations from './StatePopulations'
export default {
  name: 'Walkthrough',
  data () {
    return {
      range: 2000
    }
  },
  props: ['elems'],
  components: {
    DataViz,
    BlackFriday,
    StatePopulations
  },
  methods: {
    testbenford () {
      console.log(this.range, this.benfordPoints)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
