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
        templateUrl: 'views/link-list.html',
        controller: 'ListController'
    })

    .state('links.add', {
        url: '/add',
        templateUrl: 'views/link-add.html',
        controller: 'AddLinkController'
    })

    .state('links.edit', {
        url: '/edit',
        templateUrl: 'views/link.add.html'
    });

    $locationProvider
        .html5Mode(true);
})



.controller('AppController', function($scope, fbService, $state) {

    $scope.openAddLink = function(){
        $state.go('links.add');
    }

    $scope.reset = function() {
        fbService.$remove();
    };

})

.controller('ListController', function($scope, fbService) {

    var syncObject = fbService.$asObject();

    syncObject.$bindTo($scope, 'links');

})

.controller('AddLinkController', function($scope, fbService, $state) {

    //$scope.fb = fbService;

    $scope.submit = function() {

        fbService.$push({

            title: $scope.title,
            src: $scope.url

        });

        $state.go('links');

    };

    $scope.cancel = function(){
        $state.go('links');
    }


})

.controller('EditController', function($scope, fbService) {



});
