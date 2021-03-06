
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started=false;

var level=0;

$(document).keypress(function(){
    if(!started)
    {  
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
    
});

document.querySelector('body').addEventListener('touchstart',touchStart,false);

function touchStart(e){
    e.preventDefault();
    if(!started){
        $("#level-title").text("level "+level);
        nextSequence();
        started=true;
    }
}


$(".btn").click(function(){

    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);


    checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length==gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else
    {
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("gameover");
        setTimeout(function(){
            $("body").removeClass("gameover");
        },200);

        $("#level-title").text("Game Over, Press Any Key or Touch anyWhere not Button to Restart");

        startOver();
    }
  }
function nextSequence(){

    userClickedPattern=[];

    level++;
    $("#level-title").text("level "+level);

    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(200).fadeIn(100);
    playSound(randomChosenColour);
    
   
}

function playSound(name){

    var mysound=new Audio("sounds/" + name + ".mp3");
    mysound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },300);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
