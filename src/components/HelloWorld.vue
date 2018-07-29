<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <md-button class="md-raised" >About this project</md-button>
    <walkthrough :elems="data"/>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a
          href="https://vuejs.org"
          target="_blank"
        >
          Vue.js
        </a>
      </li>
      <li>
        <a
          href="https://www.github.com/kabrol98"
          target="_blank"
        >
          My Github
        </a>
      </li>
      <li>
        <a
          href="https://en.wikipedia.org/wiki/Benford%27s_law"
          target="_blank"
        >
          Benford's Law
        </a>
      </li>
      <li>
        <a
          href="https://www.kaggle.com/mehdidag/black-friday"
          target="_blank"
        >
          Black Friday Data
        </a>
      </li>
      <br>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import Walkthrough from './Walkthrough'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Benford\'s Law',
      data: []
    }
  },
  methods: {
    async fetchData () {
      try {
        const resp = await axios.get('http://ddv-final.herokuapp.com/BlackFridayFiltered.json')
        if (!resp.data.error) {
          console.log(resp.data)
          this.data = resp.data
          this.data.map((d) => {
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
  },
  components: {
    Walkthrough
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
