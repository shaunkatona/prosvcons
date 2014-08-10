(function() {
    angular.module('ProsVCons.controllers').controller('ViewCtrl', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $scope.showWeights = false;
        $scope.pros = [];
        $scope.cons = [];
        $scope.title = "";

        $http.get('/api/list/' + $routeParams.listid).then(function (res) {
            $scope.title = res.data[0].title;
            $scope.pros = res.data[0].pros;
            $scope.cons = res.data[0].cons;
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