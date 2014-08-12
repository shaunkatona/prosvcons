(function () {
    angular.module('ProsVCons').factory("Data", ['$http', function ($http) {
        return {
            lists: [],
            getLists: function () {
                return $http.get('/api/lists');
            },
            addList: function (list) {
                return $http.post("/api/save", list);
            }
        };
    }]);
})();
