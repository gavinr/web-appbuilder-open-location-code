define(['dojo/_base/declare',
  'jimu/BaseWidget',
  'esri/geometry/webMercatorUtils',
  './openlocationcode',
  'dojo/dom-class'
],
function(declare, BaseWidget, webMercatorUtils, OpenLocationCode, domClass) {
  var clazz = declare([BaseWidget], {
    baseClass: 'openLocationCode',

    // More info on Open Location Code (aka "plus codes"):
    // https://plus.codes/
    // https://github.com/google/open-location-code

    onOpen: function() {

      if(this.config.showHover) {
        // Setup the mouse-move event:
        this.mouseMoveEvent = this.map.on('mouse-move', function(evt) {
          // convert web mercator to lat/lon for conversion to OpenLocationCode:
          // https://developers.arcgis.com/javascript/3/jsapi/esri.geometry.webmercatorutils-amd.html#xytolnglat
          var lngLatArray = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y);
  
          // convert lat/lng to OpenLocationCode
          var code = OpenLocationCode.encode(lngLatArray[1], lngLatArray[0]);
  
          // Update the widget to show the new code:
          this.currentLocationWrapper.innerHTML = code;
        }.bind(this));
      }

      if(this.config.showClick) {
        // Setup the mouse-click event:
        this.mouseClickEvent = this.map.on('click', function(evt) {
          // convert web mercator to lat/lon for conversion to OpenLocationCode:
          // https://developers.arcgis.com/javascript/3/jsapi/esri.geometry.webmercatorutils-amd.html#xytolnglat
          var lngLatArray = webMercatorUtils.xyToLngLat(evt.mapPoint.x, evt.mapPoint.y);
  
          // convert lat/lng to OpenLocationCode
          var code = OpenLocationCode.encode(lngLatArray[1], lngLatArray[0]);
  
          // Update the widget to show the new code:
          domClass.remove(this.clickedCurrentLocationWrapper, 'hidden');
          this.clickedCurrentLocation.innerHTML = code;
        }.bind(this));

        domClass.remove(this.clickOnMapInstructions, 'hidden');
      }

    },

    onClose: function() {
      // remove the mouse move event:
      if(this.mouseMoveEvent) {
        this.mouseMoveEvent.remove();
      }

      // remove the mouse click event:
      if(this.mouseClickEvent) {
        this.mouseClickEvent.remove();
      }
    }
  });
  return clazz;
});