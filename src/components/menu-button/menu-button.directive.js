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
				//var menu = attrs.menu;
				var $overlay = $(".lst-menu-button__overlay");
				//var $items = $(menu).clone();

				/*
				addContentToOverlay();

				function addContentToOverlay(){
					$overlay.append($items);
				}
				*/

				$scope.openMenu = function(){
					console.log("Opening menu");
					$overlay.css({ display: 'block' });
				};

				$scope.closeMenu = function(){
					console.log("Closing menu");
					$overlay.css({ display: 'none' });
				};
			}
		};
	}
})();