(function($, Backbone, Handlebars)
{
   console.log({
      jquery: $,

      Backbone : Backbone,

      Handlebars: Handlebars
   });
   
   /**
    * Grab the fieldset which is a jQuery fieldset
    * object, and parse it for data like min/max
    * values
    */
   function getModelFromHTML( fieldset )
   {
      var model = {
	 value : fieldset.find('input[type="text"]').val() || false,

	 min : (function()
	 {
	    if( $.isNumeric(fieldset.find('input[type="text"]').attr('min')) )
	       return parseInt( fieldset.find('input[type="text"]').attr('min'));

	    return 0;
	 })(),

	 max : $.isNumeric( fieldset.find('input[type="text"]').attr('max') ) ?
	    parseInt( fieldset.find('input[type="text"]').attr( 'max' ) ) :
	    100,

	 label : fieldset.find('label.title').html()
      };

      return model;
   }

$(document).ready(function( event )
{

////

var SliderModel = Backbone.Model.extend({
   defaults: {
   },

   initialize : function( modelObj )
   {
      this.min = modelObj.min;

      this.max = modelObj.max;

      // if the value is not defined, then set it to
      // the min
      this.value = modelObj.value? modelObj.value : modelObj.min;
      
      this.label = modelObj.label;
   }
});

var SliderView = Backbone.View.extend( {

   // compiling a template to be used for
   // base rendering
   baseTpl : Handlebars.compile($('#tea-slider-template').html()),

   render : function()
   {
      var modelJSON = this.model.toJSON();

      modelJSON.value = modelJSON.value? 
	 modelJSON.value : modelJSON.min;

      var html = this.baseTpl( this.model.toJSON() );

      console.log( html );
     
      this.$el.html( html );
   }

});


$('fieldset[type="slider"]').each( function( index, object )
{
   var modelObj = getModelFromHTML($(object));

   var sliderModel = new SliderModel( modelObj );

   var sliderView = new SliderView( { model : sliderModel } );

   sliderView.render();
   
   $('body').append( sliderView.el );

});

});

////
})(jQuery, Backbone, Handlebars)
