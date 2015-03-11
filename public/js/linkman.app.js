angular.module('linkmanApp', ['ngAnimate', 'ngRoute', 'firebase'])

.constant('FBURL', "https://linkman.firebaseio.com/links")

.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/links', {

            templateUrl: 'views/view-linkcontainer.html',
            controller: 'ListController'

        })
        .when('/links/new', {
            templateUrl: 'views/view-addlink.html',
            controller: 'AddLinkController'

        })
        .when('/links/edit', {

            controller: 'EditController'

        })
        .otherwise({
            redirectTo: 'links'
        });
    $locationProvider
        .html5Mode(true);
})

.factory('fbService', function($firebase, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebase(ref);
})

.controller('mainController', function($scope, fbService) {

    $scope.reset = function() {
        fbService.$remove();
    };

})

.controller('ListController', function($scope, fbService) {

    var syncObject = fbService.$asObject();

    syncObject.$bindTo($scope, 'links');


})

.controller('AddLinkController', function($scope, fbService) {

    //$scope.fb = fbService;

    $scope.add = function() {

        fbService.$push({

            title: $scope.title,
            src: $scope.url

        });

    };


})

.controller('EditController', function($scope, fbService) {



});


