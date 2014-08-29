(function () {
    angular.module("ProsVCons").directive('loginModal', function () {
        return {
            restrict: "E",
            templateUrl: "/partials/login",
            scope: {
                loginMessage: "@",
                signupMessage: "@"
            },
            link: function (scope, elem, attrs) {
                scope.showLoginForm = true;

                if (attrs.loginMessage.length > 0 || attrs.signupMessage.length > 0) {
                    if (attrs.signupMessage.length > 0) {
                        scope.showLoginForm = false;
                    }

                    $("#loginModal").modal('show');
                }
            }
        }
    })
})();