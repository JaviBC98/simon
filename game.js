
var buttonColours = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = true;
var falladoEnCompletarLaSerie = false;
var randomChosenColour = "";
var position = 0;

// desactivar botones al principio del programa
$("div").css('pointer-events','none');

function nextSequence() {
    // game chooses a color
    var randomNumber = Math.floor(Math.random()*3);
    randomChosenColour = buttonColours[randomNumber];
    // game adds the button to the gamePattern array
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level "+ level);
    // game animates the button press
    $("#"+randomChosenColour).fadeOut("fast").fadeIn("slow");
    console.log(gamePattern);
}

// When the user clicks any button

$(document).ready(function () {
    $("div[type]").click(function () {
        if($("div").hasClass("btn")){
            if(position === 0){
                userClickedPattern = [];
            }
            var userChosenColour = this.id;
            animatePress(this.id);

            if(gamePattern[position] === userChosenColour){
                position++;
                userClickedPattern.push(userChosenColour);
            }
            else{
                falladoEnCompletarLaSerie = true;
            }

            if(gamePattern.length === userClickedPattern.length){
                falladoEnCompletarLaSerie = false;
                position = 0;
            }
            
            if(falladoEnCompletarLaSerie){
                playSound("wrong");
                $("body").addClass("game-over");
                setTimeout(function(){
                    $("body").removeClass("game-over");
                },200);
                $("h1").text("Game over! Push a key to start again!");
                gameStart = true;
                level = 0;
                gamePattern = [];
                userClickedPattern = [];
                position = 0;
                $("div").css('pointer-events','none'); 
            }
            // si has acertado
            if (!falladoEnCompletarLaSerie && (gamePattern.length === userClickedPattern.length)){
                nextSequence();
            }
        }
    });
});

// When the user clicks any key, the h1 changes to which lvl we are currently in

$(document).keypress(function () {
    $("div").css('pointer-events','auto'); 
    if(gameStart){
        $("h1").text("Level "+ level);
        nextSequence();
        gameStart = false;
    }
});

// Animations

function animatePress(currentColour) {
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

// Sounds

$("#green").click(function () {
    playSound(this.id);
});

$("#red").click(function () {
    playSound(this.id);
});

$("#yellow").click(function () {
    playSound(this.id); 
});

$("#blue").click(function () {
    playSound(this.id);
});

// Sound

function playSound(name) {
    switch (name) {
        case "green":
            sound = new Audio("sounds/green.mp3");
            break;
        case "red":
            sound = new Audio("sounds/red.mp3");
            break;
        case "yellow":
            sound = new Audio("sounds/yellow.mp3");
            break;
        case "blue":
            sound = new Audio("sounds/blue.mp3");
            break;
        case "wrong":
            sound = new Audio("sounds/wrong.mp3");
            break;
    }
    sound.play();
}

