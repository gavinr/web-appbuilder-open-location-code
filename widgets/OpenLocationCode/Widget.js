define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/geometry/webMercatorUtils',
  './openlocationcode'
],
function(declare, BaseWidget, webMercatorUtils, OpenLocationCode) {
  var clazz = declare([BaseWidget], {

    onOpen: function() {
      // Setup the mouse-move event:
      this.mouseMoveEvent = this.map.on('mouse-move', function(evt) {
        // convert web mercator to lat/lon for conversion to OpenLocationCode:
        var lngLatArray = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y);

        // convert lat/lng to OpenLocationCode
        var code = OpenLocationCode.encode(lngLatArray[1], lngLatArray[0]);

        // Update the widget to the new code:
        this.currentLocationWrapper.innerHTML = code;
      }.bind(this));
    },

    onClose: function() {
      if(this.mouseMoveEvent) {
        this.mouseMoveEvent.remove();
      }
    }
  });
  return clazz;
});