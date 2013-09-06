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
   [ 'lib/jquery' ],

   function( $ )
   {
      // change stuff around with jQuery
      // extend the event object       
      $.T = $.T || {};

      $.extend($.T, {
         ContentChangeEvent : function( type, params )
         {
            return $.extend( new $.Event( type ), params );
         },
      });
      
      /**
       * Extend jQuery: contentchange
       */
      $.fn.contentchange = function( data, handler )
      {
         if( handler === undefined )
         {
            return $.fn.on.call( this, 'contentchange', data );
         }

         return $.fn.on.call( this, 'contentchange', data, handler )
      }
      
      // change stuff around with the element
      // itself
      //$.event.special['contentchange']
      $.event.special['contentchange'] = {
         add : function( handler, data, namespace )
         {
            /*
            console.log( {
               namespace : namespace,

               handler : handler,

               data : data
            } );
            */
         },

         remove : function()
         {
            
         }
      }

      //$('.scroll').on('contentchange', function( event ){});
      var html = $.fn.html;

      $.fn.html = function( htmlString )
      {
         if( htmlString === undefined )
            return html.call( this );

         return this.each( function( index, element)
         {
            var eventObj = 
               new $.T.ContentChangeEvent( 'contentchange' );

            $.event.trigger( eventObj, undefined, element );
            html.call( $(element), htmlString );
         } );
      }

      $('.scroll')
      .contentchange( function( event )
      {
         console.log( event );
      });

      $('.scroll').each( function( index, element )
      {
         var innerHTMLProp = Object.getOwnPropertyDescriptor( element, 'innerHTML' );

         //console.log( innerHTMLProp );
         /*Object.defineProperty( obj, 'innerHTML', $.extend( innerHTMLProp,
         {
            set 
         });*/

         var appendChild = element.appendChild;

         element.appendChild = function( html )
         {
            console.log( html );
         }

         var newInnerHTMLProp = $.extend( innerHTMLProp, 
         {
            get : function() { return; },

            set : function( val ) {
               //console.log( val );
               innerHTMLProp = Object.getOwnPropertyDescriptor( element, 'innerHTML' );

               var clone = this.cloneNode();

               clone.innerHTML = val;
               console.log( clone.childNodes );

               var i = this.childNodes.length;

               var len = clone.childNodes.length;

               while( i = this.childNodes.length > 0 )
               {
                  this.removeChild( this.childNodes[ i - 1 ] );
               }

               while( clone.childNodes.length > 0 )
               {
                  appendChild.call( this, clone.childNodes[ 0 ] );
                  this.appendChild( clone.childNodes[ 0 ] );
               }
            }

         });

         delete newInnerHTMLProp.writable;
         delete newInnerHTMLProp.value;

         Object.defineProperty( element, 'innerHTML', newInnerHTMLProp );

      } );

      //$('.scroll').html('hello');
      var abs = $('.scroll')[0];
      abs.innerHTML = 'goodbye!<b>hello</b>';

      abs.innerHTML = 'ahhh<p>four score</p><p>and crazy</p>';
      // IE
      // testing, testing 1-2-3
   }
);
