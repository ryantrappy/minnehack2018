$( document ).ready(function() {
    $("#textEntry").keydown(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            let text = $("#textEntry").val();
            console.log(text);
            if(text.length > 0){
                getNextResponse(text);
            }
            $("#textEntry").val('')
            return true;
        }
    });
})

