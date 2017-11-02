"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstInstaThumbs", Directive);

	function Directive() {
		return {
			restrict: "E",
			templateUrl: "./dist/templates/components/insta-thumbs/insta-thumbs.template.html",
			transclude: true,
			replace: true,
			link: function(theScope, theElement){
				// Stanley: 421923937 | 421923937.1677ed0.8b7b578910ea4c08a063c82d882bffb
				// Amanda Lima: 275648156 | 275648156.79e9056.9f4f7c27172d464bb5ea1d9bf927302d
				var feed = new Instafeed({
					get: "user",
					userId: "275648156",
					clientId: "79e905681316484b9fe108bbef5774fb",
					accessToken: "275648156.79e9056.9f4f7c27172d464bb5ea1d9bf927302d",
					target: angular.element(theElement)[0],
					sortBy: "most-recent",
					limit: 6,
					template: '<a target="_blank" href="{{link}}"><img class="lst-thumb" src="{{image}}"/></a>'
				});

				feed.run();
			}
		};
	}
})();
