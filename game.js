
    var randomNumber;
    var buttonColours = ["red", "blue", "green", "yellow"];
    var randomChosenColour;
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var started = false;
    
    function nextSequence() {
        userClickedPattern = [];
    
        level++;
        $("#level-title").text("Level " + level);
      
        var randomNumber = Math.floor(Math.random() * 4);
        var randomChosenColour = buttonColours[randomNumber];
        gamePattern.push(randomChosenColour);

        for (var i = 0; i < gamePattern.length; i++){
            setTimeout(function(index) {
                $("#" + gamePattern[index]).fadeIn(100).fadeOut(100).fadeIn(100);
                playSound(gamePattern[index]);
            }, 500 * i, i);
        }
    }
    
    function rngReturn() {
        var rng = Math.floor((Math.random() * 4));
        return rng;
    }
    
    
    $(".btn").click(function(){
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);
        console.log(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.length-1);
    });
    
    function playSound(name) {
        var audio = new Audio("./sounds/" + name + ".mp3");
        audio.play();
    }
    
    function animatePress(currentColour) {
        $("#" + currentColour).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColour).removeClass("pressed");
          }, 100);
    }
    
    $(document).keydown(function(){
        if (!started) {
            $("h1").text("level " + level);
            nextSequence();
            started = true;
          }
    });
    
    function checkAnswer(currentLevel) {
        if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
            console.log("success");
            if (userClickedPattern.length === gamePattern.length){
                setTimeout(function(){
                    nextSequence();
                }, 1000);
            }
        }
        else {
            console.log("wrong");
            $("body").addClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
            setTimeout(function(){
                $("body").removeClass("game-over");
            }, 200);
            startOver();
        }
    } 

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }
    

