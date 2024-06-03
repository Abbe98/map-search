<template>
<div id="leaflet"></div>
</template>

<script>
import L from 'leaflet';
import Fullscreen from 'leaflet-fullscreen';
import Locate from 'leaflet.locatecontrol';
import { EventBus } from '../event-bus.js';

import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import 'font-awesome/css/font-awesome.min.css';

export default {
  name: 'leaflet',
  mounted: () => {
    const map = L.map('leaflet', {
      attributionControl: false,
      fullscreenControl: true,
      center: [40, 10],
      zoom: 3
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Background &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    let layers = L.layerGroup().addTo(map);

    L.control.attribution({prefix: ''}).addTo(map);
    map.zoomControl.setPosition('topright');
    map.fullscreenControl.setPosition('topright');
    L.control.locate({position: 'topright'}).addTo(map);

    EventBus.$on('selected', selected => {
      layers.clearLayers();

      layers.addLayer(L.tileLayer.wms(selected.links.wms, {
        layers: 'MapWarper',
        format: 'image/png',
        attribution: `<a href="https://commons.wikimedia.org/wiki/${selected.attributes.title}">Wikimedia Commons</a>`
      }));

      let bbox = selected.attributes.bbox.split(',');
      map.fitBounds([
        [bbox[3], bbox[2]],
        [bbox[1], bbox[0]]
      ]);
    });

    EventBus.$on('clearLayers', () => {
      layers.clearLayers();
    });

    EventBus.$on('getBounds', callback => {
      callback(map.getBounds());
    });

    EventBus.$on('toggleFullscreen', () => {
      map.toggleFullscreen();
    });

  }
}
</script>

<style scoped>
#leaflet {
    height: 100%;
    width: calc(100% - 400px);
    right: 0;
    position: absolute !important;
}

/* Leaflet locate */
.fa.fa-map-marker,
.fa.fa-spinner.fa-spin {
    line-height: 30px;
}
</style>
