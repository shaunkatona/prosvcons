/**
 * Created by shaunkatona on 7/10/14.
 */
(function () {
    var app = angular.module('ProsVCons', []);

    app.controller('AppController', function () {
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
            this.currentPro.splice(index, 1);
        };

        this.savePro = function (pro) {
            this.pros.push(pro);

            this.currentPro = {
                description: "",
                weight: 0
            };
        }

        this.saveCon = function (con) {
            this.cons.push(con);

            this.currentCon = {
                description: "",
                weight: 0
            };
        }
    });
})();