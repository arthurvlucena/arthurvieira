(function($) {
// funções de tela
// add tamanho fixo para tabela, e mostrar o excedente por hinttext
var sqlCanvas = $('#sql-canvas');
var newTableHtml = '<div id="#ID" class="sql-table">' + '<div class="sql-table-title"><span class="fd-text-title">#NAMETABLE</span> <div class="sql-table-title-close">X</div></div>' + '<div class="sql-table-rows"></div>' + '<div class="sql-table-add-row">+</div>' + '<div class="sql-table-data"></div>' + '</div>';
var newRowHtml = '<div id="row-#ID-#IDTABLE" class="sql-table-row"><span class="fd-text-row">New Row</span></div>';
var tableCount = 0;

var centerL = (sqlCanvas.css('width').replace('px', '') / 2) + sqlCanvas.offset().left;
var centerT = (sqlCanvas.css('height').replace('px', '') / 2) + sqlCanvas.offset().top;

var getDataFromTable = function(tableId) {
    return eval('(' + $('#' + tableId + ' > .sql-table-data').html() + ')');
};

// botões
$('#add-table').click(function() {
    tableCount = tableCount + 1;

    var id = 'table-' + tableCount;
    var name = 'New Table ' + tableCount;

    var htmlTemp = newTableHtml.replace('#ID', id).replace('#NAMETABLE', name);

    sqlCanvas.append(htmlTemp);

    $('#' + id).offset({
        top: centerT,
        left: centerL
    });

    $('#' + id).draggable({
        snap: true,
        grid: [10, 10]
    });

    var table = new SqlTable();
    table.setId(id);
    table.setNameTable(name);

    $('#' + id + ' > .sql-table-data').append(JSON.stringify(table));

    var closeButton = $('#' + id + ' > div.sql-table-title > div.sql-table-title-close');

    $('.fd-text-title').fdText(function(slt) {
        closeButton.hide();
    }, function(slt) {
        var tableData = getDataFromTable(id);
        var tableSQL = new SqlTable().byJson(tableData);
        tableSQL.setNameTable($(slt).html());

        $('#' + id + ' > .sql-table-data').html(JSON.stringify(tableSQL));

        closeButton.show();
    });
});

$("#gen-sql").click(function() {
    var tables = sqlCanvas.children();

    for (var i = 0, length = tables.size(); i < length; i++) {
        var table = getDataFromTable(tables[i].id);

        console.log(table);

        var sql = 'CREATE TABLE ' + table.nameTable + ' ( \n';
        var sqlRow = '';

        for (var j = 0, lengthj = table.rows.length; j < lengthj; j++) {
            if (sqlRow != '') {
                sqlRow += ', \n'
            }

            var row = table.rows[j];
            sqlRow += row.nameRow;
        }

        var resultSql = sql + sqlRow + ')';

        console.log(resultSql);
    }
});

// botões table
$('.sql-table-title-close').live('click', function() {
    $(this).parent().parent().remove();
});

$('.sql-table-add-row').live('click', function() {
    var table = $($($(this).parent()));
    var tableId = table.attr('id');

    var rowsCanvas = $('#' + tableId + ' > .sql-table-rows');
    var tableData = getDataFromTable(tableId);

    var tableSQL = new SqlTable().byJson(tableData);
    var rowSQL = new SqlRow();

    var rowId = rowsCanvas.children().size() + 1;
    
    rowSQL.setId(rowId);
    rowSQL.setNameRow("New Row");
    tableSQL.addRow(rowSQL);

    $('#' + tableId + ' > .sql-table-data').html(JSON.stringify(tableSQL));
    
    var newRowHtmlTmp = newRowHtml.replace('#ID', rowId).replace('#IDTABLE', tableId);
    
    rowsCanvas.append(newRowHtmlTmp);

    $('.fd-text-row').fdText(function(slt) {
        //console.log(slt);
    }, function(slt) {
        // pegar row pelo index
        var table = $(slt).parent().parent().parent();
        var data = getDataFromTable (table[0].id);        
        
        for (var i = 0, length = data.rows.length; i < length; i++) {           
            if (data.rows[i].id == rowId) {
                data.rows[i].nameRow = $(slt).html();
            }
        }  
        
        // pegar o json da tabela, e atualizar o valor da coluna alterada 
       
        $('#' + table[0].id +' > .sql-table-data').html(JSON.stringify(data));
    });
});

})(jQuery); 