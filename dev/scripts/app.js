angular.module('linkmanApp', ['ngAnimate', 'ui.router', 'firebase'])

.constant('FBURL', "https://linkman.firebaseio.com/links")

.factory('fbService', function($firebaseArray, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebaseArray(ref);
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
        templateUrl: 'views/link-edit.html',
        controller: 'EditController'
    });

    $locationProvider
        .html5Mode(true);
})


.controller('AppController', function($scope, fbService, $state) {

    $scope.openAddLink = function() {
        $state.go('links.add');
    }

    $scope.openEditLink = function() {
        $state.go('links.edit');
    }

    $scope.reset = function() {
        fbService.$remove();
    };

})

.controller('ListController', function($scope, fbService) {

    $scope.links = fbService;

})

.controller('AddLinkController', function($scope, fbService, $state) {

    //$scope.fb = fbService;



    $scope.submit = function() {

        fbService.$add({

            title: $scope.title,
            url: $scope.url

        });

        $state.go('links');

    };

    $scope.cancel = function() {
        $state.go('links');
    }


})

.controller('EditController', function($scope, fbService, $state) {

    var links = fbService;

    $scope.links = links;

    $scope.link = links[1];

    console.log(links[0]);

    $scope.cancel = function() {
        $state.go('links');
    }


});
