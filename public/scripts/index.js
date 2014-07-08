/**
 * Created by Shaun on 7/7/2014.
 */

$(function() {
    $("#pro").focus();

    $("#add").on("click", function (e) {
        var $proOrCon = $(this);
        var sVal = $.trim($proOrCon.val());

        if (sVal != "") {
            $proOrCon.parents(".row").append(
                $("<div>").addClass("col-md-3").append(
                    sVal,
                    $("<a>").attr("href", "javascript: void(0);").addClass("delete").append(
                        $("<span>").addClass("glyphicon glyphicon-trash")
                    )
                ),
                $("<div>").addClass("col-md-1").append(

                )
            );

            $proOrCon.val("");
        }
    });

    $(".prosAndCons").on("click", "a.delete", function (e) {
        var $lineItem = $(this).closest("li");
        $lineItem.remove();
    });
})