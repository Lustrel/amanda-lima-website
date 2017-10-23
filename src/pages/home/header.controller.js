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
})();