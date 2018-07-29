<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <md-button class="md-raised" >About this project</md-button>
    <walkthrough/>
    <h2>Links and sources</h2>
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
          href="https://vuematerial.io/"
          target="_blank"
        >
          Vue Material
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
      <li>
        <a
          href="https://github.com/BuzzFeedNews/2015-11-refugees-in-the-united-states"
          target="_blank"
        >
          U.S. Census Data
        </a>
      </li>
      <br>
    </ul>
  </div>
</template>

<script>
import Walkthrough from './Walkthrough'

export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Benford\'s Law',
      data: []
    }
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
