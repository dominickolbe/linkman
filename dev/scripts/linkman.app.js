angular.module('linkmanApp', ['ngAnimate', 'firebase'])

.constant('FBURL', "https://linkman.firebaseio.com/links")

.factory('fbService', function($firebase, FBURL) {
    var ref = new Firebase(FBURL);
    return $firebase(ref);
})

.controller('mainController', function($scope, fbService) {

    $scope.fb = fbService;


    var syncObject = fbService.$asObject();

    syncObject.$bindTo($scope, 'links');


    $scope.reset = function() {

        fbService.$remove();


    };

})

.controller('AddLinkCtrl', function($scope, fbService) {

    $scope.fb = fbService;

    $scope.add = function() {

        fbService.$push({

            title: $scope.title,
            src: $scope.url

        });

    };


});
