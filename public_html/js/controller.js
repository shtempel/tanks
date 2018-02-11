"use strict";

document.onkeydown = function (event) {
    KEY[event.keyCode] = true;
    if (event.keyCode == K_P) {
        pauseGame();
    }

    if (event.keyCode === K_ENTER && state === GAME_STATE.STATE_GAME_LAUNCHED) {
        state = GAME_STATE.STATE_SPLASH;
    }

    if (event.keyCode === K_ENTER && state === GAME_STATE.STATE_RESULTS) {
        state = GAME_STATE.STATE_GAME_LAUNCHED;
    }

    if (event.keyCode === K_SPACE && state === GAME_STATE.STATE_PLAY) {
        getObject(OBJECTS, "playerTank")[0].shoot(OBJECTS);
    }
};

document.onkeyup = function (event) {
    KEY[event.keyCode] = false;
    if (getObject(OBJECTS, "playerTank").length > 0) {
        getObject(OBJECTS, "playerTank")[0].setStop();
    }
};

function keyboardEvent(array) {
    var playerTank = getObject(array, "playerTank")[0];
    if (KEY[K_UP]) {
        playerTank.moveUp(array, playerTank);
        playerTank.setMoving();
        return;
    }
    if (KEY[K_DOWN]) {
        playerTank.moveDown(array, playerTank);
        playerTank.setMoving();
        return;
    }
    if (KEY[K_LEFT]) {
        playerTank.moveLeft(array, playerTank);
        playerTank.setMoving();
        return;
    }
    if (KEY[K_RIGHT]) {
        playerTank.moveRight(array, playerTank);
        playerTank.setMoving();
        return;
    }
}