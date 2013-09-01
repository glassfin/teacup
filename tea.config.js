// this is for the minified javascript
requirejs.config({
   // define the base url
   baseUrl : 'tea',

   paths : {
      lib : '../lib/min',

      view : 'view',

      model : 'model'
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
   ['lib/underscore', 'lib/backbone', 'tea'],

   function( _, Backbone, T )
   {
      // do something with tea
   }
);
