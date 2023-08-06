<template>
  <div id="app">
    <PercentageInput ref="pInput" v-model="pValue" :min="minValue" :max="maxValue" need-error-shake />
    <button @click="$refs.pInput.reset()">reset</button>
  </div>
</template>

<script>
import PercentageInput from '../src/PercentageInput.vue'

export default {
  name: 'App',
  components: {
    PercentageInput
  },
  data() {
    return {
      pValue: '12',
      minValue: 0,
      maxValue: 100,
      reset: false
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
