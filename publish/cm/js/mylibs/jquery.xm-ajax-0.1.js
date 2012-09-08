(function($) {
	var showLoader;

//	key esc cancel call ajax and hide overlay
	$('body').bind('keypress', function(e) {
        if(e.keyCode==27){
        	$.hideLoadingASync();
        	$.hideLoadingSync();
        }
	});
	
	$.ajaxSetup ({  
	    cache: false  
	});  
	
	jQuery.extend({
		xmAjaxASync :  function (json, domain, method, wherePost, callback) {
			var attrsJson;
			
			var jsonString;
			if (json) {
				jsonString = '{"domain": "'+domain+'", "attrs": '+JSON.stringify(json)+'}'; 
			} else {
				jsonString = '{"domain": "'+domain+'", "attrs": "'+[]+'"}'; ;
			}
			
			json = $.parseJSON(jsonString);
			
			showLoader = setTimeout("$.showLoadingASync()", 1000);
			
			$.post(wherePost,{json: json, method: method}, function(response) {
				try {
					clearTimeout(showLoader);
					$.hideLoadingASync();
					
			    	if (response == "-1") {
			    		$.displayError("Problema de conexão com o servidor!");
			    		return;
			    	}
			    	
			    	callback(jQuery.parseJSON(response));
			    } catch(err){
			    	$.displayError("Erro PHP: " + response + "\n Erro JS: " + err);
				}
			});
		}, 
		xmAjaxSync : function (json, domain, method, wherePost, callback) {
			var attrsJson;
			
			var jsonString;
			if (json) {
				jsonString = '{"domain": "'+domain+'", "attrs": '+JSON.stringify(json)+'}'; 
			} else {
				jsonString = '{"domain": "'+domain+'", "attrs": "'+[]+'"}'; ;
			}
			
			json = $.parseJSON(jsonString);
			
			showLoader = setTimeout("$.showLoadingSync()", 1000);
			
			$.post(wherePost,{json: json, method: method}, function(response) {
				try {
					clearTimeout(showLoader);
					$.hideLoadingSync();
					
			    	if (response == "-1") {
			    		$.displayError("Problema de conexão com o servidor!");
			    		return;
			    	}
			    	
			    	callback(jQuery.parseJSON(response));
			    } catch(err){
			    	$.displayError("Erro PHP: " + response + "\n Erro JS: " + err);
				}
			});
		}
	});
	
	jQuery.fn.xmAjaxASync = function(json, domain, method, wherePost, callback) {
		var html = '<div id="loading-ajax-div" style="font-size: 2em; margin:15px; text-align:center;">Carregando...</div>';
		this.append(html);
		
		var jsonString;
		if (json) {
			jsonString = '{"domain": "'+domain+'", "attrs": '+JSON.stringify(json)+'}'; 
		} else {
			jsonString = '{"domain": "'+domain+'", "attrs": "'+[]+'"}'; ;
		}
		
		json = $.parseJSON(jsonString);
		
		$.post(wherePost,{json: json, method: method}, function(response) {
			try {
				$("#loading-ajax-div").remove();
				
		    	if (response == "-1") {
		    		$.displayError("Problema de conexão com o servidor!");
		    		return;
		    	}
		    	
		    	callback(jQuery.parseJSON(response));
		    } catch(err){
		    	$.displayError("Erro PHP: " + response + "\n Erro JS: " + err);
			}
		});
	}
	
})(jQuery);
