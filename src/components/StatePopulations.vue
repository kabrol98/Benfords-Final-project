<template>
    <div id="statepops">
      <h2>Dataset 2: State Populations</h2>
      <p>The following data is from a dataset about refugees in the United States.
        We're only interested, however, in the estimated populstions of U.S. States as estimated
        in 2014. Here's a few records of the data.</p>
      <md-table>
        <md-table-row>
          <md-table-head v-for="(i, key, val) in elems[0]" :key="val">
            {{key}}
          </md-table-head>
        </md-table-row>
        <md-table-row v-for="(id) in mini" :key="id.Product_ID">
          <md-table-cell v-for="(key, val) in id" :key="val">
            {{key}}
          </md-table-cell>
        </md-table-row>
      </md-table>
      <h2>Benford's State Populations</h2>
      <p>
      Now, we only have 50 records so it's not abundantly likely that we'll find a strong correlation. Here's the plotted leading digits:
      </p>
      <benford-viz
        :elems="elems"
        id="state-pop-viz"
        x="state"
        val="pop_est_2014"
        label="Leading Digit - State Population"
        @shuffle="shuffleArray"/>
      <br/>
      <p>
        Well! Even with just 50 records, you wouldn't expect such a good correlation, but, with the exception of 6,
        pretty much all the values taper off after 1 logarithmically! Let's look at what else we can do.
      </p>
    </div>
</template>

<script>
import DataViz from './DataViz'
import axios from 'axios'
import BenfordViz from './BenfordViz'
export default {
  name: 'StatePopulations',
  data () {
    return {
      range: 10,
      elems: [],
      activatePopulation: false
    }
  },
  computed: {
    mini () {
      let resp = Array.from(this.elems)
      // console.log(resp)
      return resp.slice(1, 10)
    }
  },
  components: {
    DataViz,
    BenfordViz
  },
  methods: {
    async fetchData () {
      try {
        const resp = await axios.get('http://ddv-final.herokuapp.com/census-state-populations.json')
        if (!resp.data.error) {
          this.elems = resp.data
        } else {
          console.log(resp.data.error)
        }
      } catch (error) {
        console.error(error)
      }
    },
    shuffleArray () {
      let m = this.elems.length
      let t, i
      let array = Array.from(this.elems)
      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--)
        // And swap it with the current element.
        t = array[m]
        array[m] = array[i]
        array[i] = t
      }
      this.elems = array
    }
  },
  created () {
    this.fetchData()
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
