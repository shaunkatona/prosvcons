angular.module('ProsVCons').filter('public', function() {
    return function(lists) {
        var out = [];

        for (var i = 0; i < lists.length; i++) {
            if(!lists[i].isPrivate){
                out.push(lists[i]);
            }
        }

        return out;
    }
});
