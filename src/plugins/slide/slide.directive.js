"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstSlide", ["$interval", Directive]);

	function Directive($interval) {
		return {
			restrict: "A",
			scope: {
                nextCallback: '=',
                previousCallback: '='
            },
			link: function($scope, theElement){
                $element.css('transition', 'background-image 0.5s');
                $interval($scope.nextCallback(theElement), 300);   
			}
		};
	}
})();