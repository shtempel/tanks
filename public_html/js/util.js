"use strict";

function pauseGame() {
    if (!PAUSE) {
        clearInterval(game);
        PAUSE = true;
    } else if (PAUSE) {
        game = setInterval("gameLoop()", 1000 / FPS);
        PAUSE = false;
    }
}

function drawSplash(screen) {
    screen.draw();
}

function collision(obj1, obj2) {
    var XColl = false;
    var YColl = false;
    if ((obj1.x + obj1.width >= obj2.x) && (obj1.x <= obj2.x + obj2.width + 2))
        XColl = true;
    if ((obj1.y + obj1.height >= obj2.y) && (obj1.y <= obj2.y + obj2.height + 2))
        YColl = true;
    if (XColl & YColl) {
        return true;
    }
    return false;
}

function drawAllTanks(array) {
    for (var i = 0; i < array.length; i++) {
        if (array[i].type === "playerTank" || array[i].type === "enemyTank") {
            array[i].draw();
        }
    }
}

function resultsCalc(tankType, tank) {
    switch (tankType) {
        case "fat":
            ++TANKS_DESTROYED.fat;
            SCORE += tank.score;
            break;
        case "fast":
            ++TANKS_DESTROYED.fast;
            SCORE += tank.score;
            break;
        case "normal":
            ++TANKS_DESTROYED.normal;
            SCORE += tank.score;
            break;
    }
}

function getObject(array, type) {
    var obj = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i].type === type) {
            obj.push(array[i]);
        }
    }
    return obj;
}

function getObjectSubType(array, subType) {
    var obj = [];
    for (var i = 0; i < array.length; i++) {
        if (array[i].subType === subType) {
            obj.push(array[i]);
        }
    }
    return obj;
}