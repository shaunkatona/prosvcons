(function() {
    angular.module('ProsVCons.controllers').controller('ViewCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $scope.showWeights = false;
        $scope.pros = [];
        $scope.cons = [];
        $scope.title = "";
        $scope._id = $routeParams.listid;
        $scope.isPrivate = false;

        $http.get('/api/list/' + $scope._id).then(function (res) {
            $scope.title = res.data.title;
            $scope.pros = res.data.pros;
            $scope.cons = res.data.cons;
            $scope.isPrivate = res.data.isPrivate;
        });

        $scope.getProsWeightCount = function () {
            var sum = 0;

            for (var i = 0; i < $scope.pros.length; i++) {
                sum += $scope.pros[i].weight;
            }

            return sum;
        };

        $scope.getConsWeightCount = function () {
            var sum = 0;

            for (var i = 0; i < $scope.cons.length; i++) {
                sum += $scope.cons[i].weight;
            }

            return sum;
        };
    }]);
})();