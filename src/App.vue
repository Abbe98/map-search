<template>
  <div id="app">
    <sidebar v-bind:featuredMap="map"/>
    <leaflet/>
  </div>
</template>

<script>
import sidebar from "./components/Sidebar.vue";
import leaflet from "./components/Leaflet.vue";

export default {
  name: "app",
  components: {
    sidebar,
    leaflet
  },
  asyncComputed: {
    map: {
      get() {
        const mapFromURL = window.location.hash.substring(1);
        if (!mapFromURL) return this.featuredMap;

        // TODO error handeling
        return this.$http
          .get(
            "maps/" + mapFromURL
          )
          .then(response => response.body.data);
      }
    },

    featuredMap: {
      get() {
        const featuredMaps = ["86"];
        return this.$http
          .get(
            "maps/" +
              featuredMaps[Math.floor(Math.random() * featuredMaps.length)]
          )
          .then(response => response.body.data);
      },
      default: false
    }
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font: normal 12px/1.6667 "Helvetica Neue", Arial, sans-serif;
  color: #333;
  height: 100vh;
  width: 100%;
}

.margin-top-5 {
  display: block;
  margin-top: 5px;
}

.margin-top-14 {
  display: block;
  margin-top: 14px;
}
</style>
