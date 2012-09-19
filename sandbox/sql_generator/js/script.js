(function($) {
	
	function SqlRow () {
	    var nameRow;
	    var type;
	    var primaryKey;
	    
	    SqlRow.prototype.setNameRow = function (_nameRow) {
	       this.nameRow = _nameRow;            
	    }
	    
	    SqlRow.prototype.getNameRow = function () {
	        return this.nameRow;                    
	    }
	}

	function SqlTable () {
	    var id;
	    var nameTable;
	    var rows; 
	
	    SqlTable.prototype.setId = function  (_id) {
	       this.id= _id;            
	    }
	    
	    SqlTable.prototype.getId = function () {
	        return this.id;                    
	    }
	
	    SqlTable.prototype.setNameTable = function  (_nameTable) {
	       this.nameTable= _nameTable;            
	    }
	    
	    SqlTable.prototype.getNameTable = function () {
	        return this.nameTable;                    
	    }
	        
	    SqlTable.prototype.setRows = function (_rows) {
	       this.rows= _rows;            
	    }
	    
	    SqlTable.prototype.addRow = function (row) {
	        if (!this.rows) {
	            this.rows = new Array();
	        }
	        
	        this.rows.push(row);              
	    } 
	    
	    SqlTable.prototype.getRows = function () {
	        return this.rows;                    
	    }
	}
	    
	// gerador de sqls mysql visual
	
	var coluna1 = new SqlRow();
	coluna1.setNameRow("coluna_teste_1");
	
	var tabela = new SqlTable();
	tabela.setNameTable("tabela1");
	tabela.addRow(coluna1);
	
	// console.log(tabela);
	
	// funções de tela
	// add tamanho fixo para tabela, e mostrar o excedente por hinttext
	var sqlCanvas = $('#sql-canvas');
	var newTableHtml = 
	'<div id="#ID" class="sql-table">'+
	    '<div class="sql-table-title">#NAMETABLE <div class="sql-table-title-close">X</div></div>'+
	    '<div class="sql-table-rows"></div>'+
	    '<div class="sql-table-add-row">+</div>'+
	    '<div class="sql-table-data"></div>'+
	'</div>';
	var tableCount = 0;
	var listTableObj = new Array();
	
	var centerL = (sqlCanvas.css('width').replace('px', '') / 2) + sqlCanvas.offset().left;
	var centerT = (sqlCanvas.css('height').replace('px', '') / 2) + sqlCanvas.offset().top;
	
	var unselectTables = function () {
	    $('#sql-canvas > .sql-table-selected').removeClass('sql-table-selected');
	};
	
	$('#add-table').click(function(){
	    unselectTables();       
	    var htmlTemp = newTableHtml;
	    tableCount = tableCount + 1;
	    
	    var id = 'table-'+tableCount;
	    var name = 'New Table '+tableCount;
	    
	    htmlTemp = htmlTemp.replace('#ID', id)
	    .replace('#NAMETABLE', name );
	    
	    sqlCanvas.append(htmlTemp);
	   
	    $('#'+id).offset({ top: centerT, left: centerL});
	    
	    $('#'+id).draggable({snap: true, grid: [ 10,10] });
	    
	    var table = new SqlTable();
	    table.setId(id);
	    table.setNameTable(name);
	    
		$('#'+id+' > .sql-table-data').append(JSON.stringify(table));
	    listTableObj.push(table);
	});
	
	
	sqlCanvas.live('click', function(event){  
	    unselectTables();
	    
	    
	    // adiciona cor de destaque na tabela em uso
	    /*
	    if (event.srcElement.id != 'sql-canvas') {
	        $('#'+event.srcElement.id).addClass('sql-table-selected');
	    }
	    */
	});
	
	$('.sql-table').live('mousedown', function(){
	    unselectTables();
	     
	    $(this).addClass('sql-table-selected');
	});
	
	$('.sql-table-title-close').live('click', function() {
	   $($(this).parent()).parent().remove();
	});
	
	$('sql-table-add-row').live('click', function(){
	    
	});
	
})(jQuery);