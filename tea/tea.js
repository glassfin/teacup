/**
 * Entry point to 'T'
 */
define(
function( require )
{
   var Tea = window.Tea = {
      // require
      autocomplete : require( 'model/autocomplete' )
   }

   return Tea;
});
