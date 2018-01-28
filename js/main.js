$( document ).ready(function() {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
        console.log("Viewing in mobile");
    }

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

    $(".diagramSection").hover(
        function () {
            var diagramSection = $( this ).attr("id");
            if(diagramSection == "arm1" || diagramSection == "arm2"){
                diagramSection = "arm";
            }
            var imgName = "./img/diagram/" + diagramSection + ".png";
            $("#locationReadout").html("Selected: " + diagramSection);
            $("#bodyDiagram").attr("src", imgName);
            getNextResponse(diagramSection);

            setTimeout(function(){
                toggleFooter();
                document.getElementById("textEntry").focus();
                }, 800);

        },
        function () {
            var imgName = "./img/diagram/default.png";
            $("#locationReadout").html("&nbsp");
            $("#bodyDiagram").attr("src", imgName);
        }
    );

});

/* A simple and scalable hamburger menu using css transitions. */
function toggleMenu() {
    if ($('.js-menu').hasClass('active')){
        $('.js-menu').removeClass('active');
        $('body').removeClass('menu-open');
    } else {
        $('.js-menu').addClass('active');
        $('body').addClass('menu-open');
    }
}

function toggleFooter(){
    if($(".footer").hasClass("expanded")){
        $("#toggleAidBot").html("Open AidBot");
        $(".footer").removeClass("expanded").css("height", "30px");
    }else{
        $("#toggleAidBot").html("Close AidBot");
        $(".footer").addClass("expanded").css("height", "90%");
        $('.js-menu').removeClass('active');
        $('body').removeClass('menu-open');
        isActive = !isActive;
    }

}

function getNextResponse(text){
    $(".chatWindow").append(
        '<div class=\"message to\">' + text + "</div>"
    );
    console.log("calling with message: " + text);
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
            updateScroll();
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
            updateScroll();
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
    updateScroll();
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
            updateScroll();
        });
}

function updateScroll(){
    var element = document.getElementById("chatWindow");
    element.scrollTop = element.scrollHeight;
}
