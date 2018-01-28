"use strict";

document.onkeydown = function (event) {
    //console.log(event.keyCode);
    KEY[event.keyCode] = true;

    if (event.keyCode == K_P) {
        //pauseGame();
        alert("You pressed pause");
    }

    if ((event.keyCode === K_ENTER) && state === GAME_STATE.STATE_GAME_LAUNCHED) {
        state = GAME_STATE.STATE_SPLASH;
    }

    if ((event.keyCode === K_SPACE) && state === GAME_STATE.STATE_PLAY) {
        getPlayerTank().shoot();
    }
};

document.onkeyup = function (event) {
    KEY[event.keyCode] = false;
    getPlayerTank().setStop();
};

function keyboardEvent() {
    if (KEY[K_UP]) {
        getPlayerTank().playerMove(DIRECTIONS.UP);
        getPlayerTank().setMoving();
        return;
    }
    if (KEY[K_DOWN]) {
        getPlayerTank().playerMove(DIRECTIONS.DOWN);
        getPlayerTank().setMoving();
        return;
    }
    if (KEY[K_LEFT]) {
        getPlayerTank().playerMove(DIRECTIONS.LEFT);
        getPlayerTank().setMoving();
        return;
    }
    if (KEY[K_RIGHT]) {
        getPlayerTank().playerMove(DIRECTIONS.RIGHT);
        getPlayerTank().setMoving();
        return;
    }
}