"use strict";

var state = GAME_STATE.STATE_GAME_LAUNCHED,
        startScreen = new StartScreen(),
        battleScreen = new BattleScreen(),
        sound = new Sound();
window.onload = (function () {
    initMap();
    initTank();
    function gameLoop() {
        setTimeout(function () {
            requestAnimationFrame(gameLoop);
            switch (state) {
                case GAME_STATE.STATE_GAME_LAUNCHED:
                    startScreen.draw();
                    break;
                case GAME_STATE.STATE_PLAY:
                    initGame();
                    updateGame();
                    break;
                case GAME_STATE.STATE_SPLASH:
                    battleScreen.drawSplash();
                    break;
            }
        }, 1000 / FPS);
    }
    gameLoop();
})();

function initGame() {
    battleScreen.drawMap();
    drawAllTanks();
    keyboardEvent();
    drawPlayerBullet();
    //tankSoundManager(OBJECTS[57]);
}

function updateGame() {
    updateBullet();
    //bulletDestroy(OBJECTS);
}

function updateBullet() {
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type === "playerBullet") {
            OBJECTS[i].move(OBJECTS);
        }
    }
    
}