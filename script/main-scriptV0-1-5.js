console.log('v0.1.5');

//This is a quick setting for new games. It is not needed, but, welcomed. 
localStorage.setItem("facing", "right")


//sets copyright date
function copyRight() {
    var d = new Date();
    var year = d.getFullYear() + " "
    document.getElementById('copyRight-span').innerText = year;
}

//onload function---------------------------
function docReady() { window.addEventListener('keydown', moveSelection); score(); };

//keyboard controls-------------------------
function moveSelection(evt) {
    switch (evt.keyCode) {
        case 37:
            leftArrowPressed();
            break;
        case 39:
            rightArrowPressed();
            break;
        case 32:
            bulletSpawn();
            break;
    };
};


//touch controls---------------------------
$(function () {
    $("#bg").bind("tap", bulletTapHandler);

    function bulletTapHandler(event) {
        bulletSpawn();
    };

    $("#right").bind("tap", rightTouchHandler);
    function rightTouchHandler(event) {
        rightArrowPressed()
    }

    $("#left").bind("tap", leftTouchHandler);

    function leftTouchHandler(event) {
        leftArrowPressed();
    };
    $(".startButton").bind("tap", startGameHandler);

    function startGameHandler(event) {
        currentScore = 0
        $(".bg").css({ "display": "block" })
        $(this).css("visibility", "hidden")
        $('.title').css("visibility", "hidden")
        zombieSpawning();
    };
});


//movement functions--------------------------------
function leftArrowPressed() {
    var p = $("#player");
    var poff = p.offset();
    var pleft = poff.left;
    if (pleft > 103) {
        var element = document.getElementById("player");
        element.style.left = parseInt(element.style.left) - 5 + 'px';
        var bg = document.getElementById("bg");
        bg.style.left = parseInt(bg.style.left) + 5 + 'px';
        localStorage.setItem("facing", "left")
    } else { return false }
}

function rightArrowPressed() {
    var p = $("#player");
    var poff = p.offset();
    var pleft = poff.left;
    if (pleft < 962) {
        var element = document.getElementById("player");
        element.style.left = parseInt(element.style.left) + 5 + 'px';
        var bg = document.getElementById("bg");
        var zombz = document.getElementById("zombie");
        bg.style.left = parseInt(bg.style.left) - 5 + 'px';
        localStorage.setItem("facing", "right")
    } else { return false }

}



//-----------



//sets score to 0
var currentScore = 0;

var zombieSpawnSpeed = 500;
var zombieSpeed = 7000;
var bulletSpeed = 1000;
var bulletAndZombieIntervalSpeed = 1;
var bc = 0;
var zc = 0;


function bulletSpawn() {
    $('#player').append('<div id="bullet" class="bullet">');
    if (localStorage.getItem('facing') == "right") {
        $('.bullet').animate({ "left": "1000px" }, bulletSpeed, "linear", function () {
            $(this).remove();
        });
    } else if ((localStorage.getItem('facing') == "left")) {
        $('.bullet').animate({ "right": "1000px" }, bulletSpeed, "linear", function () {
            $(this).remove();
        });
    };
    bulletHit()
};




