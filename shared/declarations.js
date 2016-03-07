"use strict";

angular.module('lists', []);
angular.module('houses.data', []);
angular.module('houses.button', []);
angular.module('houses.dating', [
	'lists'
]);
angular.module('house-dating', [
    'ui.router',
    'houses.data',
    'houses.dating'
]);