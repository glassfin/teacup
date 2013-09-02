// this is for the minified javascript
requirejs.config({
   // define the base url
   baseUrl : 'tea',

   paths : {
      lib : '../lib/min',

      plugin : '../lib/plugin',

      view : 'view',

      model : 'model',

      widget : 'widget'
   },

   shim : {
      'lib/jquery' : {
         exports : '$'
      },

      'lib/underscore' : {
         exports : '_'
      },

      'lib/backbone' : {
         deps : ['lib/underscore', 'lib/jquery'],

         exports : 'Backbone'
      },

      'lib/handlebars' : {
         exports : 'Handlebars'
      }
   }
});

require(
   ['lib/jquery', 'lib/underscore', 'lib/backbone', 'tea', 'widgets/scrollbar'],

   function( $, _, Backbone, T, Scrollbar )
   {
      // make a scroll bar for this div 
      var scrollingContent = 
         $('.scroll');

      var Scrollbar = function( container, type )
      {
         /// init: container
         // data
         var data = {
            container : $( container ),

            type : type 
         }

         // get data about the container
         console.log({
            height : container.height(),

            width : container.width(),

            offset : container.offset()
         });

         // events
         $(window).resize( function( event )
         {
            console.log({
               height : container.height(),

               width : container.width(),

               offset : container.offset()
            });
         });
         
         // getters
         this.get = function( value )
         {
            return this.data[ value ];
         }

         // setters
      }
      
      Scrollbar.prototype = {
         scroll : function( )
         {
            //updates the scroll
         }
      };

      var scroll = new Scrollbar( scrollingContent );
   }
);
