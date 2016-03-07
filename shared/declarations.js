"use strict";

angular.module('houses.data', []);
angular.module('houses.button', []);
angular.module('houses.dating', []);
angular.module('house-dating', [
    'ui.router',
    'houses.data',
    'houses.dating'
]);