/*! Plugin options and other jQuery stuff */


// FitVids options
$(function() {
	$("article").fitVids();
});

// footnotes
$(document).ready(function() {
	$.bigfoot({
		activateCallback: function($popover, $button) {
			if (MathJax && !$button.data('mathjax-processed')) {
				var content_wrapper = $popover.find('.footnote-content-wrapper')[0];
				MathJax.Hub.Queue(['Typeset', MathJax.Hub, content_wrapper]);
				MathJax.Hub.Queue(function () {
					$button.attr('data-footnote-content', content_wrapper.innerHTML);
					$button.data('mathjax-processed', true);
				});
			}
		}
	});
});

