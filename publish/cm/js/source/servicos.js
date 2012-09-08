(function() {
	/*status de tela
	 * http://stackoverflow.com/questions/5980389/proper-way-to-use-ajax-post-in-jquery-to-pass-model-from-strongly-typed-mvc3-vie
	 * http://www.tvidesign.co.uk/blog/improve-your-jquery-25-excellent-tips.aspx
	 * http://br.html5boilerplate.com/ 
	 * */
	var INIT = 0;
	var SAVE = 1;
	var EDIT = 2;
	var VISU = 3;
	
	//inicio variaveis importante 1
	var post = '../resources/FacadeBO.php';	
	var domain = 'servico';
	
	var loadingDiv = $("#loading-div");
	var errorDiv = $("#error-div");
	
	var dataTable = $(".data-grid");
	var listaPrincipal = null;
	
	var formPrincipal = $("#mainForm");
	//fim variaveis importantes 1
	
	var tituloVar;
	var conteudoVar;
	var dateD;
	
	var dataTableAddRow = function(row) {
		return "<tr id=\""+row.id+"\">" +
					"<td class=\"cell-tbody\">"+row.id+"</td>" +
					"<td class=\"cell-tbody\">"+$.maxChar(60, row.empresa)+"</td>" +
					"<td class=\"cell-tbody\">"+$.maxChar(60, row.marca)+"</td>" +
					"<td class=\"cell-tbody\">"+$.maxChar(60, row.modelo)+"</td>" +
					"<td class=\"cell-tbody\">"+$.maxChar(60, row.descricao)+"</td>" +
					"<td class=\"cell-tbody delete-class\">X</div></td>" +
					"<td style=\"display: none;\">"+JSON.stringify(row)+"</td>" +
				"</tr>";
	}
	
	function addRows(array) {
		var html = "<tbody>";
		
		for (var i = 0; i < array.length; i++) {
			html += dataTableAddRow(array[i]);
		}
		
		html += "</tbody>";
		
		removeRows();			
		
		$(".data-grid").append(html);
	}
	
	function addRow(row) {
		var html = dataTableAddRow(row);
		$(".data-grid > tbody").append(html);
	}
	
	function removeRows() {
		$(".data-grid > tbody").remove();
	}
	
	function replaceRow(row) {
		var html = dataTableAddRow(row);	
		$("tr#"+row.id).replaceWith(html);
	}
	
	$("table.data-grid > tbody > tr").live("click", function(){
		var str = $(this).children(":last-child").html();
		
		var json = eval('(' + str + ')');
		
		$("#id").attr("value", json.id);
		$("#empresa").attr("value", json.empresa);
		$("#modelo").attr("value", json.modelo);
		$("#marca").attr("value", json.marca);
		$("#descricao").attr("value", json.descricao);
		formPrincipal.enableForm();
	});	

	$('#save').click(function() {
		formPrincipal.enableForm();
	    var json = formPrincipal.serializeFormToJson();
	    
	    if (!json.id) {
	    	$.xmAjaxSync(json, domain, 'save', post, function(ret) {	    		
	        	addRow(ret);
	        	$.alert("Registro salvo com sucesso! =)");
	        });
	    } else {
	    	$.xmAjaxSync(json, domain, 'edit', post, function(ret) {	    		
	    		replaceRow(ret);
	    		$.alert("Registro atualizado com sucesso! =)");
	        });
	    }
	    
	    formPrincipal.disableForm();
	});
	
	$("#search").click(function() {
		var json = formPrincipal.serializeFormToJson();
		
		$.xmAjaxSync(json, domain, 'search', post, function(ret){
			if (ret.length < 1) {
				removeRows();
				$.alert("Nenhum resultado para a pesquisa!");
			} else {			
				addRows(ret);
			}
		});
	});
	
	$("#new").click(function() {
		formPrincipal.clearForm();
	});
	
	$("table.data-grid > tbody > tr > .delete-class").live("click", function(){
		var row = $(this).parent("tr");
		
		var id = row.attr("id");
	
		$.xmAjaxASync({id: row.attr("id")}, domain, 'delete', post, function(ret){
			$.alert("Removido com sucesso!");
			$(row).remove();
		});
	});
})();