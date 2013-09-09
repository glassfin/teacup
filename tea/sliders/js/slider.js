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

      console.log( model );
   }

   $(document).ready(function( event )
   {
      $('fieldset[type="slider"]').each( function( index, object )
      {
	 getModelFromHTML($(object));
      });
   });

////

Backbone.Model.extend({
   defaults: {
   },

   initialize : function( modelObj )
   {
      // if the value is not defined, then set it to
      // the min
      this.value = modelObj.value || modelObj.min;
      
   }
});

////
})(jQuery, Backbone, Handlebars)