function bulletHit() {

    var b = $("#bullet");
    b.append("<div class='stats' id='stats'></div>");
    var stats = $("#stats");

    if (b) {
        b.attr("id", "bullet-" + bc)
        stats.attr("id", "stats-" + bc)

        var bulletTimer = setInterval(function () {
            hasBulletHit()
        }, bulletAndZombieIntervalSpeed)

        function hasBulletHit() {
            var boff = b.offset();
            var x = boff.left;
            var y = boff.top;
            var xRound = Math.round(x * 100) / 100
            stats.text(xRound)
            var check = document.elementFromPoint((x + 10), y);


            if (check == null) {

                b.remove()
                console.log("Bullet went out of bounds.")
                clearInterval(bulletTimer)




            } else if (check.classList.contains("zombie")) {

                console.log("Collision")
                clearInterval(bulletTimer)
                b.remove()

                var z = check;
                check.id = "dead"

                var minHE = 30;
                var maxHE = 45;
                var random = Math.floor(Math.random() * (maxHE - minHE + 1)) + minHE;
                var currentValue = z.getAttribute("value");
                var deduction = z.getAttribute("value") - random;
                if (currentValue >= 0) {
                    z.setAttribute("value", deduction)
                    z.innerText = deduction;
                    currentScore++
                    updateScore();
                } else {
                    z.innerText = "DEAD";
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    currentScore++
                    updateScore();
                    z.remove();

                }


            } else {
                console.log("No Zombie")
                setTimeout(function () {
                    clearInterval(bulletTimer)
                }, 900)
            }
        }
        bc++
        return (!!(b));

    } else {
        return (!!(b));
    }

}



// fix the zombie issue

setTimeout(function () {
    zombieSpawning();
}, 1000)

var zombieCount = 10;

function zombieSpawning() {

    if (zombieCount > 0) {
        var min = 3;
        var max = 2000;
        var s = Math.floor(Math.random() * (max - min + 1)) + min;
        var p = $("#player");
        var poff = p.offset();
        var pleft = poff.left;
        var difference = s - pleft;
        var Maximus = pleft + 400;
        var Minimus = pleft - 300

        if (s >= Maximus) {
            $('#zom').prepend('<div id="zombie' + zc + '" value="100" class="zombie"></div>')
            $('#zombie').css("left", s + "px")
        } else if (s <= Minimus) {
            $('#zom').prepend('<div id="zombie' + zc + '" value="100" class="zombie"></div>');
            $('#zombie').css("left", s + "px")
        }
        else {
            return false;
        }
        var min = 5;
        var max = 30;
        $('#zombie').css("bottom", Math.floor(Math.random() * (max - min + 1)) + min)
        zc++
        zombieCount--
        animateZombie();


    } 

};

function animateZombie() {
    var min = 100;
    var max = 500;
    var randomNumbs = Math.floor(Math.random() * (max - min + 1)) + min + 'px';

    $('.zombie').animate({ "left": randomNumbs }, 7000, function () {
        $('.zombie').animate({ "right": randomNumbs }, 7000, function () { animateZombie() })
    })
}



function score() {
    $('.score').remove()
    $('body').append('<div id="score" class="score">Score: ' + currentScore + '</div>')
};

function updateScore() {
    document.getElementById("score").innerText = "Score: " + currentScore;
}

//rain loop animation
var FPS = 30
//$(function rain() {
//    $walk = 0, $lft = 0, $do = 1
//    $walkint = setInterval(function () {
//        if ($walk == 0) { $do = 1 } else if ($walk == 29) { $do = 0 }
//        if ($do == 1) { $walk-- } else { $walk-- }
//        $('#rain').css('background-position', $walk * 1134 + 'px 0px')
//        $lft = $('#rain').position().left + 5;
//    }, 10)
//});



function playerHit() {
    health = document.getElementById("playerHealth");
    var currentHealthValue = health.getAttribute("value");
    if (currentHealthValue > 0) {
        var min = 0.05;
        var max = 0.1;
        var mathRandom = Math.floor(Math.random() * (max - min + .1)) + min
        var newHealth = currentHealthValue - mathRandom;
        health.setAttribute("value", newHealth)
    } else {
        gameOver("You Died!");
    }


}


var transitionSpeed = 1000;
function gameOver(reason) {
    $(".bg").css({ "display": "none" })
    $('.mask').animate({ "background-color": "#8c1717" }, 500, "linear", function () {
        $(".title").text("Game Over")
        $('.startButton').text("Play Again?")
        $('.title').css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 500, function () {
            $('.startButton').css({ opacity: 0.0, visibility: "visible" }).animate({ opacity: 1.0 }, 500)
        });
    });

    $(".zombie").remove()

    console.log(reason)
}