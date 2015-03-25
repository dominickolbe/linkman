angular.module('linkmanApp', ['ngAnimate', 'ui.router', 'firebase', 'cfp.hotkeys'])

.constant('FBURL', "https://linkman.firebaseio.com/links")

.factory('fbService', function($firebaseArray, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebaseArray(ref);
})

.service('hotkey', function(hotkeys, $state) {
    this.run = function($scope) {
        hotkeys.bindTo($scope)
            .add({
                combo: 'esc',
                callback: function(event) {
                    $state.go('links');
                }
            })
            .add({
                combo: 'ctrl+n',
                callback: function(event) {
                    $state.go('links.add');
                }
            })
            .add({
                combo: 'n',
                callback: function(event) {
                    $state.go('links.add');
                }
            })
    }
})

.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
        .state('links', {
            url: '/link',
            templateUrl: 'views/link-list.html',
            controller: 'ListController'
        })
        .state('links.add', {
            url: '/add',
            templateUrl: 'views/link-add.html',
            controller: 'AddLinkController'
        })
        .state('links.edit', {
            url: '/:id',
            templateUrl: 'views/link-edit.html',
            controller: 'EditController'
        });

    $urlRouterProvider.otherwise('/link');

    $locationProvider
        .html5Mode(true);
})


.controller('AppController', function($scope, fbService, $state, hotkey) {

    $scope.showpreloader = true;
    $scope.showmask = false;

    $scope.openAddLink = function() {
        $state.go('links.add');
    }

    $scope.openEditLink = function() {
        $state.go('links.edit');
    }

    $scope.reset = function() {
        fbService.$remove();
    };

    hotkey.run($scope);

})

.controller('ListController', function($scope, fbService) {

    $scope.links = fbService;

    $scope.links.$loaded().then(function() {

        $scope.$parent.showpreloader = false;

    });





})

.controller('AddLinkController', function($scope, fbService, $state) {


    $scope.submit = function() {

        $scope.$parent.$parent.showpreloader = true;

        fbService.$add({

            title: $scope.title,
            url: $scope.url,
            tags: $scope.tags,
            fav: false

        }).then(function(ref) {
            $scope.$parent.$parent.showpreloader = false;
            $state.go('links');
        });

    };

    $scope.cancel = function() {

        $state.go('links');
    }

})

.controller('EditController', function($scope, fbService, $state, $stateParams) {

    $scope.master = $scope.links.$getRecord($stateParams.id);
    $scope.link = angular.copy($scope.master);


    $scope.links.$watch(function(event) {
        $scope.master = $scope.links.$getRecord($stateParams.id);
        $scope.link = angular.copy($scope.master);

        if ($scope.master == null) {
            $state.go('links');
        }

    });

    $scope.save = function() {

        $scope.$parent.$parent.showpreloader = true;

        angular.copy($scope.link, $scope.master)

        fbService.$save($scope.master).then(function() {
            $scope.$parent.$parent.showpreloader = false;
            $state.go('links');
        });

    }

    $scope.cancel = function() {
        $state.go('links');
    }

});
