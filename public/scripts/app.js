(function () {
    var controllersApp = angular.module('ProsVCons.controllers', []);
    var app = angular.module('ProsVCons', ['ngRoute', 'ProsVCons.controllers']);

    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', { templateUrl: '/partials/index', controller: 'MainCtrl' })
            .when('/view/:listid', { templateUrl: '/partials/view', controller: 'ViewCtrl' })
            .otherwise({ redirectTo: '/' });

        $locationProvider.html5Mode(true);
    }]);
})();