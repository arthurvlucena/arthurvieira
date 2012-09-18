(function($) {
	console.log('here');
	
	// Funcoes da pagina	
	$('#bt-addlink').click(function(){
		console.log('teste');
		
	   $('#links').append('<span class = "fd-text block">Novo link, clique aqui...</span>');
	   $('.fd-text').fdText();
	});
	
	$('.fd-text').fdText();
})(jQuery);