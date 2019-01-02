define(['dojo/_base/declare',
  'jimu/BaseWidget',
  './openlocationcode',
  'dojo/dom-class'
],
function(declare, BaseWidget, OpenLocationCode, domClass) {
  var clazz = declare([BaseWidget], {
    baseClass: 'openLocationCode',

    // More info on Open Location Code (aka "plus codes"):
    // https://plus.codes/
    // https://github.com/google/open-location-code

    onOpen: function() {

      if(this.config.showHover) {
        // Setup the mouse-move event:
        this.mouseMoveEvent = this.map.on('mouse-move', function(evt) {
          var code = OpenLocationCode.encode(evt.mapPoint.getLatitude(), evt.mapPoint.getLongitude());
  
          // Update the widget to show the new code:
          this.currentLocationWrapper.innerHTML = code;
        }.bind(this));
      }

      if(this.config.showClick) {
        // Setup the mouse-click event:
        this.mouseClickEvent = this.map.on('click', function(evt) {
          this.showSelectedPlusCode(evt.mapPoint);
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
    },

    showSelectedPlusCode: function(point) {
      // convert lat/lng to OpenLocationCode
      var code = OpenLocationCode.encode(point.getLatitude(), point.getLongitude());
  
      // Update the widget to show the new code:
      domClass.remove(this.clickedCurrentLocationWrapper, 'hidden');
      this.clickedCurrentLocation.innerHTML = code;
    }
  });
  return clazz;
});