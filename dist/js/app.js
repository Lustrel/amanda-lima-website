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
; 
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
; 
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
		var $slide = $("#slide");
		var slideBackgrounds = [
			'dist/images/hero-bg.png',
			'dist/images/teste.jpg',
		];
		var slideIndex = 0;

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
			url: '#amanda-lima',
			label: 'INÍCIO'
		}, {
			url: '#treine-comigo',
			label: 'TREINE COMIGO',
		}, {
			url: '#planos',
			label: 'PLANOS'
		},{
			url: '#duvidas',
			label: 'DÚVIDAS FREQUENTES'
		},{
			url: '#fale-conosco',
			label: 'FALE CONOSCO'
		}];

		function getNextIndex() {
			slideIndex++;
			if(slideIndex === slideBackgrounds.length){
				slideIndex = 0;
			}
			return slideIndex;
		}

		function getPreviousIndex() {
			slideIndex--;
			if(slideIndex === -1){
				slideIndex = slideBackgrounds.length - 1;
			}
			return slideIndex;
		}

		this.nextImage = function(){
			var finalBackgroundProp = 'url(' + slideBackgrounds[getNextIndex()] + ')';
			$slide.css('background-image', finalBackgroundProp);
		}

		this.previousImage = function(){
			var finalBackgroundProp = 'url(' + slideBackgrounds[getPreviousIndex()] + ')';
			$slide.css('background-image', finalBackgroundProp);
		}
	}
})();

; 
angular.module('website', ['ngAnimate', 'ngTouch']) // Erro no Controller e alterando o nome do módulo p/ Website, conflito no módulo
.controller('MainCtrl', function ($scope) {
    $scope.slides = [
        {image: 'images/img00.jpg', description: 'Image 00'},
        {image: 'images/img01.jpg', description: 'Image 01'},
        {image: 'images/img02.jpg', description: 'Image 02'},
        {image: 'images/img03.jpg', description: 'Image 03'},
        {image: 'images/img04.jpg', description: 'Image 04'}
    ];

    $scope.direction = 'left';
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };
})
.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width();
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint;
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
            }
            else {
                done();
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope();

            if (className == 'ng-hide') {
                element.removeClass('ng-hide');

                var startPoint = element.parent().width();
                if(scope.direction === 'right') {
                    startPoint = -startPoint;
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
            }
            else {
                done();
            }
        }
    };
});
; 
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