(function() {
	$(function(){		
		//http://www.tuttoaster.com/enhancing-forms-using-jquery-ui/4/
		//http://imasters.com.br/artigo/21928/javascript/30-dicas-para-melhorar-o-desempenho-do-javascript
		//http://www.quickonlinetips.com/archives/2010/05/leverage-browser-caching-increase-website-speed/
		//document.domain = "localhost";
		
		var loadLink = function (url) {
			content.css('height','800px');
			contentWrapper.hide();
			contentWrapper.load(url, function(){
				contentWrapper.fadeIn(250);
				content.css('height','');
				return false;
			});
		}
		
	 	var contentDiv = $('#content');
		var cadServico = $('#cad-servico');
		
		var content = $('#content');
	 	var contentWrapper = $('#content-wrapper');

	 	loadLink("content/pontos.html");
		
		cadServico.click(function(){
			loadLink("content/servicos.html");
		});
	});
})();