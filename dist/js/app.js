"use strict";

angular
	.module("Website", ["ngRoute", "angularModalService"])
	.config(function($routeProvider, $httpProvider){
		var templatesPath = "./dist/templates/pages";

		// Routes configuration
		$routeProvider
			.when("/", { templateUrl: (templatesPath + "/home/home.template.html") });
	});; 
"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstScroll", Directive);

	function Directive() {
		return {
			restrict: "A",
			scope: {
				scrollTo: "@"
			},
			link: function($scope, theElement){
				console.log('linking scroll directive');
				$(theElement).click(function(){
					$('html, body').animate({ scrollTop: $($scope.scrollTo).offset().top });
				})
			}
		};
	}
})();; 
"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstAccordionItem", Directive);

	function Directive() {
		return {
			restrict: "E",
			templateUrl: "./dist/templates/components/accordion-item/accordion-item.template.html",
			transclude: true,
			replace: true,
			scope: {
				title: "@"
			},
			link: function(theScope, theElement, theAttributes){
				var $element = $(theElement);
				var $question = $element.find(".lst-title");
				var $content = $element.find(".lst-content");

				$content.css("display", "none");

				$question.click(function(){
					$content.slideToggle();
				});
			}
		};
	}
})();; 
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
				// Pedro Cellis: 291374423 | 291374423.79e9056.3fb796d95fcb491f926058d56a4fb116
				var feed = new Instafeed({
					get: "user",
					userId: "291374423",
					clientId: "79e905681316484b9fe108bbef5774fb",
					accessToken: "291374423.79e9056.3fb796d95fcb491f926058d56a4fb116",
					target: angular.element(theElement)[0],
					sortBy: "most-recent",
					limit: 6,
					template: '<a target="_blank" href="{{link}}"><img class="lst-thumb" src="{{image}}"/></a>'
				});

				feed.run();
			}
		};
	}
})();; 
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
})();; 
"use strict";

(function() {
	angular
		.module("Website")
		.directive("lstPriceBox", Directive);

	function Directive() {
		return {
			restrict: "E",
			templateUrl: "./dist/templates/components/price-box/price-box.template.html",
			transclude: true,
			replace: true,
			scope: {
				title: "@",
				price: "@",
				description: "@",
				featured: "@",
				code: "@"
			},
		};
	}
})();; 
"use strict";

(function(){
	angular
		.module("Website")
		.controller("InstaThumbsController", ["$scope", "$http", Controller]);

	function Controller($scope, $http){}
})();
; 
'use strict';

(function(){
	angular
		.module('Website')
		.controller('ContactModalController', ['$scope', '$http', Controller]);

	function Controller($scope, $http){
		$scope.areFieldsFilled = function(){
			return (
				!!$scope.name &&
				!!$scope.email &&
				!!$scope.message
			);
		};
		
		$scope.sendEmail = function(){
			console.log('Sending email');
			if(!$scope.areFieldsFilled()) return false;
			$scope.mailSent = true;
			/*
			$http
				.post('/php/contato.php', {name: $scope.name, email: $scope.email, message: $scope.message})
				.then(function(res){
					$scope.mailSent = true;
				});
			*/
		};
	}
})();; 
'use strict';

(function(){
	angular
		.module('Website')
		.controller('HeaderController', ['$scope', 'ModalService', Controller]);

	function Controller($scope, ModalService){
		$scope.showContactModal = function(){
			ModalService
				.showModal({ 
					templateUrl: 'dist/templates/pages/home/contact/contact.modal.template.html',
					controller:  'ContactModalController' 
				})
				.then(function(modal){
					console.log(modal);
					modal.element.modal();
				});
		};

		$scope.options = [{
			url: '#pedro-cellis',
			label: 'Pedro Cellis'
		}, {
			url: '#treine-comigo',
			label: 'Treine Comigo',
		}, {
			url: '#planos',
			label: 'Planos'
		}, {
			label: 'Contato',
			callback: $scope.showContactModal
		}];
	}
})();; 
'use strict';

(function(){
	angular
		.module('Website')
		.controller('SocialController', ['$scope', '$http', Controller]);

	function Controller($scope, $http){
		$scope.sendNewsletter = function(){
			$http
				.post('/php/newsletter.php', { email: $scope.email })
				.then(function(res){
					$scope.alreadySent = true;
				});
		};
	}
})();