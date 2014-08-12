(function () {
    var controllersApp = angular.module('ProsVCons.controllers', []);
    var app = angular.module('ProsVCons', ['ngRoute', 'ProsVCons.controllers']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { templateUrl: '/partials/index', controller: 'MainCtrl' })
            .when('/about', { templateUrl: 'partials/about' })
            .when('/view/:listid', { templateUrl: '/partials/view', controller: 'ViewCtrl' })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }]);

    angular.module('ProsVCons.controllers').controller('AppCtrl', ['$scope', '$http', 'Data', function ($scope, $http, Data) {
        $scope.data = Data;

        Data.getLists().success(function (res) {
            $scope.data.lists = res;
        });
    }]);
})();