<template>
    <div id="statepops">
      <h3>Dataset 2: State Populations</h3>
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
      <p>
      Now, we only have 50 records so it's not abundantly likely that we'll find a strong correlation. Here's the plotted leading digits:
      </p>
      <!-- <md-button class="md-raised" @click="testbenford">Check benford equation</md-button> -->
      <data-viz :data="benfordPoints" xcol="x" ycol="y" id="state-pop-benford"/>
      <div class="slidecontainer">
        <p>use this slider to control the number of states we use.</p>
        0<input type="range" min="1" max="50" v-model="range" class="slider" id="myRange">50
        <p>Number of records: {{range}}</p>
      </div>
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
export default {
  name: 'StatePopulations',
  data () {
    return {
      range: 20,
      elems: []
    }
  },
  computed: {
    mini () {
      let resp = Array.from(this.elems)
      // console.log(resp)
      return resp.slice(1, 10)
    },
    benfordPoints () {
      let r = this.range
      let dat = Array.from(this.elems).slice(1, r)
      let resp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      dat = dat.reduce((prev, d) => {
        prev.push({x: d['state'], y: parseInt(d['pop_est_2014'])})
        return prev
      }, [])
      for (let i in dat) {
        // Formula: FLOOR(x/POWER(10, FLOOR(LOG(x,10))))
        let a = Math.floor(Math.log(dat[i].y) / Math.log(10))
        let b = 10 ** a
        let c = Math.floor(dat[i].y / b)
        resp[c - 1]++
      }
      resp = resp.reduce((prev, val, i) => {
        prev.push({x: i + 1, y: val})
        return prev
      }, [])
      return resp
    }
  },
  components: {
    DataViz
  },
  methods: {
    testbenford () {
      console.log(this.range, this.benfordPoints)
    },
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
