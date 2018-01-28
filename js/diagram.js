$( document ).ready(function() {

    //Do action when
    $(".diagramSection").hover(
        function () {
            var diagramSection = $( this ).attr("id");
            if(diagramSection == "arm1" || diagramSection == "arm2"){
                diagramSection = "arm";
            }
            var imgName = "./img/diagram/" + diagramSection + ".jpg";
            $("#isHovered").html(diagramSection);
            $("#bodyDiagram").attr("src", imgName);
        },
        function () {
            var imgName = "./img/diagram/default.jpg";
            $("#isHovered").html("");
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
