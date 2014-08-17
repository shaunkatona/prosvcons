(function () {
    var controllersApp = angular.module('ProsVCons.controllers', []);
    var app = angular.module('ProsVCons', ['ngRoute', 'ProsVCons.controllers']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { templateUrl: '/partials/index', controller: 'MainCtrl', activeTab:'index' })
            .when('/about', { templateUrl: 'partials/about', activeTab: 'about' })
            .when('/view/:listid', { templateUrl: '/partials/view', controller: 'ViewCtrl' })
            .when('/edit/:listid', { templateUrl: '/partials/edit', controller: 'EditCtrl' })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }]);

    angular.module('ProsVCons.controllers').controller('AppCtrl', ['$scope', '$http', '$route', '$location', 'Data', function ($scope, $http, $route, $location, Data) {
        $scope.$route = $route;
        $scope.data = Data;
        $scope.showLoginForm = true;

        Data.getLists().success(function (res) {
            $scope.data.lists = res;
        });

        $scope.go = function (path) {
            $location.path(path);
        };

        $scope.logout = function () {
            window.location = "/logout";
        }
    }]);
})();