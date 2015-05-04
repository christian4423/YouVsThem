console.log('v0.1.4');
function copyRight() {
    var d = new Date();
    var year = d.getFullYear() + " "
    document.getElementById('copyRight-span').innerText = year;
}

var zombieSpawnSpeed = 1000;
//touch
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
        $(this).css("visibility", "hidden")
        $('.title').css("visibility", "hidden")
        setInterval(function () { zombieSpawning() }, zombieSpawnSpeed);
    };
});


//keyboard
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
    }
};
function docReady() {

    window.addEventListener('keydown', moveSelection);


}
//-----------




var currentScore = 0;
var i = 0






localStorage.setItem("facing", "right")


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


//Version 0.1.4 main fix starts here.
//-------------------------------------------------------------


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
                } else {
                    z.innerText = "DEAD";
                    currentScore++
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





function zombieSpawning() {
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
        $('#zom').prepend('<div id="zombie' + zc + '" value="100" class="zombie">');
        $('#zombie').css("left", s + "px")
    } else if (s <= Minimus) {
        $('#zom').prepend('<div id="zombie' + zc + '" value="100" class="zombie">');
        $('#zombie').css("left", s + "px")
    }
    else {
        return false;
    }
    var min = 5;
    var max = 30;
    $('#zombie').css("bottom", Math.floor(Math.random() * (max - min + 1)) + min)
    zc++
    animateZombie();

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
    // $('.score').remove()
    $('body').append('<div class="score">Score: ' + currentScore + '</div>')
};

//rain
var FPS = 30
$(function rain() {
    $walk = 0, $lft = 0, $do = 1
    $walkint = setInterval(function () {
        if ($walk == 0) { $do = 1 } else if ($walk == 29) { $do = 0 }
        if ($do == 1) { $walk-- } else { $walk-- }
        $('#rain').css('background-position', $walk * 1134 + 'px 0px')
        $lft = $('#rain').position().left + 5;
    }, 10)
});



