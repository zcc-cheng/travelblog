<template>
  <div id="app">
    <router-view v-if="isRouterAlive" />
    <!-- <div id="back"></div> -->
  </div>
</template>

<style >
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  /* background-image: url("./assets/background.jpg");
  background-attachment: fixed; */
}
/* #back {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1000;
  background-image: url("./assets/background.jpg");
} */
</style>
<script>
export default {
  name: "App",
  components: {},
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  beforeCreate() {
    document.querySelector("body").setAttribute("class", "background");
    document
      .querySelector("body")
      .setAttribute("style", "height:100%;width:100%");
  },
  beforeDestroy() {
    document.querySelector("body").removeAttribute("class");
    document.querySelector("body").removeAttribute("style");
  },
};
</script>
