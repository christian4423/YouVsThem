console.log('v0.1.4');
function copyRight() {
    var d = new Date();
    var year = d.getFullYear() + " "
    document.getElementById('copyRight-span').innerText = year;
}

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
function bulletSpawn() {
    $('#player').append('<div id="bullet" class="bullet">');
    if (localStorage.getItem('facing') == "right") {
        $('.bullet').animate({ "left": "1000px" }, 5000, "linear", function () {
            $(this).remove();
        });
    } else if ((localStorage.getItem('facing') == "left")) {
        $('.bullet').animate({ "right": "1000px" }, 5000, "linear", function () {
            $(this).remove();
        });
    };
    bulletHit()
};
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
//zombie birth and movement left and bottom movement


    function zombieSpawning(){
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
            $('#zom').prepend('<div id="zombie" value="100"class="zombie">');
            $('#zombie').css("left", s + "px")
        } else if (s <= Minimus) {
            $('#zom').prepend('<div id="zombie" value="100" class="zombie">');
            $('#zombie').css("left", s + "px")
        }
        else {
            return false;
        }
        var min = 5;
        var max = 30;
        $('#zombie').css("bottom", Math.floor(Math.random() * (max - min + 1)) + min)
        i++
    };
//zombie speed
setInterval(function () {
    animate()
    function animate() {
        var min = 100;
        var max = 500;
        var randomNumbs = Math.floor(Math.random() * (max - min + 1)) + min + 'px';

        $('.zombie').animate({ "left": randomNumbs }, 7000, function () {
            $('.zombie').animate({ "right": randomNumbs }, 7000, function () { animate() })
        })
    }
}, 10);



localStorage.setItem("facing","right")

function bulletSpawn() {
    $('#player').append('<div id="bullet" class="bullet">');
    if (localStorage.getItem('facing') == "right") {
        $('.bullet').animate({ "left": "1000px" }, 15000, "linear", function () {
            $(this).remove();
        });
    } else if ((localStorage.getItem('facing') == "left")) {
        $('.bullet').animate({ "right": "1000px" }, 15000, "linear", function () {
            $(this).remove();
        });
    };
    bulletHit()
};


//Version 0.1.4 main fix starts here.

var bc = 0;
//function test
//javascript version
//function bulletHit() {

//    var bullet = document.getElementById("bullet")

//    if (bullet) {
//        bullet.id = "bullet-" + bc;
//        bullet.style.backgroundColor = "green"
//        bc++
//        bulletCollision(bullet);
//        return console.log(!!(bullet));

//    } else {
//        return console.log(!!(bullet));
//    }

//}

//jQuery version
function bulletHit() {

    var bullet = $("#bullet");
    bullet.append("<div class='stats' id='stats'></div>");
    var stats = $("#stats");

    if (bullet) {
        bullet.attr("id", "bullet-" + bc)
        stats.attr("id", "stats-" + bc)
        bc++

       
        var bulletTimer = setInterval(function () {
            hasBulletHit()
        }, .5)

        function hasBulletHit(){
            var boff = bullet.offset();
            var bleft = boff.left;
            var bleftRound = Math.round(bleft * 100) / 100
            stats.text(bleftRound)

            if(bleft > 500){
                clearInterval(bulletTimer)
               // alert(bleft)
            }
        }



        //var collisionTimer = setTimeout(function hasBulletHit() {

        //    if (bc>40) 
        //        return 



        //    var boff = bullet.offset();
        //    var bleft = boff.left;
        //    var bleftRound = Math.round(bleft * 100) / 100
        //    stats.text(bleftRound)

        //    hasBulletHit();
        //}, 1);





        return(!!(bullet));

    } else {
        return(!!(bullet));
    }

}

//[old code from V. 0.1.3]


//bullet collision detection and zombie health
//setInterval(function () {
//    score()
//    var b = $("#bullet");

//    if (b) {
//        var boff = b.offset();
//        var bleft = boff.left;
//        $('.zombie').each(function () {


//            if (localStorage.getItem('facing') == null) {
//                localStorage.setItem('facing', 'right')
//            } else {

//                var z = $(this);

//                var zoff = z.offset();
//                var zleft = zoff.left;
//                var zleftLeft = zleft + 100;

//                var p = $("#player");
//                var poff = p.offset();
//                var pleft = poff.left;

//                var minHE = 30;
//                var maxHE = 45;
//                var random = Math.floor(Math.random() * (maxHE - minHE + 1)) + minHE;
//                var currentValue = z.attr('value');
//                var deduction = currentValue - random;

//                if (currentValue <= 0) {
//                    z.remove();
//                };

//                if (localStorage.getItem('facing') == "right") {
//                    if (bleft >= (zleft + 50) && pleft < (zleft + 50)) {
//                        b.remove();
//                        currentScore++;

//                        z.attr("value", (currentValue - random));
//                        z.text(currentValue);
//                    };

//                };
//                if (localStorage.getItem('facing') == "left") {
//                    if (bleft <= (zleft + 50) && pleft > (zleft + 50)) {
//                        b.remove();
//                        currentScore++;


//                        z.attr("value", (currentValue - random));
//                        z.text(currentValue);


//                    };
//                };
//            };

//        });
//    }
//}, 100);























function score() {
    $('.score').remove()
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








//--------------------------------------------------------------------------
//Touch Controls VVV

$(function () {
    $("#rain").bind("tap", tapHandler);

    function tapHandler(event) {
        bulletSpawn();
        bulletHit();
    };
});

$(function () {
    $("#right").bind("tap", tapHandler);
    function tapHandler(event) {
        rightArrowPressed()
    }





    $(function () {
        $("#left").bind("tap", tapHandler);

        function tapHandler(event) {
            leftArrowPressed();
        };
    });
});
$(function () {
    $(".startButton").bind("tap", tapHandler);

    function tapHandler(event) {
        $(this).css("visibility", "hidden")
        $('.title').css("visibility", "hidden")
        setInterval(function () { zombieSpawning() }, 1500);
    };
});