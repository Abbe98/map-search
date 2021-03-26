(function (factory, window) {
  // see https://github.com/Leaflet/Leaflet/blob/master/PLUGIN-GUIDE.md#module-loaders
  // for details on how to structure a leaflet plugin.

  // define an AMD module that relies on 'leaflet'
  if (typeof define === 'function' && define.amd) {
    define(['leaflet'], factory);

    // define a Common JS module that relies on 'leaflet'
  } else if (typeof exports === 'object') {
    if (typeof window !== 'undefined' && window.L) {
      module.exports = factory(L);
    } else {
      module.exports = factory(require('leaflet'));
    }
  }

  // attach your plugin to the global 'L' variable
  if (typeof window !== 'undefined' && window.L) {
    window.L.Control.Slider  = factory(L);
  }
}(function (L) {
  L.Control.Slider = L.Control.extend({
    onAdd: function (map) {
      var root = L.DomUtil.create('div');
      root.className += 'LeafletSlider';
      root.innerHTML = '<div class="LeafletSlider-scale"><div class="LeafletSlider-button"></div></div>';

      map.whenReady(function () {
        var isMouseDown = false;
        var currentVal = 0;
        var startMouseX;
        var lastElemLeft;
        var getMousePosition = function (e) {
          var posx = 0;
          var posy = 0;

          if (!e) var e = window.event;

          if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
          } else if (e.clientX || e.clientY) {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
          }

          return { 'x': posx, 'y': posy };
        };

        var updatePosition = function (e) {
          var pos = getMousePosition(e);

          var spanX = (pos.x - startMouseX);

          var newPos = (lastElemLeft + spanX);

          var upperBound = (root.querySelector('.LeafletSlider-scale').offsetWidth - root.querySelector('.LeafletSlider-button').offsetWidth);
          newPos = Math.max(0, newPos);
          newPos = Math.min(newPos, upperBound);
          currentVal = Math.round((newPos / upperBound) * 100, 0);

          root.querySelector('.LeafletSlider-button').style.left = newPos + 'px';
        };

        function startSlide(e) {
          isMouseDown = true;
          map.dragging.disable();
          var pos = getMousePosition(e);
          startMouseX = pos.x;

          lastElemLeft = (root.querySelector('.LeafletSlider-button').offsetLeft - root.offsetLeft + 10);
          updatePosition(e);

          return false;
        }

        function moving(e) {
          if (isMouseDown) {
            updatePosition(e);
            var event = new CustomEvent('sliderChange', {
              detail: {
                value: currentVal
              }
            });

            root.dispatchEvent(event);
            return false;
          }
        }

        function dropCallback(e) {
          if (isMouseDown) {
            isMouseDown = false;
            map.dragging.enable();
            var event = new CustomEvent('sliderDrop', {
              detail: {
                value: currentVal
              }
            });

            root.dispatchEvent(event);
          }
        }

        root.querySelector('.LeafletSlider-button').addEventListener('mousedown', startSlide);
        root.addEventListener('mousemove', moving, false);
        document.addEventListener('mouseup', dropCallback, false);
      });
      return root;
    }

  });

  L.control.slider = function (opts) {
    return new L.Control.Slider(opts);
  }

  return L.Control.Slider;
}, window));