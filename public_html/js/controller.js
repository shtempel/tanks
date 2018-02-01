"use strict";

document.onkeydown = function (event) {
    //console.log(event.keyCode);
    KEY[event.keyCode] = true;

    if (event.keyCode == K_P) {
        //pauseGame();
        alert("You pressed pause");
    }

    if (event.keyCode === K_ENTER && state === GAME_STATE.STATE_GAME_LAUNCHED) {
        state = GAME_STATE.STATE_SPLASH;
    }

    if (event.keyCode === K_ENTER && state === GAME_STATE.STATE_RESULTS) {
        state = GAME_STATE.STATE_GAME_LAUNCHED;
    }

    if (event.keyCode === K_SPACE && state === GAME_STATE.STATE_PLAY) {
        getPlayerTank(OBJECTS).shoot(OBJECTS);
    }
};

document.onkeyup = function (event) {
    KEY[event.keyCode] = false;
    getPlayerTank(OBJECTS).setStop();
};

function keyboardEvent(arr) {
    if (KEY[K_UP]) {
        getPlayerTank(arr).playerMove(DIRECTIONS.UP, arr);
        getPlayerTank(arr).setMoving();
        return;
    }
    if (KEY[K_DOWN]) {
        getPlayerTank(arr).playerMove(DIRECTIONS.DOWN, arr);
        getPlayerTank(arr).setMoving();
        return;
    }
    if (KEY[K_LEFT]) {
        getPlayerTank(arr).playerMove(DIRECTIONS.LEFT, arr);
        getPlayerTank(arr).setMoving();
        return;
    }
    if (KEY[K_RIGHT]) {
        getPlayerTank(arr).playerMove(DIRECTIONS.RIGHT, arr);
        getPlayerTank(arr).setMoving();
        return;
    }
}