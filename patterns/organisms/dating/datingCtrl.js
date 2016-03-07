(() => {
	angular.module('houses.dating')
	.controller('datingCtrl', datingCtrl);
	
	function datingCtrl($scope, data, listService) {
		let cards = data.data.listing;
		$scope.cards = cards.splice(0, 5);
		cards.splice(0, 5);
		
		$scope.moveCardToList = (id, targetListName) => {
			listService.addToList(id, targetListName);
			listService.removeFromList(0, $scope.cards);
			$scope.cards.push(cards[0]);
			cards.splice(0, 1);
		};
	}
})();