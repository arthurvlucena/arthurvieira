$(function(){
	$("a").live("click", function(event){
		var href = $(this).attr("href");
		if(href[0] == "/"){
			event.preventDefault();
			window.location.hash = "#!" + href;
		}
	});

  // Bind an event to window.onhashchange that, when the hash changes, gets the
  // hash and adds the class "selected" to any matching nav link.
  $(window).hashchange( function(){
    var params = location.hash.replace( /^#!/, '' ) || 'blank';
    
    // Set the page title based on the hash.
	
    document.title = params + ' - AJAX Hashchange e jQuery';
    
    // Iterate over all nav links, setting the "selected" class as-appropriate.
	params = params.split("=");
	if (params[1] == "link1") {
		$('#postlinks').html('<a href="/post=1">post1</a><a href="/post=2">post2</a>');
	} else {
		$('#postlinks').html('');
	}
  })
  
  // Since the event is only triggered when the hash changes, we need to trigger
  // the event now, to handle the hash the page may have loaded with.
  $(window).hashchange();
});