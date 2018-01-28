$( document ).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        console.log("Viewing in mobile");
    }

    $(".diagramSection").hover(
        function () {
            var diagramSection = $( this ).attr("id");
            if(diagramSection == "arm1" || diagramSection == "arm2"){
                diagramSection = "arm";
            }
            var imgName = "./img/diagram/" + diagramSection + ".png";
            $("#locationReadout").html("Selected: " + diagramSection);
            $("#bodyDiagram").attr("src", imgName);
        },
        function () {
            var imgName = "./img/diagram/default.png";
            $("#locationReadout").html("&nbsp");
            $("#bodyDiagram").attr("src", imgName);
        });

    /*
     * Prints coordinates on image where clicked, only used for testing
     */

    $(".diagramSection").click(function (e) {
        var parentOffset = $(this).parent().offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $("#coord").html("X: " + relX + " Y: " + relY);
    });
    $("#bodyDiagram").click(function (e) {
        var parentOffset = $(this).parent().offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $("#coord").html("X: " + relX + " Y: " + relY);
    });
});

function toggleFooter(){
    if($(".footer").hasClass("expanded")){
        $("#toggleAidBot").html("Open AidBot");
        $(".footer").removeClass("expanded").css("height", "30px");
    }else{
        $("#toggleAidBot").html("Close AidBot");
        $(".footer").addClass("expanded").css("height", "90%");
    }

}
