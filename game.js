
var buttonColours = ["green","red","yellow","blue"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = true;
var trys = 4;

// desactivar botones al principio del programa
$("div").css('pointer-events','none');

function nextSequence() {
    var randomNumber = Math.floor(Math.random()*3);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    level++;
    $("h1").text("Level "+ level);
    animatePress(randomChosenColour);
    console.log(gamePattern);
}

// When the user clicks any button

$(document).ready(function () {
    $("div[type]").click(function () {
        if($("div").hasClass("btn")){
            var userChosenColour = this.id;
            animatePress(this.id);
            var tempUserClickedPattern = userClickedPattern;
            tempUserClickedPattern.push(userChosenColour);

            console.log("game pattern -> " + gamePattern);
            console.log("user pattern -> " + tempUserClickedPattern);
            
            var hasFallado = true;

            if(trys > 0){
                for (let i = 0; i < gamePattern.length; i++) {
                    if (gamePattern[i] === tempUserClickedPattern[i]){
                        hasFallado = false;
                    }
                    else{
                        hasFallado = true;
                        break;
                    }
                }

                console.log("Hemos fallado -> " + hasFallado);

                if(hasFallado){
                    trys--;
                }
                else{
                    userClickedPattern.push();
                    nextSequence();
                }
            }
            else{
                $("h1").text("Game over! Push a key to start again!");
                trys = 4;
                level = 0;
                gamePattern = [];
                userClickedPattern = [];
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
    },200);
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
    }
    sound.play();
}

