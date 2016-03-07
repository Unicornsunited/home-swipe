(() => {
	angular.module('houses.dating')
	.controller('datingCtrl', datingCtrl);
	
	function datingCtrl($scope, data) {
		let cards = data.data.listing;
		$scope.cards = cards.splice(0, 5);
		
		$scope.sort = (target) => {
			
		};
	}
})();