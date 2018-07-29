<template>
    <div id="blackFriday">
      <h2>Dataset 1: Black Friday Sales</h2>
      <p>The following data is from a Kaggle entry on sales during Black Friday. Here's a few records of the plotted data.</p>
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
      <h2>Benford's Black Friday Purchases</h2>
      <p>
      Now, the data for amount of money purchased spans a few orders of magnitude.
      It seems like this would be perfect for a demonstration of Benford's law. Let's try plotting the frequency
      of each leading digit for the purchases column.</p>
      <md-button class='md-raised' @click='activatePurchases = !activatePurchases'>Toggle Visualization </md-button>
      <div class="purchasesViz" v-show="activatePurchases">
        <data-viz :data="benfordPoints" xcol="x" ycol="y" id="black-friday-benford" :activate="activatePurchases" xlabel="Leading Digit - Purchase Amount (in U.S.D)"/>
        <p>Use this slider to control the number of values we use.</p>
        0<input type="range" min="1" max="5000" v-model="range" class="slider" id="myRange">5000
        <p>Number of records: {{range}}</p>
      </div>
      <br/>
      <p>
        Interesting, isn't it? The numbers don't really seem to follow a logarithmic downward trend, but they DEFINITELY
        favor 1 as a leading digit. let's look at some other examples.
      </p>
    </div>
</template>

<script>
import DataViz from './DataViz'
import axios from 'axios'

export default {
  name: 'BlackFriday',
  data () {
    return {
      range: 10,
      elems: [],
      activatePurchases: false
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
        prev.push({x: d['User_ID'], y: parseInt(d['Purchase'])})
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
    async fetchData () {
      try {
        const resp = await axios.get('http://ddv-final.herokuapp.com/BlackFridayFiltered.json')
        if (!resp.data.error) {
          // console.log(resp.data)
          this.elems = resp.data
          this.elems.map((d) => {
            delete d.Product_Category_1
            delete d.Product_Category_2
            delete d.Product_Category_3
            return d
          })
        }
      } catch (error) {
        console.log(error)
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
