/**
 * Created by shaunkatona on 7/10/14.
 */
(function () {
    var app = angular.module('ProsVCons', []);

    app.controller('ProController', function () {
        this.description = "";
        this.weight = 0;

        this.incrementWeight = function () {
            this.weight++;
        };

        this.decrementWeight = function () {
            this.weight--;
        };

        this.save = function () {
            console.log(this.description);
        }
    });

    app.controller('ConController', function () {
        this.description = "";
        this.weight = 0;

        this.incrementWeight = function () {
            this.weight++;
        };

        this.decrementWeight = function () {
            this.weight--;
        };

        this.save = function () {
            console.log(this.description);
        }
    });
})();