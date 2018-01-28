

function getNextResponse(text){
        $(".chatWindow").append(
            '<div class=\"message to\">' + text + "</div>"
        );
        console.log("calling");
        $.get("http://54.69.108.102:9000/getDialog?dialogText=" + text,
            function(data,status){
                console.log("Data: " + data + "\nStatus: " + status);
                console.log(data);
                $(".chatWindow").append(
                    '<div class=\"message from\">' + data.fulfillmentText + "</div>"
                )
                // return data;
            });
    }
function getFirstResponse(){
    console.log("calling");
    $.get("http://54.69.108.102:9000/getDialog?dialogText=Hello",
        function(data,status){
            console.log("Data: " + data + "\nStatus: " + status);
            console.log(data);
            $(".chatWindow").append(
                '<div class=\"message from\">' + data.fulfillmentText + "</div>"
            )
            // return data;
        });
}

function getNextResponseAndText(){
    console.log("submitting");
    let text = $("#textEntry").val();
    $("#textEntry").val('')
    console.log(text);
    if(text.length > 0){
        getNextResponse(text);
    }

}
