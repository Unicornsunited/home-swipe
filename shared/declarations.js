"use strict";

angular.module('lists', []);
angular.module('dragEventsService', []);
angular.module('houses.data', []);
angular.module('houses.button', []);
angular.module('houses.dating', [
	'lists',
	'dragEventsService'
]);
angular.module('house-dating', [
    'ui.router',
    'houses.data',
    'houses.dating'
]);