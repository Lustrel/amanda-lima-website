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
	}
})();

