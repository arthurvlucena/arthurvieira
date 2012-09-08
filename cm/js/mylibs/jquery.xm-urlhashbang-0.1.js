(function($) {
	jQuery.extend({
		hashBangRegex : /\/\#\!\//,
		getUrl : function() {
			return window.location.toString();
		},
		uhbGetUrlHashBang : function () {
			return $.getUrl().split($.hashBangRegex)[1];
		},
		uhbGetParam : function(param) {
			var keyValues = $.uhbGetUrlHashBang().split(/\//);
			
			keyValues.pop(keyValues.length-1);
			var i = keyValues.length;
			
			while (i > 0) {
				if (keyValues[i-2] == param) {
					return keyValues[i-1];
				}
				
			    i-=2;
			}
			
			return undefined;
		},
		uhbGetMapParams : function() {		
			var keyValues = $.uhbGetUrlHashBang().split(/\//);
			
			keyValues.pop(keyValues.length-1);
			var i = keyValues.length;
			
			var params = {};
			
			while (i > 0) {
				params[keyValues[i-2]] = keyValues[i-1];
			    i-=2;
			}
			
			return params;
		}, 
		uhbChangesUrl :  function(callback) {
			$(window).bind('hashchange', function() {
				callback();
			});
			
			$(window).load(function(){
				callback();
			});
		}
	});
})(jQuery);