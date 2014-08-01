/**
 * Created by shaunkatona on 7/10/14.
 */
(function () {
    var isWhitespace = function (text) {
      return $.trim(text).length == 0;
    };

    var app = angular.module('ProsVCons', []);

    app.controller('AppController', ['$scope', '$http', function ($scope, $http) {
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
        $scope.title = $scope.DEFAULT_TITLE;
        $scope.prevTitle = $scope.title;

        $scope.saveList = function () {
            if (isWhitespace($scope.title)) {
                $scope.showTitleErrorMsg = true;
            }

            $http.post("/save", {
                title: $scope.title,
                pros: $scope.pros,
                cons: $scope.cons
            });
        };

        $scope.deleteList = function () {
            $http.delete("/delete", {
                title: $scope.title
            });
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
        }

        $scope.saveCon = function () {
            $scope.cons.push($scope.currentCon);

            $scope.currentCon = {
                description: "",
                weight: 0
            };

            $scope.conForm.$setPristine();
        }
    }]);
})();