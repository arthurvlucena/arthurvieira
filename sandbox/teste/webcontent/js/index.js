var filePost = '../resources/setorBO.php';
var primeiroChecked = false;

//variaveis auxiliares para a paginação
var itensTabela;
var paginaAtual;
var ITENS_POR_PAGINA = 4;

var idEdit;
var linhaEdit;
(function($) {
	// resolvendo problema do checkbox na pesquisa
	// se o checkbox for checkado uma vez, a pesquisa ira considerar como 0 assim trazendo inativos
	// caso contrario ele não será considerado e assim trara ativos e inativos
	$('#ativo').click(function() {
		primeiroChecked = true;
	});

	// realizando o uppercase da sigla
	$("#sigla").keyup(function() {
		this.value = this.value.toUpperCase();
	});

	// resentando formulario
	$('#btnReset').click(function() {
		$('#formSetor')[0].reset();
	});

	// realiza busca por exemplo, usa qualquer um dos campos como filtro para pesquisa
	$('#btnPesquisar').click(function() {
		var json = $('#formSetor').serializeFormToJson();
		
		if (!json.ativo && primeiroChecked) {
			json.ativo = '0';
		}
	
		json.method = "pesquisar";
		
		doAjax(json, function(retorno){
			var length = retorno.length;
			
			if (length == 0) {
				alert('Nenhum resultado!');
				return;
			}	
			
			itensTabela = retorno;
			paginaAtual = 0;
			var tfoot = $('#tabela-setor-tfoot');
			tfoot.html('');
			
			if (length > ITENS_POR_PAGINA) {
				tfoot.html(controiPaginacao());
			}

			var html = '';
			for (var i = 0; i < ITENS_POR_PAGINA; i++) {
				var numElem = i+((paginaAtual)*ITENS_POR_PAGINA);
				var elem = itensTabela[numElem];
			
				if (!elem) {
					break;
				}
				
				html += criaLinhaSetor(elem);
			}
			
			var tbody = $('#tabela-setor-tbody');
			tbody.html('');
			tbody.html(html);
		});
	});

	// altera registro
	$('#btnSalvar').click(function() {
		var json = $('#formSetor').serializeFormToJson();
		
		if (!json.sigla) {
			alert('Campo "Sigla" obrigatorio! Favor preencher!');
			return;
		}
		
		if (!json.descricao) {
			alert('Campo "Setor" obrigatorio! Favor preencher!');
			return;
		}
		
		json.method = "editar";
		json.idsetor = idEdit;
		
		doAjax(json, function(retorno){
			$('#formSetor')[0].reset();
			alert('Registro alterado com sucesso!');
			
			var length = itensTabela.length;
			
			for (var i = 0; i < length; i++) {
				var element = itensTabela[i];

				if (element.idsetor == retorno.idsetor) {
					itensTabela[i] = retorno;
					break;
				}
			}
		
			var html = criaLinhaSetor(retorno);
			linhaEdit.replaceWith(html);
		});
	});

	// salva novo registro
	$('#btnNovo').click(function() {
		var json = $('#formSetor').serializeFormToJson();
		
		if (!json.sigla) {
			alert('Campo "Sigla" obrigatorio! Favor preencher!');
			return;
		}
		
		if (!json.descricao) {
			alert('Campo "Setor" obrigatorio! Favor preencher!');
			return;
		}
		
		json.method = "salvar";
		
		doAjax(json, function(retorno){
			$('#formSetor')[0].reset();
			alert('Registro salvo!');
		});
	});
	
	// constroi datagrid por paginação
	$('.btnPaginacao').live('click', function(){
		constroiDataGrid(this.id);
	});
	
	// botão editar
	$('.btnEdit').live('click', function(){
		linhaEdit = $($($(this).parent()).parent());
		var strJson = linhaEdit.children(":last-child").html();
		var json = JSON.parse(strJson);
		idEdit = json.idsetor;
		
		$('#sigla')[0].value = json.sigla;
		$('#descricao')[0].value = json.descricao;
		
		if (json.ativo == 1) {
			$("#ativo")[0].checked = true;
		} else {
			$("#ativo")[0].checked = false;
		}
	});
	
	$('.btnToogle').live('click', function(){
		var tr = $($(this).parent()).parent();
		var tdJson = $(tr).children(':last-child');
		var strJson = tdJson.html();
		
		var colSituacao = $($($(tr).children()).get(2)).children();
		var colToggle = $($($(tr).children()).get(4)).children();
		
		var colSituacaoTemp;
		var colToggleTemp;
		
		var json = JSON.parse(strJson);
		
		if (json.ativo == 0) { 
			json.ativo = 1;
			colSituacaoTemp = '<font color="#000099">Ativo</font>';
			colToggleTemp = '<img src="teste_arquivos/gtk-cancel.png" />';
		} else {
			json.ativo = 0;
			colSituacaoTemp = '<font color="#990000">Inativo</font>';
			colToggleTemp = '<img src="teste_arquivos/gtk-apply.png" />';
		}
		
		var jsonSend = json;
		jsonSend.method = "editar";
		
		doAjax(jsonSend, function(retorno){
			var length = itensTabela.length;
			
			for (var i = 0; i < length; i++) {
				var element = itensTabela[i];

				if (element.idsetor == json.idsetor) {
					itensTabela[i] = json;
					break;
				}
			}
			
			colSituacao.html(colSituacaoTemp);
			colToggle.html(colToggleTemp);
			
			tdJson.html(JSON.stringify(json));
		});
	});
	
	// serializa formulario em json
	jQuery.fn.serializeFormToJson = function () {
		var json = {};
		
		$.map(this.serializeArray(), function(n){
			json[n['name']] = n['value'];
		});
		
		return json;
	}
	
	// realiza chamada ajax e tratativas para verificação de erros
	function doAjax(json, callback){
		$.post(filePost, json, function(response) {
			var jsonReturn;
			try {	
				jsonReturn = JSON.parse(response);
			} catch(_){
				alert('Erro PHP: ' + response);
			}
			
			if (jsonReturn.status == 'fail') {
				alert('Problema ao executar comando. Erro Mysql: ' + jsonReturn.error);
			}
			
			callback(JSON.parse(jsonReturn.obj));
		});
	}
	
	// cria nova linha html para o datagrid
	function criaLinhaSetor(elemento) {
		var linha = '';
	
		linha = '<tr >' +
					'<td align="center" bgcolor="#FFFFFF" height="22" valign="middle">'+
						'<font color="#666666" face="Calibri" size="2">'+
							elemento.descricao+
						'</font>'+
					'</td>'+
					'<td align="center" bgcolor="#FFFFFF" height="22" valign="middle">'+
						'<font color="#666666" face="Calibri" size="2">'+
							elemento.sigla+
						'</font>'+
					'</td>'+
					'<td align="center" bgcolor="#FFFFFF" height="22" valign="middle" width="115">'+
						'<font color="#666666" face="Calibri" size="2">'+
								(elemento.ativo == 1 ? '<font color="#000099">Ativo' : '<font color="#990000">Inativo') +
							'</font>'+
						'</font>'+
					'</td>'+
					'<td width="16">'+
						'<a href="#" class="btnEdit">'+
							'<img src="teste_arquivos/edit-edit.png" />'+
						'</a>'+
					'</td>'+
					'<td width="16">'+
						'<a href="#" class="btnToogle">'+
							(elemento.ativo == 1 ? '<img src="teste_arquivos/gtk-cancel.png" />' : '<img src="teste_arquivos/gtk-apply.png" />') +
						'</a>'+
					'</td>'+
					'<td id="json'+elemento.idsetor+'" style="display: none;">'+
						JSON.stringify(elemento)+
					'</td>'+
				'</tr>';
				
		return linha;
	}
	
	// constroi linhas do data grid apartir de uma pagina
	function constroiDataGrid(pagina) {
		paginaAtual = pagina;
	
		var html = '';
		for (var i = 0; i < ITENS_POR_PAGINA; i++) {
			var numElem = i+((paginaAtual)*ITENS_POR_PAGINA);
			var elem = itensTabela[numElem];
			
			if (!elem) {
				break;
			}
			
			html += criaLinhaSetor(elem);
		}
		
		var tbody = $('#tabela-setor-tbody');
		tbody.html('');
		tbody.html(html);
	}
	
	// constroi links de paginação
	function controiPaginacao() {
		var pages = itensTabela.length / ITENS_POR_PAGINA;
		pages = Math.ceil(pages);
		
		var html = '';
		var i = 0;
		
		while (i < pages) {
			html += '<font color="#666666" face="Calibri" size="3"><a href="#" id="'+i+'" class="btnPaginacao">'+(i+1)+'</a></font>  ';
			i++;
		}
		
		return html;
	}
})(jQuery);