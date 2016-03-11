(() => {
    angular.module('house-dating')
        .run(run)
        .config(config);

    function run($rootScope, $state, $document) {
        $rootScope.$state = $state;
        $rootScope.apiUrl = {
            base: "/api",
            user: "/user"
        };
        $rootScope.url = {
            icons: "src/icons/"
        };

        $document.on('click', function() {
            $rootScope.$broadcast('bodyClick');
        });
    }

    function config($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/");

        $stateProvider
            .state('base', {
                abstract: true,
                views: {
                    top: {
                        templateUrl: "dist/templates/top.html",
                        // controller: "topCtrl"
                    }
                }
            })
            .state('base.dating', {
                url: "/",
                resolve: {
                    data: property => {
                        return property.getListing();
                    }
                },
                views: {
                    'mainContent@': {
                        templateUrl: "dist/templates/dating.html",
                        controller: "datingCtrl"
                    }
                }
            });
    };
})();
