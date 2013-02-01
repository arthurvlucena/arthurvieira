window.scrollTo(0, 1);

if (typeof jQuery == 'undefined') {
    document.write(unescape("%3Cscript src='js/jquery.min.js' type='text/javascript'%3E%3C/script%3E"));
}

(function($) {

    jQuery.extend({
        xmExample: function(callback) {
            return callback();
        }
    });

    jQuery.fn.xmExample = function(callback) {
        // this = igual o elemento onde a função foi chamada
        this.hide();

        callback();

        return;
    }

    var links = $('.xm-link');
    console.log(links);

})(jQuery);