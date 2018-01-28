$( document ).ready(function() {

    $(".diagramSection").hover(
        function () {
            var diagramSection = $( this ).attr("id");
            if(diagramSection == "arm1" || diagramSection == "arm2"){
                diagramSection = "arm";
            }
            var imgName = "./img/diagram/" + diagramSection + ".jpg";
            console.log(diagramSection);
            console.log(imgName);
            $("#isHovered").html(diagramSection);
            $("#bodyDiagram").attr("src", imgName);
        },
        function () {
            var imgName = "./img/diagram/default.jpg";
            $("#isHovered").html("");
            $("#bodyDiagram").attr("src", imgName);
        });

    
    $("#bodyDiagram").click(function (e) {
        var parentOffset = $(this).parent().offset();
        //or $(this).offset(); if you really just want the current element's offset
        var relX = e.pageX - parentOffset.left;
        var relY = e.pageY - parentOffset.top;
        $("#coord").html("X: " + relX + " Y: " + relY);
    });
});
