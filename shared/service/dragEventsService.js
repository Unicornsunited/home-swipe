(() => {
	angular.module('dragEventsService')
		.directive('dragMe', dragMe);

		function dragMe() {
			return {
				restrict: "A",
				scope: {
					dragMe: "="
				},
				link: dragMeLink
			}
		}

		function dragMeLink($scope, $elem) {
			const _dragMeDefaults = {
				dragX: true,
				dragY: false
			};

			$scope._translate = {
				x: 0,
				y: 0
			};

			for (var i = 0; i < _dragMeDefaults.length; i++) {
				if (!$scope.dragMe[i]) {
					$scope.dragMe[i] = _dragMeDefaults[i];
				}
			}

  			$elem.bind('mousedown', function(t){
  				$elem.bind('mousemove', function(mousePosition){
  					if($scope.dragMe.dragX) {
  						$scope._translate.x = $scope._translate.x + mousePosition.movementX;
  					}
  					if($scope.dragMe.dragY) {
	  					$scope._translate.y = $scope._translate.y + mousePosition.movementY;
	  				}

	  				$elem.css({
	  					transform: `translate3D(${$scope._translate.x}, ${$scope._translate.y})`
	  				});
  				});
  			});
		}
})();