(function() {
    angular.module('ProsVCons.controllers').controller('EditCtrl', ['$scope', '$http', '$routeParams', '$location', 'Data', function ($scope, $http, $routeParams, $location, Data) {
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
        $scope.isPrivate = false;
        $scope.prevTitle = $scope.title;
        $scope.showTitleErrorMsg = false;
        $scope.showEmptyErrorMsg = false;
        $scope.data = Data;

        $http.get('/api/list/' + $routeParams.listid).then(function (res) {
            $scope.title = res.data.title;
            $scope.pros = res.data.pros;
            $scope.cons = res.data.cons;
            $scope._id = res.data._id;
            $scope.isPrivate = res.data.isPrivate;
        });

        $scope.updateList = function () {
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
                    _id: $routeParams.listid,
                    title: $scope.title,
                    pros: $scope.pros,
                    cons: $scope.cons,
                    isPrivate: $scope.isPrivate
                };

                Data.updateList(list).success(function (res) {
                    var index = 0;

                    for (var i = 0; i < $scope.data.lists.length; i++) {
                        if ($scope.data.lists[i]._id == list._id) {
                            index = i;
                            break;
                        }
                    }

                    $scope.data.lists[index] = list;

                    $location.path('/view/' + list._id);
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