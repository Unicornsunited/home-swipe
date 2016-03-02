var templatesPath = "templates/";
angular.module('house-dating', [
    'ui.router'
])
.run(function($rootScope, $state, $document) {
    $rootScope.$state = $state;
    $rootScope.apiUrl = {
        base: "/api",
        user: "/user"
    }

    $document.on('click', function(){
        $rootScope.$broadcast('bodyClick');
    });
})
.config(function($stateProvider, $urlRouterProvider) {
var templatePath = "views/";

$urlRouterProvider.otherwise("/");

$stateProvider.state('home', {
        abstract: true,
        views: {
            top: {
                templateUrl: templatePath + "top.html",
                controller: "topCtrl"
            }
        }
    });
});