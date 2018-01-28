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

function getNextResponse(text){
        $(".chatWindow").append(
            '<div class=\"message to\">' + text + "</div>"
        );
        console.log("calling");
        $.get("http://54.69.108.102:9000/getDialog?dialogText=" + text,
            function(data,status){
                console.log("Data: " + data + "\nStatus: " + status);
                console.log(data);
                if(data.fulfillmentText.includes("ACTIVITY")){
                    var activity = data.fulfillmentText.substring(9);
                    getActionFromMongo(activity);
                }
                else{
                    $(".chatWindow").append(
                        '<div class=\"message from\">' + data.fulfillmentText + "</div>"
                    )
                }
                // return data;
            });
    }
function getFirstResponse(){
    console.log("calling");
    $.get("http://54.69.108.102:9000/getDialog?dialogText=Hello",
        function(data,status){
            console.log(data);
            console.log("Data: " + data + "\nStatus: " + status);
            $(".chatWindow").append(
                '<div class=\"message from\">' + data.fulfillmentText + "</div>"
            )
            // return data;
        });
}

function getNextResponseAndText(){
    console.log("submitting");
    let text = $("#textEntry").val();
    console.log(text);
    if(text.length > 0){
        getNextResponse(text);
    }
    $("#textEntry").val('');
    $("#textEntry").focus();

}

getFirstResponse();


function getActionFromMongo(action){
    console.log("calling mongo");
    $.get("http://54.69.108.102:9000/getAction?action=" + action,
        function(data,status){
            console.log("Data: " + data + "\nStatus: " + status);
            console.log(data);
            var textToAdd = '<div class=\"message from\">';
            textToAdd += "According to my data, I believe you have a " + data.actionName + ". Steps to treat this are:<br><br>";
            for(var i=0; i < Object.keys(data.action).length; i++){
                     textToAdd+= (i+1) + ". " + data.action["action"+i] + "<br>"
            }
            textToAdd +="</div>";
            $(".chatWindow").append(textToAdd);
        });
}
