<template>
  <md-steppers md-dynamic-height :md-active-step.sync="active">
    <md-step id="first" md-label="Introduction">
      <p align="left">Benford’s law is about a frequency distribution of numbers that span multiple orders of magnitude.
      Specifically, it concerns the leading or most significant digit in such a distribution.
      For example, the leading digit of 392 is 3, that of 1042 is 1, and so on.
      in the following datasets, I'm going to plot the leading digits of certain values to demonstrate how this works.
      I will use the following formula to do this:</p>
      <p align="left">If x is the datapoint, we take FLOOR(x/POWER(10, FLOOR(LOG(x,10)))) to get this.
      Taking the log base 10 of a number x gives the exact exponent of 10 needed to reach x. Raising 10 to the
      floor of that logarithm will give the highest power of 10 lower than x. Dividing x by this number gives a
      decimal less than 10, and taking the floor of that number gives the leading digit. We will turn discrete quantitative
      values into a discrete nominal value (1,2,3,4,5,6,7,8 or 9), and plot the frequency of items that fall in each value on a bar graph.</p>
      <p align="left">Though you might expect a bunch of random numbers to have an equal chance of getting any given leading digit, about 11.1%,
      Benford’s law states that this is far from the case. There’s around a 30% chance of getting 1 and 5% chance of getting 9, and
      the graph, in general, follows a logarithmic scale (the logarithmic scale is also the reason for this law).</p>
      <p>
        However, you shouldn't take my word for it that this is the case. I've chosen 3 datasets that are completely unrelated to each other.
        I'm going to look for values in these datasets that span multiple orders of magnitude, and plot their leading digits to find
        out how credible Benford's Law really is.
      </p>
      <md-button class="md-raised md-primary" @click="active='second'">Continue</md-button>
    </md-step>
    <md-step id="second" md-label="Black Friday Purchases">
      <black-friday/>
      <md-button class="md-primary md-raised" @click="active='third'">Continue</md-button>
    </md-step>
    <md-step id="third" md-label="State Populations">
      <state-populations/>
      <md-button class="md-raised md-primary" @click="active='fourth'">Continue</md-button>
    </md-step>
    <md-step id="fourth" md-label="App Store">
      <app-store></app-store>
      <md-button class="md-raised md-primary" @click="active='fifth'">Continue</md-button>
    </md-step>
    <md-step id="fifth" md-label="About This Visualization" align="left">
      <p>
        My visualization uses an interactive slideshow to show the user how different kinds of data all follow Benford's Law.
        I used a reactive front end framework called Vue.js, and a component library called Vue Material to build the necessary
        UI components and transitions. The relevant links to both are at the bottom of this web page. All the charts were built using d3.js.
      </p>
      <p>
        The visualization has four scenes (five, including this essay) that the user can navigate through while on the webpage.
        There are headings at the top which, when clicked, will take the user to the slide of their choice. There are also buttons
        at the bottom of the first four slides that take the user forward through the visualization. The transitions are highlighted by
        animations in which the previous layout is 'slid out' and replaced with the new one. This is done in order to make clear to the viewer
        that the datasets in consecutive slides are in no way related to each other.
        The template for each slide, however, is the same, a table with an overview followed by a graphical representation of Benford's law,
        in order to show the reader that these different datasets all follow the same law.
      </p>
      <p>
        The first slide is simply an introduction to Benford's law, and a little bit about the math involved in plotting the results
        as a chart (E.g. how to obtain the leading digit of a number).The three main slides pull data from Black Friday sales data, U.S. census
        data and the Apple App store respectively. In each main slide, 10 records from each dataset are first shown in table form.
        Then the user can click a button to open a visualization of the frequency of each leading digit (from 1 to 9) in one of the parameters shown on the table.
      </p>
      <p>
        I've included annotations as lines of text describing the data and the visualizations, so that each slide reads as though it was its own
        interactive document. The reason for this is to make the design of the experience look simple and unobtrusive, and ensure that each individual slide
        is considered consistent with the previous ones yet in terms of theme yet separate in terms of content. The annotations are cleared between scenes to show that
        the dataset that the slide is focused on has also changed.
      </p>
      <p>
        The dataset being used can be changwd by changing the slide. The tiles showing the slides darken when the mouse hovers over them to show
        they can be pressed to cause a slide change. The 'continue' button at the end of each slide is also raised for the same reason.
        The user can access the charts by clicking on a button that toggles the visualization. The button is raised, indicating to the user that it can
        be pressed. Each chart also has a slider underneath it, so that the user can
        change the number of data points being used to plot the frequency of leading digits.
        This is a parameter, a form of direct interaction between the user and the data. As the user uses the slider,
        the graph reactively adjusts to accomodate the use of more data points. The annotation text above the slider tells the user that they
        can change the values.
      </p>
    </md-step>
  </md-steppers>
</template>

<script>
import DataViz from './DataViz'
import BlackFriday from './BlackFriday'
import StatePopulations from './StatePopulations'
import AppStore from './AppStore'
export default {
  name: 'Walkthrough',
  data () {
    return {
      active: 'first'
    }
  },
  components: {
    DataViz,
    BlackFriday,
    StatePopulations,
    AppStore
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
