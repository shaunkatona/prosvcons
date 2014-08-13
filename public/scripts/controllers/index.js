(function() {
    angular.module('ProsVCons.controllers').controller('MainCtrl', ['$scope', '$http', '$location', 'Data', function ($scope, $http, $location, Data) {
        $scope.showWeights = false;
        $scope.currentPro = {
            description: "",
            weight: 0
        };
        $scope.currentCon = {
            description: "",
            weight: 0
        };
        $scope.pros = [];
        $scope.cons = [];
        $scope.titleInputVisible = false;
        $scope.DEFAULT_TITLE = "Add a title...";
        $scope.title = "";
        $scope.prevTitle = $scope.title;
        $scope.showTitleErrorMsg = false;
        $scope.showEmptyErrorMsg = false;
        $scope.data = Data;

        $scope.saveList = function () {
            var canSave = true;

            if (isWhitespace($scope.title)) {
                $scope.showTitleErrorMsg = true;

                canSave = false;
            }

            if ($scope.pros.length == 0 && $scope.cons.length == 0) {
                $scope.showEmptyErrorMsg = true;

                canSave = false;
            }

            if (canSave) {
                var list = {
                    title: $scope.title,
                    pros: $scope.pros,
                    cons: $scope.cons
                };

                Data.addList(list).success(function (res) {
                    $scope.data.lists.push(res);

                    $location.path('/view/' + res._id);
                });
            }
        };

        $scope.saveTitle = function () {
            if (isWhitespace($scope.title)) {
                $("#titleInput").addClass("ng-invalid");
            } else {
                $scope.titleInputVisible = false;
                $scope.prevTitle = $scope.title;
            }
        };

        $scope.cancelTitleInput = function () {
            $scope.titleInputVisible = false;
            $scope.title = $scope.prevTitle;
            $("#titleInput").removeClass("ng-invalid");
        };

        $scope.showTitleInput = function () {
            $scope.titleInputVisible = true;

            setTimeout(function () {
                $("#titleInput").select();
            }, 0);
        };

        $scope.incrementProWeight = function () {
            $scope.currentPro.weight++;
        };

        $scope.decrementProWeight = function () {
            $scope.currentPro.weight--;
        };

        $scope.incrementConWeight = function () {
            $scope.currentCon.weight++;
        };

        $scope.decrementConWeight = function () {
            $scope.currentCon.weight--;
        };

        $scope.removePro = function (index) {
            $scope.pros.splice(index, 1);
        };

        $scope.removeCon = function (index) {
            $scope.cons.splice(index, 1);
        };

        $scope.savePro = function () {
            $scope.pros.push($scope.currentPro);

            $scope.currentPro = {
                description: "",
                weight: 0
            };

            $scope.proForm.$setPristine();
        };

        $scope.saveCon = function () {
            $scope.cons.push($scope.currentCon);

            $scope.currentCon = {
                description: "",
                weight: 0
            };

            $scope.conForm.$setPristine();
        };

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

        var isWhitespace = function (text) {
            return $.trim(text).length == 0;
        };
    }]);
})();