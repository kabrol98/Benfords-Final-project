<template>
    <div id="blackFriday">
      <h3>Dataset 1: Black Friday Sales</h3>
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
      <p>Let's plot the amount of money purchased for a couple of records.
      The following chart plots the amount purchased by User_ID for four records.</p>
      <data-viz :data="mini" xcol="User_ID" ycol="Purchase" id="black-friday-1"/>
      <p>
      That looks good. Now the dat for amount of money purchased spans quite a few orders of magnitude.
      It seems like this would be perfect for a demonstration of Benford's law. Let's try plotting the frequency
      of each leading digit for the purchases column.</p>
      <!-- <md-button class="md-raised" @click="testbenford">Check benford equation</md-button> -->
      <data-viz :data="benfordPoints" xcol="x" ycol="y" id="black-friday-benford"/>
      <div class="slidecontainer">
        <p>use this slider to control the number of values we use.</p>
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
export default {
  name: 'BlackFriday',
  data () {
    return {
      range: 2000
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
  props: ['elems'],
  components: {
    DataViz
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
