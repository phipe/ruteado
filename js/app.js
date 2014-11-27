Parse.initialize("EumIVLPGA9jrcEhy1mYNxrIDUVTZgi0RImbK7Ffe", "uPXl8jXypT6T9735NVtOacVLUPCs3UTHjldE5Chc");

var Mappzoo = angular.module('Mappzoo', ['ngRoute']);

Mappzoo.config(['$routeProvider',
                function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'partials/inicio.html',
            })
            .when('/mapa', {
                templateUrl: 'partials/mapa.html',
            })
            .when('/mision', {
                templateUrl: 'partials/mision.html',
            })
            .when('/emblemas', {
                templateUrl: 'partials/emblemas.html',
            })
            .otherwise({
                redirectTo: '/'
            });
                }]);