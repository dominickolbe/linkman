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
                combo: 'n',
                callback: function(event) {
                    $state.go('links.add');
                }
            }).add({
                combo: 'v',
                callback: function(event) {
                    $state.go('links.add');
                }
            })
    }
})

.filter('reverse', function(){
    return function(obj){
        return obj.slice().reverse();
    };
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

.controller('AppController', function($scope, fbService, $state, hotkey, $rootScope) {

    $scope.showpreloader = true;
    $scope.showmask = false;

    $scope.state = $state;


    $scope.openAddLink = function() {
        $state.go('links.add');
    }

    $scope.openEditLink = function() {
        $state.go('links.edit');
    }

    $scope.$on('showpreloader', function(event, show) {
        $scope.showpreloader = show;
    });


    $rootScope.$on('$stateChangeStart',
        function(event, toState, toParams, fromState, fromParams) {

            if (toState.name == 'links') {
                $scope.showmask = false;
            } else if (toState.name == 'links.add') {
                $scope.showmask = true;
            } else if (toState.name == 'links.edit') {
                $scope.showmask = true;
            }

        });

    hotkey.run($scope);

})

.controller('ListController', function($scope, fbService) {

    $scope.links = fbService;

    $scope.links.$loaded().then(function() {
        $scope.$emit('showpreloader', false);
    });

})

.controller('AddLinkController', function($scope, fbService, $state) {

    $scope.submit = function() {

        if ($scope.addForm.$invalid) {
            return;
        }

        $scope.$emit('showpreloader', true);

        fbService.$add({

            title: $scope.title,
            url: $scope.url,
            tags: $scope.tags,
            fav: false

        }).then(function(ref) {
            $scope.$emit('showpreloader', false);
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


    $scope.save = function() {

        if ($scope.editForm.$invalid) {
            return;
        }

        $scope.$emit('showpreloader', true);

        angular.copy($scope.link, $scope.master)

        fbService.$save($scope.master).then(function() {
            $scope.$emit('showpreloader', false);
            $state.go('links');
        });

    }

    $scope.cancel = function() {
        $state.go('links');
    }

});
