/**
 * Created by junxie on 12/4/14.
 */

var username = "";

function send_message(message){
    var prevState=$('#container').html();

    if(prevState.length>6)
    {
        prevState = prevState +"<br>";//第一次显示输入没有空行
    }

    $('#container').html(prevState + "<span class='current_message'>" +"<span class='bot'>Chatbot: </span>"+ message + "</span>");
    $(".current_message").hide();
    $(".current_message").delay(500).fadeIn(); //delay 500ms to output bot message, combine hide(), show like real response
    $('.current_message').removeClass('current_message');
    /*

     */
}

function get_username(){
    send_message("what is your name?");
}

function ai(message){   //bot message response, add anything you want, as bot dictionary
    if(username.length<3){
        username = message;
        send_message("nice to meet you "+username+", "+ "how are you doing!");
    }
    if(message.indexOf("how are you")>=0)  //use to judge if user input contains this phrase
    {
        send_message("Thanks and you?");
    }
    if(message.indexOf("time")>=0 || (message.indexOf("hours")>=0))  //enable different words express same meaning
    {
        var date=new Date();
        var h=date.getHours();
        var m=date.getMinutes();
        var d=date.getDay();
        send_message("Current time is: "+h+":"+m);
    }

    /*------------------------------------------------

    too add more response just add more "if" condition

    --------------------------------------------------*/

}



$(function(){
    get_username();
    $("#textbox").keypress(function(event)
    {
        if(event.which==13) //get 回车
        {
            if($("#enter").prop("checked"))
            {
                $('#send').click();
                event.preventDefault();
            }
        }
    });

    $('#send').click(function()
    {
        var username="<span class='username'>You: </span>";

        var newMessage= $('#textbox').val();

        $('#textbox').val("");

        var prevState=$('#container').html();

        if(prevState.length>6)
        {
            prevState = prevState + "<br>";//第一次显示输入没有空行
        }

        $('#container').html(prevState+ username + newMessage);

        $('#container').scrollTop($('#container').prop("scrollHeight")); //滚动条实时滚动

        ai(newMessage);

    });

});