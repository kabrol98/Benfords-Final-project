<template>
    <div>
      <md-button class='md-raised' @click='activateViz = !activateViz'>Toggle Visualization</md-button>
      <div v-show="activateViz">
        <data-viz :data="benfordPoints" xcol="x" ycol="y" :id="id" :activate="activateViz" :xlabel="label"/>
        <div class="md-layout md-gutter">
          <div class="md-layout-item md-gutter">
            <p>Use this slider to control the number of values we use.</p>
            0<input type="range" min="1" :max="rangeMax" v-model="range" class="slider" id="myRange">{{rangeMax}}
            <p>Number of records: {{range}}</p>
          </div>
          <div class="md-layout-item md-gutter">
            <p>Use this control to shuffle the items used</p>
            <md-button class="md-raised" @click="$emit('shuffle')">Shuffle</md-button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import DataViz from './DataViz'

export default {
  name: 'BlackFriday',
  data () {
    return {
      range: 10,
      activateViz: false
    }
  },
  computed: {
    rangeMax () {
      return this.elems.length
    },
    benfordPoints () {
      let r = this.range
      let dat = Array.from(this.elems).slice(1, r)
      let resp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
      dat = dat.reduce((prev, d) => {
        prev.push({x: d[this.x], y: parseInt(d[this.val])})
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
  props: ['elems', 'id', 'x', 'val', 'label'],
  components: {
    DataViz
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
