"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstMenuButton", Directive);

	function Directive() {
		return {
			restrict: "E",
			templateUrl: "./dist/templates/components/menu-button/menu-button.template.html",
			transclude: true,
			replace: true,
			scope: {
				options: "="
			},
			link: function($scope, theElement, attrs){
				var $overlay = $(".lst-menu-button__overlay");
				var $body = $('body');

				$scope.openMenu = function(){
					console.log("Opening menu");
					$overlay.css({ display: 'block' });
					$body.css({ overflow: 'hidden' });
				};

				$scope.closeMenu = function(){
					console.log("Closing menu");
					$overlay.css({ display: 'none' });
					$body.css({ overflow: 'initial' });
				};
			}
		};
	}
})();
