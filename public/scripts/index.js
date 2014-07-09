/**
 * Created by Shaun on 7/7/2014.
 */

$(function() {
    // start the cursor out on the pro textbox
    $("#pro").focus();

    // adding a pro or a con
    $("#pro, #con").on("keypress", function (e) {
        if (e.which == 13) {
            var $proOrCon = $(this);
            var sVal = $.trim($proOrCon.val());

            // don't let the user add a blank pro/con
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
        }
    });

    // deleting a pro or a con
    $(".prosAndCons").on("click", "a.delete", function (e) {
        var $lineItem = $(this).closest("li");
        $lineItem.remove();
    });
})