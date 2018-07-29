<template>
    <div id="appstore">
      <h2>Dataset 3: Apple Store</h2>
      <p>This data is also from Kaggle. It's from Apple's App Store, and just looking at this data,
        I can see three potential candidates to test Benford's Law. Do you see them? I'd pick rating_count_tot
        (total ratings), rating_count_ver (rating for the current version), and the byte-size (number of bytes)
      </p>
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
      <h2>Benford's Byte Count</h2>
      <p>
      Let's start with the number of bytes as our parameter.
      </p>
      <md-button class='md-raised' @click='activateBytes = !activateBytes'>Toggle Visualization </md-button>
      <div class="bytecount" v-show="activateBytes">
        <data-viz :data="benfordByteCount" xcol="x" ycol="y" id="appstore-bytes-benford" :activate="activateBytes" xlabel="Leading Digit - App Size (in Bytes)"/>
        <p>Use this slider to control the number of apps used.</p>
        0<input type="range" min="1" max="7198" v-model="range" class="slider" id="myRange">7198
        <p>Number of records: {{range}}</p>
      </div>
      <br/>
      <h2>Benford's Version Reviews</h2>
      <p>
        Interesting. Now let's see the current version's reviews
      </p>
      <md-button class='md-raised' @click='activateVersion = !activateVersion'>Toggle Visualization </md-button>
      <div class="versionreviews" v-show="activateVersion">
        <data-viz :data="benfordVersionReviews" xcol="x" ycol="y" id="appstore-version-benford" :activate="activateVersion" xlabel="Leading Digit - Current Version Reviews"/>
        <p>Use this slider to control the number of apps used.</p>
        0<input type="range" min="1" max="7198" v-model="range" class="slider" id="myRange">7198
        <p>Number of records: {{range}}</p>
      </div>
      <br/>
      <h2>Benford's Total Reviews</h2>
      <p>
        And finally, the total reviews
      </p>
      <md-button class='md-raised' @click='activateTotal = !activateTotal'>Toggle Visualization </md-button>
      <div class="totalReviews" v-show="activateTotal">
        <data-viz :data="benfordTotalReviews" xcol="x" ycol="y" id="appstore-total-benford" :activate="activateTotal" xlabel="Leading Digit - Total Reviews"/>
        <p>Use this slider to control the number of apps used.</p>
        0<input type="range" min="1" max="7198" v-model="range" class="slider" id="myRange">7198
        <p>Number of records: {{range}}</p>
      </div>
      <br/>
      <p>
      </p>
    </div>
</template>

<script>
import DataViz from './DataViz'
import axios from 'axios'
export default {
  name: 'AppStore',
  data () {
    return {
      range: 10,
      elems: [],
      activateBytes: false,
      activateVersion: false,
      activateTotal: false
    }
  },
  computed: {
    mini () {
      let resp = Array.from(this.elems)
      // console.log(resp)
      return resp.slice(1, 10)
    },
    benfordByteCount () {
      return this.benfordPoints(this.elems, this.range, 'id', 'size_bytes')
    },
    benfordTotalReviews () {
      return this.benfordPoints(this.elems, this.range, 'id', 'rating_count_tot')
    },
    benfordVersionReviews () {
      return this.benfordPoints(this.elems, this.range, 'id', 'rating_count_ver')
    }
  },
  components: {
    DataViz
  },
  methods: {
    benfordPoints (elems, r, xVal, yVal) {
      let dat = Array.from(elems).slice(1, r)
      let resp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      dat = dat.reduce((prev, d) => {
        prev.push({x: d[xVal], y: parseInt(d[yVal])})
        return prev
      }, [])
      for (let i in dat) {
        // Formula: FLOOR(x/POWER(10, FLOOR(LOG(x,10))))
        let a = Math.floor(Math.log(dat[i].y) / Math.log(10))
        let b = 10 ** a
        let c = Math.floor(dat[i].y / b)
        if (!isNaN(c)) resp[c - 1]++
      }
      resp = resp.reduce((prev, val, i) => {
        prev.push({x: i + 1, y: val})
        return prev
      }, [])
      return resp
    },
    async fetchData () {
      try {
        const resp = await axios.get('http://ddv-final.herokuapp.com/AppleStore.json')
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
