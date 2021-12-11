<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component
export default class App extends Vue {}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url('./assets/img/bg-plaques.jpg');
}
</style>
