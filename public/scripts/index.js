/**
 * Created by Shaun on 7/7/2014.
 */

$(function() {
    $("input", $("#pros")).focus();

    $("input", $(".prosAndCons")).on("keypress", function (e) {
        if(e.which == 13) {
            var $textbox = $(this);
            var sVal = $.trim($textbox.val());

            if (sVal != "") {
                $textbox.parents("ol").append(
                    $("<li>").append(
                        $("<span>").append(sVal),
                        $("<a>").attr("href", "javascript: void(0);").addClass("delete").append(
                            $("<span>").addClass("glyphicon glyphicon-trash")
                        )
                    )
                );

                $textbox.val("");
            }
        }
    });

    $(".prosAndCons").on("click", "a.delete", function (e) {
        var $lineItem = $(this).closest("li");
        $lineItem.remove();
    });
})