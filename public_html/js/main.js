"use strict";

var state = GAME_STATE.STATE_GAME_LAUNCHED,
        startScreen = new StartScreen(),
        battleScreen = new BattleScreen(),
        gameOverScreen = new GameOverScreen(),
        resultScreen = new ResultScreen(),
        winScreen = new WinScreen(),
        sound = new Sound(),
        game,
        timeBefore;

function main() {
    game = setInterval("gameLoop()", 1000 / FPS);
}


function gameLoop() {
    //requestAnimationFrame(gameLoop);
    switch (state) {
        case GAME_STATE.STATE_GAME_LAUNCHED:
            start();
            break;
        case GAME_STATE.STATE_PLAY:
            initGame();
            updateGame();
            break;
        case GAME_STATE.STATE_SPLASH:
            battleScreen.drawSplash();
            break;
        case GAME_STATE.STATE_RESULTS:
            resultScreen.draw();
            break;
        case GAME_STATE.STATE_GAME_OVER:
            gameOverScreen.draw();
            break;
        case GAME_STATE.STATE_WIN:
            winScreen.draw();
            break;
    }
}

function start() {
    OBJECTS = [];
    SCORE = 0;
    resetDestroyed();
    timeBefore = -100;
    initMap(OBJECTS);
    initTank(OBJECTS);
    startScreen.draw();
}

function initGame() {
    battleScreen.drawMap(OBJECTS);
    drawAllTanks(OBJECTS);
    keyboardEvent(OBJECTS);
    drawPlayerBullet(OBJECTS);
    drawExplosions(OBJECTS);
    soundManager(OBJECTS);
}

function gameOver() {
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].state === "damaged" || !getPlayerTank()) {
            if (timeBefore < 0) {
                ++timeBefore;
            } else {
                state = GAME_STATE.STATE_GAME_OVER;
                break;
            }
        }
    }
}

function victory() {
    if (getEnemyTanks() < 1) {
        if (timeBefore < 0) {
            ++timeBefore;
        } else {
            state = GAME_STATE.STATE_WIN;
        }
    }
}

function updateGame() {
    updateBullet(OBJECTS, getPlayerTank());
    soundManager(OBJECTS);
    victory();
    gameOver();
}

function getEnemyTanks() {
    var enemyTanks = [];
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type === "enemyTankFast" || OBJECTS[i].type === "enemyTankFat" ||
                OBJECTS[i].type === "enemyTankNormal") {
            enemyTanks.push(OBJECTS[i]);
        }
    }
    return enemyTanks.length;
}

function getPlayerTank() {
    var playerTank;
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type == "playerTank") {
            playerTank = OBJECTS[i];
        }
    }
    return playerTank;
}

function getPlayerBullet() {
    var playerBullet;
    for (var i = 0; i < OBJECTS.length; i++) {
        if (OBJECTS[i].type == "playerBullet") {
            playerBullet = OBJECTS[i];
        }
    }
    return playerBullet;
}

function resetDestroyed() {
    TANKS_DESTROYED = {
        fat: 0,
        fast: 0,
        normal: 0
    };
}