(function () {
    angular.module("ProsVCons").directive('confirmDeleteListModal', function () {
        return {
            restrict: "E",
            templateUrl: "/partials/confirmDeleteList",
            scope: {
                listid: "@"
            }
        }
    })
})();