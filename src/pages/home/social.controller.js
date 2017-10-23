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