/**
 * Created by shaunkatona on 7/10/14.
 */
(function () {
    var isWhitespace = function (text) {
      return $.trim(text).length == 0;
    };

    var app = angular.module('ProsVCons', []);

    app.controller('AppController', function ($scope) {
        this.showWeights = false;
        this.currentPro = {
            description: "",
            weight: 0
        };
        this.currentCon = {
            description: "",
            weight: 0
        };
        this.pros = [];
        this.cons = [];
        this.titleInputVisible = false;
        this.DEFAULT_TITLE = "Add a title...";
        this.title = this.DEFAULT_TITLE;
        this.prevTitle = this.title;

        this.saveTitle = function () {
            if (isWhitespace(this.title)) {
                $("#titleInput").addClass("ng-invalid");
            } else {
                this.titleInputVisible = false;
                this.prevTitle = this.title;
            }
        }

        this.cancelTitleInput = function () {
            this.titleInputVisible = false;
            this.title = this.prevTitle;
            $("#titleInput").removeClass("ng-invalid");
        }

        this.showTitleInput = function () {
            this.titleInputVisible = true;

            setTimeout(function () {
                $("#titleInput").select();
            }, 0);
        }

        this.incrementProWeight = function () {
            this.currentPro.weight++;
        };

        this.decrementProWeight = function () {
            this.currentPro.weight--;
        };

        this.incrementConWeight = function () {
            this.currentCon.weight++;
        };

        this.decrementConWeight = function () {
            this.currentCon.weight--;
        };

        this.removePro = function (index) {
            this.pros.splice(index, 1);
        };

        this.removeCon = function (index) {
            this.cons.splice(index, 1);
        };

        this.savePro = function () {
            this.pros.push(this.currentPro);

            this.currentPro = {
                description: "",
                weight: 0
            };

            $scope.proForm.$setPristine();
        }

        this.saveCon = function () {
            this.cons.push(this.currentCon);

            this.currentCon = {
                description: "",
                weight: 0
            };

            $scope.conForm.$setPristine();
        }
    });
})();