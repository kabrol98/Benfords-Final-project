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
      <!-- <md-button class='md-raised' @click='activateBytes = !activateBytes'>Toggle Visualization </md-button>
      <div class="bytecount" v-show="activateBytes">
        <data-viz :data="benfordByteCount" xcol="x" ycol="y" id="appstore-bytes-benford" :activate="activateBytes" xlabel="Leading Digit - App Size (in Bytes)"/>
        <p>Use this slider to control the number of apps used.</p>
        0<input type="range" min="1" max="7198" v-model="range" class="slider" id="myRange">7198
        <p>Number of records: {{range}}</p>
      </div> -->
      <benford-viz
        :elems="elems"
        id="bytes-viz"
        x="id"
        val="size_bytes"
        label="Leading Digit - App Size (in bytes)"
        @shuffle="shuffleArray"/>
      <br/>
      <br/>
      <h2>Benford's Version Reviews</h2>
      <p>
        Interesting. Now let's see the current version's reviews
      </p>
      <benford-viz
        :elems="elems"
        id="version-viz"
        x="id"
        val="rating_count_ver"
        label="Leading Digit - Current Version Reviews"
        @shuffle="shuffleArray"/>
      <br/>
      <h2>Benford's Total Reviews</h2>
      <p>
        And finally, the total reviews
      </p>
      <benford-viz
        :elems="elems"
        id="tot-viz"
        x="id"
        val="rating_count_tot"
        label="Leading Digit - Total Reviews"
        @shuffle="shuffleArray"/>
      <br/>
      <p>
      </p>
    </div>
</template>

<script>
import DataViz from './DataViz'
import axios from 'axios'
import BenfordViz from './BenfordViz'
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
    }
  },
  components: {
    DataViz,
    BenfordViz
  },
  methods: {
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
