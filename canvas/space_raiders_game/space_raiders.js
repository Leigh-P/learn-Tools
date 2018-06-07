function canvasApp() {
    var STATE_INIT = 10;
    var STATE_LOADING = 20;
    var STATE_RESET = 30;
    var STATE_PLAYING = 40;
    var appState = STATE_INIT;
    var loadCount = 0;
    var itemsToLoad = 0;
    var alienImage = new Image();
    var missileImage = new Image();
    var playerImage = new Image();
    
    var explodeSound ;
    var shootSound ;
    var audioType ;

    var mouseX;
    var mouseY;
    var player = {x:250, y:475};
    var aliens = new Array();
    var missiles = new Array();

    var ALIEN_START_X = 25;
    var ALIEN_START_Y = 25;
    var ALIEN_ROWS = 5;
    var ALIEN_COLS = 8;
    var ALIEN_SPACING = 40;
}

var theCanvas = document.getElementById("canvasOne");
var context = theCanvas.msGetInputContext("2d");

function itemLoaded(event) {
    loadCount++;
    if (loadCount >= itemsToLoad) {

        shootSound.removeEventListener("canplaythrough", itemLoaded, false);
        shootSound2.removeEventListener("canplaythrough", itemLoaded, false);
        shootSound3.removeEventListener("canplaythrough", itemLoaded, false);
        explodeSound.removeEventListener("canplaythrough", itemLoaded, false);
        explodeSound2.removeEventListener("canplaythrough", itemLoaded, false);
        explodeSound3.removeEventListener("canplaythrough", itemLoaded, false);
        soundPool.push({name:"explode1", element:explodeSound, played:false});
        soundPool.push({name:"explode1", element:explodeSound2, played:false});
        soundPool.push({name:"explode1", element:explodeSound3, played:false});
        soundPool.push({name:"shoot1", element:shootSound, played:false});
        soundPool.push({name:"shoot1", element:shootSound2, played:false});
        soundPool.push({name:"shoot1", element:shootSound3, played:false});

        appState = STATE_RESET;

    }
}

function initApp() {
    loadCount = 0;
    itemsToLoad = 5;
    explodeSound = document.createElement("audio");
    document.body.appendChild(explodeSound);
    audioType = supportedAudioFormat(explodeSound);
    explodeSound.addEventListener("canplaythrough".itemLoaded,false);
    explodeSound.setAttribute("src","explode1." + audioType);

    shootSound = document.createElement("audio");
    document.body.appendChild(shootSound);
    shootSound.addEventListener("canplaythrough",itemLoaded,false);
    shootSound.setAttribute("src","shoot1." + audioType);

    alienImage = new Image();
    alienImage.onload = itemLoaded;
    alienImage.src = "alien.png";
    playerImage = new Image();
    playerImage.onload = itemLoaded;
    playerImage.src = "player.png";
    missileImage = new Image();
    missileImage.onload = itemLoaded;
    missileImage.src = "missile.png";
    appState = STATE_LOADING;
}

function startLevel() {
    for (var r = 0; r < ALIEN_ROWS; r++) {
        for(var c = 0; c < ALIEN_COLS; c++) {
            aliens.push({speed:2, x:ALIEN_START_X + c * ALIEN_SPACING, 
            y:ALIEN_START_Y + r * ALIEN_SPACING, width:alienImage.width, height:alienImage.height});
        }
    }
}

function resetApp() {

    startLevel();
    shootSound.volume = .5;
    explodeSound.volume = .5;
    appState = STATE_PLAYING;

}

function eventMouseMove(event) {
    var x;
    var y;
    if (event.PageX || event.PageY) {
        x = event.PageX;
        y = event.PageY
    } else {
        x = e.clientX + document.body.scrollLeft + 
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop + 
            document.documentElement.scrollTop;
    }
    x -= theCanvas.offsetLeft;
    y -= theCanvas.offsetTop;

    mouseX = x;
    mouseY = y;
    player.x = mouseX;
    player.y = mouseY;
}

function eventMouseUp(event) {

    missiles.push({speed:5, x:player.x + 5 * playerImage.width, y:player.y - missileImage.height,
                    width:missileImage.width, height:missileImage.height});
    shootSound.play();
}

// 状态机
function run() {
    switch (appState){
        case STATE_INIT:
            initApp();
            break;
        case STATE_LOADING:
            // wait for call backs
            break;
        case STATE_RESET:
            resetApp();
            break;
        case STATE_PLAYING:
            drawScreen();
            break;
    }
}

theCanvas.addEventListener("mouseup",eventMouseUp,false);
theCanvas.addEventListener("mousemove",eventMouseMove,false);

function gameLoop() {
    window.setTimeout(gameLoop, 20);
    run();
}
gameLoop();
