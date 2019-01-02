define(['dojo/_base/declare', 'jimu/BaseWidgetSetting'],
function(declare, BaseWidgetSetting) {

  // extend from jimu/BaseWidgetSetting:
  // https://developers.arcgis.com/web-appbuilder/guide/make-widget-configurable-in-builder.htm
  return declare([BaseWidgetSetting], {
    baseClass: 'openLocationCodeSettings',

    postCreate: function(){
      //the config object is passed in
      this.setConfig(this.config);
    },

    getConfig: function() {
      // return the config data input by the user
      return {
        "showHover": this.showHoverCheckbox.checked,
        "showClick": this.showClickCheckbox.checked
      };
    },

    setConfig: function(config) {
      // initialize the widget setting page depending on the widget config data
      if(config.hasOwnProperty('showHover') && config.showHover === true) {
        this.showHoverCheckbox.checked = true;
      }

      if(config.hasOwnProperty('showClick') && config.showClick === true) {
        this.showClickCheckbox.checked = true;
      }
    }
  });
});