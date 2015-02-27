angular.module('linkmanApp', ['firebase'])

.controller('mainController', function($scope, $firebase) {


        var ref = new Firebase("https://first-touch.firebaseio.com/links");
        var fb = $firebase(ref);

        var syncObject = fb.$asObject();

        syncObject.$bindTo($scope, 'links');


        $scope.reset = function() {

            fb.$remove();

        };

    })
    .controller('AddLinkCtrl', function($scope, $firebase) {


        var ref = new Firebase("https://first-touch.firebaseio.com/links");
        var fb = $firebase(ref);


        var thistitle = $scope.title;
        //var src   = $scope.src;


        $scope.add = function() {

            fb.$push({

                title: thistitle,
                src: 'abc'

            });

        };


    })


