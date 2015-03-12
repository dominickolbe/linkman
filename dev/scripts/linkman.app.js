angular.module('linkmanApp', ['ngAnimate', 'ui.router', 'firebase'])

.constant('FBURL', "https://linkman.firebaseio.com/links")

.factory('fbService', function($firebase, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebase(ref);
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/links');

    $stateProvider

    .state('links', {
        url: '/links',
        templateUrl: 'views/view-linkcontainer.html',
        controller: 'ListController'
    })

    .state('links.new', {
        url: '/new',
        templateUrl: 'views/view-addlink.html',
        controller: 'ListController'
    })


    .state('new', {
        url: '/links/new',
        templateUrl: 'views/view-addlink.html'
    });

    $locationProvider
        .html5Mode(true);
})



.controller('mainController', function($scope, fbService) {

    $scope.reset = function() {
        fbService.$remove();
    };

})

.controller('ListController', function($scope, fbService) {

    console.log('ListController');

    var syncObject = fbService.$asObject();

    syncObject.$bindTo($scope, 'links');

    console.log($scope);


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
