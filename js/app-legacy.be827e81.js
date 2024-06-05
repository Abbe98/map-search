(function(){var t={8478:function(t,e,n){"use strict";n.d(e,{M:function(){return F}});n(3792),n(3362),n(9085),n(9391),n(2010);var a=n(5471),i=n(4620),r=n.n(i),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("sidebar",{attrs:{featuredMap:t.map}}),t._v(" "),n("leaflet")],1)},s=[],u=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sidebar"},[n("h1",[t._v("Search Maps")]),t._v(" "),t.username?t._e():n("button",{staticClass:"mw-ui-button mw-ui-constructive sign-in",on:{click:t.signIn}},[t._v("Sign in")]),t._v(" "),t.username?n("button",{staticClass:"mw-ui-button mw-ui-constructive sign-in",attrs:{title:"Signed in as "+t.username},on:{click:t.signOut}},[t._v("Sign out")]):t._e(),t._v(" "),n("form",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.searchText,expression:"searchText"}],staticClass:"mw-ui-input",attrs:{type:"text",placeholder:"Search by title"},domProps:{value:t.searchText},on:{input:function(e){e.target.composing||(t.searchText=e.target.value)}}}),t._v(" "),n("label",{staticClass:"mw-ui-radio-label margin-top-5"},[t._v("\n            Limit search to current map view.\n            "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.bbox,expression:"bbox"}],staticClass:"mw-ui-checkbox",attrs:{type:"checkbox"},domProps:{checked:Array.isArray(t.bbox)?t._i(t.bbox,null)>-1:t.bbox},on:{change:function(e){var n=t.bbox,a=e.target,i=!!a.checked;if(Array.isArray(n)){var r=null,o=t._i(n,r);a.checked?o<0&&(t.bbox=n.concat([r])):o>-1&&(t.bbox=n.slice(0,o).concat(n.slice(o+1)))}else t.bbox=i}}})]),t._v(" "),n("button",{staticClass:"mw-ui-button mw-ui-constructive mw-ui-block margin-top-5",on:{click:function(e){t.search(t.searchText,e)}}},[t._v("Search")])]),t._v(" "),t.searchResult.length>0||"done"===t.searchStatus?n("h2",[t._v("Search Result")]):t._e(),t._v(" "),"executing"===t.searchStatus?n("spinner",{staticClass:"margin-top-14",attrs:{"line-fg-color":"#00af89"}}):t._e(),t._v(" "),"done"===t.searchStatus&&0===t.searchResult.length?n("p",[t._v("No results found.")]):t._e(),t._v(" "),t.searchResult.length>0?n("ul",{staticClass:"result-list"},t._l(t.searchResult,(function(t){return n("mapitem",{key:t.id,attrs:{map:t}})}))):t._e(),t._v(" "),t.featuredMap?n("h2",[t._v("Highlight")]):t._e(),t._v(" "),t.featuredMap?n("ul",{staticClass:"result-list"},[n("mapitem",{attrs:{map:t.featuredMap,activeInit:!0}})],1):t._e()],1)},c=[],l=(n(8706),function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.map?n("li",[n("div",{staticClass:"main",on:{click:t.clicked}},[n("img",{attrs:{src:t.map.attributes.thumb_url}}),t._v(" "),n("div",[n("h3",[t._v(t._s(t.refineTitle(t.map.attributes.title)))])])]),t._v(" "),t.active?n("div",{staticClass:"extended"},[n("button",{staticClass:"mw-ui-button mw-ui-progressive mw-ui-block margin-top-5",on:{click:t.toggleFullscreen}},[t._v("View Map")]),t._v(" "),n("h4",[t._v("Open in:")]),t._v(" "),n("a",{attrs:{href:"https://commons.wikimedia.org/wiki/File:"+t.map.attributes.unique_id}},[t._v("Wikimedia Commons")]),t._v(" "),n("a",{attrs:{href:"https://warper.wmflabs.org/maps/"+t.map.id}},[t._v("Wikimaps Warper")]),t._v(" "),n("a",{attrs:{href:"https://wd-image-positions.toolforge.org/file/"+t.map.attributes.unique_id}},[t._v("Wikidata Image Positions")]),t._v(" "),n("h4",[t._v("Export as:")]),t._v(" "),n("a",{attrs:{href:t.map.links.geotiff,download:""}},[t._v("GeoTiff")]),t._v(" "),n("a",{attrs:{href:t.map.links.png,download:""}},[t._v("PNG")]),t._v(" "),n("a",{attrs:{href:t.map.links.kml,download:""}},[t._v("KML")]),t._v(" "),n("p",[t._v("Copyright holder and licensing information can be found on Wikimedia Commons.")])]):t._e()]):t._e()}),p=[],m=(n(2062),n(4782),n(7495),n(5440),new a.A),f={name:"mapitem",props:{map:!1,activeInit:!1},data:function(){return{active:this.activeInit}},methods:{refineTitle:function(t){return t.slice(5).replace(/\.[^/.]+$/,"").replace(/_/g," ")},clicked:function(){this.active?(this.active=!1,this.toggleURLHash(""),m.$emit("clearLayers")):(this.active=!0,m.$emit("selected",this.map))},toggleFullscreen:function(){m.$emit("toggleFullscreen")},toggleURLHash:function(t){window.location.hash="#"+t}},mounted:function(){var t=this;this.active&&(m.$emit("selected",this.map),this.toggleURLHash(this.map.id)),m.$on("selected",(function(e){e.id!==t.map.id&&(t.active=!1),t.toggleURLHash(e.id)}))}},h=f,d=n(845),v=(0,d.A)(h,l,p,!1,null,"94b4a0f0",null),g=v.exports,b=n(5912),_=n.n(b),w={name:"sidebar",components:{mapitem:g,Spinner:_()},props:{featuredMap:!1},data:function(){return{searchResult:[],searchText:"",bbox:!1,searchStatus:"not-executed"}},computed:{username:function(){return F.state.username}},methods:{search:function(t,e){var n=this;e&&e.preventDefault(),this.searchStatus="executing";var a="";m.$emit("getBounds",(function(t){a="&bbox=".concat(t.getWest(),",").concat(t.getSouth(),",").concat(t.getEast(),",").concat(t.getNorth())}));var i="maps.json?query=".concat(t,"&show_warped=1&per_page=20");this.bbox&&(i+=a),this.searchResult=[],this.$http.get(i).then((function(t){n.searchResult=t.body.data,n.searchStatus="done"}))},signIn:function(){var t="https://warper.wmflabs.org",e=window.open(t+"/u/auth/mediawiki?omniauth_window_type=newWindow&auth_origin_url="+window.location.href,"myWindow"),n=setInterval((function(){var n="requestCredentials";e.postMessage(n,t)}),500);window.addEventListener("message",(function(e){e.origin===t&&(clearInterval(n),F.commit("signIn",e.data))}),!1)},signOut:function(){F.commit("signOut")}}},k=w,x=(0,d.A)(k,u,c,!1,null,"10f6ff09",null),y=x.exports,C=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"leaflet"}})},$=[],A=n(3481),M=n.n(A),O=(n(2189),n(245),{name:"leaflet",mounted:function(){var t=M().map("leaflet",{attributionControl:!1,fullscreenControl:!0,center:[40,10],zoom:3});M().tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:'Background &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(t);var e=M().layerGroup().addTo(t);M().control.attribution({prefix:""}).addTo(t),t.zoomControl.setPosition("topright"),t.fullscreenControl.setPosition("topright"),M().control.locate({position:"topright"}).addTo(t),m.$on("selected",(function(n){e.clearLayers(),e.addLayer(M().tileLayer.wms(n.links.wms,{layers:"MapWarper",format:"image/png",attribution:'<a href="https://commons.wikimedia.org/wiki/'.concat(n.attributes.title,'">Wikimedia Commons</a>')}));var a=n.attributes.bbox.split(",");t.fitBounds([[a[3],a[2]],[a[1],a[0]]])})),m.$on("clearLayers",(function(){e.clearLayers()})),m.$on("getBounds",(function(e){e(t.getBounds())})),m.$on("toggleFullscreen",(function(){t.toggleFullscreen()}))}}),S=O,T=(0,d.A)(S,C,$,!1,null,"5f99632a",null),L=T.exports,R={name:"app",components:{sidebar:y,leaflet:L},asyncComputed:{map:{get:function(){var t=window.location.hash.substring(1);return t?this.$http.get("maps/"+t).then((function(t){return t.body.data})):this.featuredMap}},featuredMap:{get:function(){var t=["86"];return this.$http.get("maps/"+t[Math.floor(Math.random()*t.length)]).then((function(t){return t.body.data}))},default:!1}}},I=R,W=(0,d.A)(I,o,s,!1,null,null,null),E=W.exports,P=n(5993),j=n(5353);a.A.use(r()),a.A.use(P.Ay),a.A.use(j.Ay),a.A.config.productionTip=!1,a.A.http.options.root="https://warper.wmflabs.org/api/v1";var F=new j.Ay.Store({state:{username:null,token:null},mutations:{signIn:function(t,e){t.token=e.auth_token,t.username=e.name},signOut:function(t){t.token=null,t.username=null}}});new a.A({render:function(t){return t(E)}}).$mount("#app")},2801:function(){}},e={};function n(a){var i=e[a];if(void 0!==i)return i.exports;var r=e[a]={exports:{}};return t[a].call(r.exports,r,r.exports,n),r.exports}n.m=t,function(){var t=[];n.O=function(e,a,i,r){if(!a){var o=1/0;for(l=0;l<t.length;l++){a=t[l][0],i=t[l][1],r=t[l][2];for(var s=!0,u=0;u<a.length;u++)(!1&r||o>=r)&&Object.keys(n.O).every((function(t){return n.O[t](a[u])}))?a.splice(u--,1):(s=!1,r<o&&(o=r));if(s){t.splice(l--,1);var c=i();void 0!==c&&(e=c)}}return e}r=r||0;for(var l=t.length;l>0&&t[l-1][2]>r;l--)t[l]=t[l-1];t[l]=[a,i,r]}}(),function(){n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,{a:e}),e}}(),function(){n.d=function(t,e){for(var a in e)n.o(e,a)&&!n.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={524:0};n.O.j=function(e){return 0===t[e]};var e=function(e,a){var i,r,o=a[0],s=a[1],u=a[2],c=0;if(o.some((function(e){return 0!==t[e]}))){for(i in s)n.o(s,i)&&(n.m[i]=s[i]);if(u)var l=u(n)}for(e&&e(a);c<o.length;c++)r=o[c],n.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return n.O(l)},a=self["webpackChunkmaps_search"]=self["webpackChunkmaps_search"]||[];a.forEach(e.bind(null,0)),a.push=e.bind(null,a.push.bind(a))}();var a=n.O(void 0,[504],(function(){return n(8478)}));a=n.O(a)})();
//# sourceMappingURL=app-legacy.be827e81.js.map