<template>
<li v-if="map">
    <div v-on:click="clicked" class="main">
        <img v-bind:src="map.attributes.thumb_url" />
        <div>
            <h3>{{ refineTitle(map.attributes.title) }}</h3>
        </div>
    </div>

    <div v-if="active" class="extended">
        <h4>Open in:</h4>
        <a v-bind:href="'https://commons.wikimedia.org/wiki/File:' + map.attributes.unique_id">Wikimedia Commons</a>
        <a v-bind:href="'https://warper.wmflabs.org/maps/' + map.id">Wikimaps Warper</a>

        <h4>Export as:</h4>
        <a v-bind:href="map.links.geotiff" download>GeoTiff</a>
        <a v-bind:href="map.links.png" download>PNG</a>
        <a v-bind:href="map.links.kml" download>KML</a>
        <p>Copyright holder and licensing information can be found on Wikimedia Commons.</p>
    </div>
</li>
</template>

<script>
import { EventBus } from "../event-bus.js";

export default {
  name: "mapitem",
  props: {
    map: false,
    activeInit: false
  },
  data: function() {
    return {
      active: this.activeInit
    };
  },
  methods: {
    refineTitle: title => {
      return title.slice(5).replace(/\.[^/.]+$/, "");
    },
    clicked: function() {
      if (!this.active) {
        this.active = true;
        EventBus.$emit("selected", this.map);
      } else {
        this.active = false;
        EventBus.$emit("clearLayers");
      }
    }
  },
  mounted: function() {
    if (this.active) EventBus.$emit("selected", this.map);

    EventBus.$on("selected", selected => {
      if (selected.id !== this.map.id) this.active = false;
    });
  }
};
</script>

<style scoped>
.main {
  height: 100px;
  background-color: #fff;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 2px;
  margin-bottom: 7px;
  transition: background-color 0.5s ease;
}

.main:hover {
  cursor: pointer;
  transition: background-color 0.5s ease;
  background-color: #f6f6f6;
}

.main img {
  height: 100px;
  width: 100px;
  object-fit: cover;
  float: left;
}

.main div {
  float: left;
  box-sizing: border-box;
  padding-left: 7px;
}

.main div h3 {
  margin-top: 7px;
  max-width: 270px;
}

.extended {
  background-color: #fff;
  position: relative;
  border: 1px solid rgb(204, 204, 204);
  margin-top: 14px;
  margin-bottom: 7px;
  border-radius: 2px;
  padding: 7px;
}

.extended h4 {
  margin: 0;
}

.extended p {
  margin: 0;
  margin-top: 7px;
}

.extended a {
  margin-right: 5px;
}

.extended:before,
.extended:after {
  width: 0;
  height: 0;
  border-style: solid;
  content: "";
  display: block;
  position: absolute;
  left: calc(50% - 10px);
}

.extended:after {
  top: -19px;
  border-color: transparent transparent #fff transparent;
  border-width: 10px;
}

.extended:before {
  top: -20px;
  border-color: transparent transparent rgb(204, 204, 204) transparent;
  border-width: 10px;
}
</style>
