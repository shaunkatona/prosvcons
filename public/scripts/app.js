/**
 * Created by shaunkatona on 7/10/14.
 */
(function () {
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