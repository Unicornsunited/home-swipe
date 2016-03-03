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
                        templateUrl: "components/top/top.html",
                        // controller: "topCtrl"
                    }
                }
            })
            .state('base.dating', {
                url: "/",
                resolve: {
                    data: (zoopla) => {
                        return zoopla.getListing();
                    }
                },
                views: {
                    mainContent: {
                        templateUrl: "components/dating/dating.html",
                        controller: "datingCtrl"
                    }
                }
            });
    };
})();
