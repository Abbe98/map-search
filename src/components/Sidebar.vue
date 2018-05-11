<template>
<div class="sidebar">
    <h1>Search Maps</h1>
    <form>
        <input v-model="searchText" type="text" class="mw-ui-input" placeholder="Search by title"/>
        <label class="mw-ui-radio-label margin-top-5">
            Limit search to current map view.
            <input v-model="bbox" type="checkbox" class="mw-ui-checkbox" />
        </label>
        <button v-on:click="search(searchText, $event)" class="mw-ui-button mw-ui-constructive mw-ui-block margin-top-5">Search</button>
    </form>

    <h2 v-if="searchResult.length > 0 || searchStatus === 'done'">Search Result</h2>
    <spinner v-if="searchStatus === 'executing'" line-fg-color="#00af89" class="margin-top-14"/>
    <p v-if="searchStatus === 'done' && searchResult.length === 0">No results found.</p>
    <ul v-if="searchResult.length > 0" class="result-list">
        <mapitem v-for="map in searchResult" v-bind:map="map" :key="map.id" />
    </ul>

    <h2 v-if="featuredMap">Featured Map</h2>
    <ul v-if="featuredMap" class="result-list">
        <mapitem v-bind:map="featuredMap" v-bind:activeInit="true" />
    </ul>
</div>
</template>

<script>
import mapitem from "./MapItem.vue";
import { EventBus } from "../event-bus.js";

import Spinner from 'vue-simple-spinner';

export default {
  name: "sidebar",
  components: {
    mapitem,
    Spinner
  },
  props: {
    featuredMap: false
  },
  data() {
    return {
      searchResult: [],
      searchText: "",
      bbox: false,
      searchStatus: "not-executed" // executing, done
    };
  },
  methods: {
    search: function(value, e) {
      if (e) event.preventDefault();
      this.searchStatus = "executing";

      let queryBounds = "";
      EventBus.$emit("getBounds", bounds => {
        queryBounds = `&bbox=${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;
      });

      let query = `maps.json?query=${value}&show_warped=1&per_page=20`;
      if (this.bbox) query += queryBounds;

      this.searchResult = [];
      this.$http.get(query).then(response => {
        this.searchResult = response.body.data;
        this.searchStatus = "done";
      });
    }
  }
};
</script>

<style scoped>
.sidebar {
  height: 100%;
  width: 400px;
  position: absolute;
  padding: 7px;
  box-sizing: border-box;
  background-color: #f6f6f6;
  border-right: 1px solid rgb(204, 204, 204);
  overflow-y: scroll;
}

ul {
  list-style: none;
  padding: 0;
}

@media (max-width: 700px) { 
  .sidebar {
    width: 100%;
    z-index: 9999;
  }
}
</style>
