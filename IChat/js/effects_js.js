    function runEffect() {
      var selectedEffect = "fold";
      var options = {};
      if ( selectedEffect === "scale" ) {
        options = { percent: 50 };
      } else if ( selectedEffect === "size" ) {
        options = { to: { width: 280, height: 185 } };
      }
      $( "#effect" ).show( selectedEffect, options, 500, callback );
    };
  function callback() {
//    setTimeout(function() {
//      $( "#effect:visible" ).removeAttr( "style" ).fadeOut();
//    }, 1000 );
  };