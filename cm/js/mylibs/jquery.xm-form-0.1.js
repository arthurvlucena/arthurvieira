(function($) {
	jQuery.extend({
		iterateForm : function (form, callback) {
			var fields = $(form[0]).children();
			
			for (var i = 0;i < fields.length; i++) {
				callback(fields[i]);
			}
		}, 
		
		serializeFormToJson : function(form) {
			var json = {};
			
			$.map(form.serializeArray(), function(n){
				json[n['name']] = n['value'];
			});
			
			return json;
		}, 
		
		refreshValueRadio : function(radioName, value) {
		    var radios = $('input[name='+radioName+']:radio');
		    var i = radios.length;   
		    var radio;
		    
		    while (i > 0) {
		        radio = $(radios[i-1]);
		        
		        if (radio.attr('value').toString() == value) {
	                radio.attr('checked', 'true');
	                break;
		        }    
		        i--;
		    }
		},
		
		getValueRadio : function(radioName, value, check) {
		    var radios = $('input[name='+radioName+']:radio');
		    var i = radios.length;   
		    var radio;
		    
		    while (i > 0) {
		        radio = $(radios[i-1]);
		        
		        if (radio.attr('checked')) {
		            return radio.attr('value').toString();
		        }    
		        i--;
		    }
		}
	});
	
	jQuery.fn.iterateForm = function (callback) {
		var fields = $(this[0]).children();
		
		for (var i = 0, length = fields.length; i < length; i++) {
			callback(fields[i]);
		}
	}
	
	jQuery.fn.iterateFormTextOnly = function (callback) {
		var fields = $(this[0]).children();
		
		for (var i = 0, length = fields.length; i < length; i++) {
			var field = fields[i];
			if (field.type == 'text' || field.type == 'textarea') {
				callback(field);
			}
		}
	}
	
	jQuery.fn.serializeFormToJson = function () {
		var json = {};
		
		$.map(this.serializeArray(), function(n){
			json[n['name']] = n['value'];
		});
		
		return json;
	}
	
	jQuery.fn.clearForm = function () {
		$.iterateForm(this, function(field){
			if (field.type == 'text' || field.type == 'textarea' || field.type == 'date'){
				field.disabled = false;
				field.value = "";
			} else if ($(field).hasClass('xm-radio')) {
				$(field).children().prop('disabled', false);
				$(field).children().prop('checked', false);
			}
		});
	}
	
	jQuery.fn.enableForm = function () {
		$.iterateForm(this, function(field){
			if (field.type == 'text' || field.type == 'textarea' || field.type == 'radio' || field.type == 'date') {
				field.disabled = false;
			} else if ($(field).hasClass('xm-radio')) {
				$(field).children().prop('disabled', false);
			}
		});
	}
	
	jQuery.fn.disableForm = function () {
		$.iterateForm(this, function(field){
			if (field.type == 'text' || field.type == 'textarea' || field.type == 'radio' || field.type == 'date') {
				field.disabled = true;
			} else if ($(field).hasClass('xm-radio')) {
				$(field).children().prop('disabled', true);
			}
		});
	}
})(jQuery);
