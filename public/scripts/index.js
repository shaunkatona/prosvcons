/**
 * Created by Shaun on 7/7/2014.
 */

$(function() {
    // start the cursor out on the pro textbox
    $("#pro").focus();

    // deleting a pro or a con
    $(".prosAndCons").on("click", "a.delete", function (e) {
        var $lineItem = $(this).closest("li");
        $lineItem.remove();
    });
})