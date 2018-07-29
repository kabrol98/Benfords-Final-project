<template>
  <md-steppers>
    <md-step id="first" md-label="Introduction">
      Benford’s law is about a frequency distribution of numbers that span multiple orders of magnitude.
      Specifically, it concerns the leading or most significant digit in such a distribution.
      For example, the leading digit of 392 is 3, that of 1042 is 1, and so on.
      in the following datasets, I'm going to plot the leading digits of certain values to demonstrate how this works.
      I will use the following formula to do this:
      <br/><br/>
      If x is the population, we take FLOOR(x/POWER(10, FLOOR(LOG(x,10)))) to get this.
      Taking the log base 10 of a number x gives the exact exponent of 10 needed to reach x. Raising 10 to the
      floor of that logarithm will give the highest power of 10 lower than x. Dividing x by this number gives a
      decimal less than 10, and taking the floor of that number gives the leading digit. We will turn discrete quantitative
      values into a discrete nominal value (1,2,3,4,5,6,7,8 or 9), and plot the frequency of items that fall in each value on a bar graph.
      <br/><br/>
      Though you might expect a bunch of random numbers to have an equal chance of getting any given leading digit, about 11.1%,
      Benford’s law states that this is far from the case. There’s around a 30% chance of getting 1 and 5% chance of getting 9, and
      the graph, in general, follows a logarithmic scale (the logarithmic scale is also the reason for this law). This lawis, of course,
      subject to many things, among them the number of entries, the values they span and the variataion in distribution. Let's find out how they work.
    </md-step>
    <md-step id="second" md-label="Black Friday Sales">
      <h3>Dataset 1: Black Friday Sales</h3>
      The Following data is from a Kaggle entry on sales during Black Friday. Here's a few records of the plotted data.
      <md-table>
        <md-table-row>
          <md-table-head v-for="(i, key, val) in elems[0]" :key="val">
            {{key}}
          </md-table-head>
        </md-table-row>
        <md-table-row v-for="(id) in elems.slice(1, 10)" :key="id.Product_ID">
          <md-table-cell v-for="(key, val) in id" :key="val">
            {{key}}
          </md-table-cell>
        </md-table-row>
      </md-table>
    </md-step>
     <md-step id="third" md-label="Basic Visualization">
      Let's see what a basic d3 visualization looks like.
    </md-step>
  </md-steppers>
</template>

<script>
export default {
  name: "Walkthrough",
  data() {
    return {};
  },
  props: ["elems"]
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
</style>
