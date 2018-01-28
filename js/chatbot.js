

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
    $("#textEntry").val('')
    console.log(text);
    if(text.length > 0){
        getNextResponse(text);
    }

}

getFirstResponse();


function getActionFromMongo(action){
    console.log("calling mongo");
    $.get("http://54.69.108.102:9000/getAction?action=" + action,
        function(data,status){
            console.log("Data: " + data + "\nStatus: " + status);
            console.log(data);
            for(var i=0; i < Object.keys(data.action).length; i++){
                $(".chatWindow").append(
                    '<div class=\"message from\">' + (i+1) + ". " + data.action["action"+i] + "</div>"
                )
            }
        });
}
