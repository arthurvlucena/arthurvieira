(function($) {
	// componente FDText
	$.fn.extend({
	    fdText: function() {
	        $(this).on('click', function() {
	            var slt = $(this);
	
	            var text = slt.html();
	            
	            if (text == '&nbsp;') {
	              text = '';  
	            }
	            
	            slt.html('');
	            slt = slt.changeElementType('textarea')
	            .focus()
	            .attr('value', text)
	            .attr('rows', '1')
	            .attr('cols', '50');
	            $('.fd-text').fdText();                
	        });
	        
	        $(this).on('blur', function() {
	            var slt = $(this);
	            
	            var text = slt.attr('value');
	            
	            if (!text) {
	               text = '&nbsp;';
	            }
	            
	            slt.removeAttr('value');
	            slt.html(text);
	            slt.changeElementType('span');
	            $('.fd-text').fdText();
	        });
	        
	        $(this).on('keypress', function(e) {
	            if(e.which == 13) {
	                var slt = $(this);
	                slt.blur();
	                $('.fd-text').fdText();
	            }
	        });
	    }
	});
	
	// plugin de update de tipo de elemento
	$.fn.changeElementType = function(newType) {
	    var attrs = {};
	
	    $.each(this[0].attributes, function(idx, attr) {
	        attrs[attr.nodeName] = attr.nodeValue;
	    });
	    
	    var ret;
	    
	    this.replaceWith(function() {
	        ret = $("<" + newType + "/>", attrs).append($(this).contents());
	        return ret;
	    });
	    
	    return ret;
	};
})(jQuery);