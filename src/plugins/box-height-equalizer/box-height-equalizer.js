"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstHeightEqualizer", ["$timeout", Directive]);

	function Directive($timeout) {
		return {
			restrict: "A",
			scope: {},
			link: function($scope, theElement){               
                function resizeHeights(){
                    var biggestHeight = 0;
                    var childrenSelector = ".lst-price-box:not(.-featured)";
                    var featuredSelector = ".lst-price-box.-featured";

                    $(childrenSelector).each(function(){
                        var height = $(this).outerHeight();
                        if (biggestHeight < height) 
                            biggestHeight = height;
                    });
    
                    $(childrenSelector).each(function(){
                        $(this).outerHeight(biggestHeight + 85);
                    });

                    // Resize featured too
                    var $featured = $(featuredSelector);
                    var currentHeight = $featured.outerHeight();
                    $featured.outerHeight(currentHeight + 85);
                }
                
                $timeout(resizeHeights);

                window.addEventListener('resize', resizeHeights);
			}
		};
	}
})();

/*
$(document).ready(function(){
    console.log('in theory, DOM is loaded');
});
*/