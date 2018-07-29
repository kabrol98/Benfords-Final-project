<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import Vue from 'vue'
import {MdButton, MdContent, MdTabs, MdSteppers, MdTable} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdButton)
Vue.use(MdTable)
Vue.use(MdSteppers)
Vue.use(MdContent)
Vue.use(MdTabs)
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
