// this is for the minified javascript
requirejs.config({
   // define the base url
   baseUrl : 'tea',

   paths : {
      lib : '../lib/min'
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

