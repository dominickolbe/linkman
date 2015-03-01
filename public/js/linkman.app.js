angular.module('linkmanApp', ['ngAnimate', 'firebase'])

.controller('mainController', function($scope, $firebase) {


        var ref = new Firebase("https://linkman.firebaseio.com/links");
        var fb = $firebase(ref);
        var syncObject = fb.$asObject();

        syncObject.$bindTo($scope, 'links');


        $scope.reset = function() {

            fb.$remove();

            for (var i = 0; i <= 250; i++) {

                fb.$push({

                    title: 'Apple',
                    src: 'http://apple.de',
                    submitTime : ''

                });
            };


        };

    })
    .controller('AddLinkCtrl', function($scope, $firebase) {

        var thistitle = $scope.title;
        //var src   = $scope.src;


        $scope.add = function() {

            fb.$push({

                title: thistitle,
                src: 'abc'

            });

        };


    })


