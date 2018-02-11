"use strict";

var game,
        score,
        state = GAME_STATE.STATE_GAME_LAUNCHED,
        startScreen = new StartScreen(),
        splashScreen = new SplashScreen(),
        battleScreen = new BattleScreen(),
        gameOver = new GameOverScreen(),
        victory = new WinScreen(),
        result = new ResultScreen(),
        sound = new Sound();

function runner() {
    game = setInterval("gameLoop()", 1000 / FPS);
}

function gameLoop() {
    switch (state) {
        case GAME_STATE.STATE_GAME_LAUNCHED:
            startGame();
            break;
        case GAME_STATE.STATE_PLAY:
            gameInProgress(OBJECTS);
            break;
        case GAME_STATE.STATE_SPLASH:
            drawSplash(splashScreen);
            break;
        case GAME_STATE.STATE_RESULTS:
            endGame();
            break;
        case GAME_STATE.STATE_GAME_OVER:
            endGame();
            break;
        case GAME_STATE.STATE_WIN:
            endGame();
            break;
    }
}

function  startGame() {
    SCORE = 0;
    OBJECTS = [];
    startScreen.draw();
    initMap(OBJECTS);
    initTanks(OBJECTS);
}

function gameInProgress(array) {
    keyboardEvent(array);
    battleScreen.drawMap(array);
    drawAllTanks(array);
    drawBullets(array);
    updateBullet(array);
    gamePulse(array);
    enemyMove(getObject(array, "enemyTank"), array);
    explosionLife(array);
    tankSounds(getObject(array, "playerTank")[0], array);
}


function gamePulse(array) {
    if (getObject(array, "enemyTank").length < 1) {
        return state = GAME_STATE.STATE_WIN;
    } else if (getObject(array, "playerTank").length === 0 ||
            getObject(array, "flag")[0].state === "damaged") {
        return state = GAME_STATE.STATE_GAME_OVER;
    }
}

function endGame() {
    switch (state) {
        case GAME_STATE.STATE_GAME_OVER:
            gameOver.draw();
            break;
        case GAME_STATE.STATE_WIN:
            victory.draw();
            break;
        case GAME_STATE.STATE_RESULTS:
            result.draw();
            break;
    }
}